import * as yup from 'yup';
import { Request, Response } from 'express';

import { databaseSource } from '../database';
import { Task, TaskSchema, validateSchema } from '../entities';

import { ApiResponse } from './shared';
import { BusinessFault, MissingResourceFault } from '../http';

class TasksController {
  public static async create(request: Request, response: Response) {
    const task = await validateSchema<Task>(TaskSchema, request.body);

    const tasksRepository = databaseSource.getRepository(Task);

    const foundTask = await tasksRepository.findOneBy({
      title: task.title,
      completed: false,
    });

    if (foundTask) {
      throw new BusinessFault(
        'there is already a pending task with same title',
      );
    }

    await tasksRepository.insert(task);

    return response.status(201).json({
      success: true,
      data: task,
    } as ApiResponse<Task>);
  }

  public static async get(request: Request, response: Response) {
    const taskId = request.params.task_id;

    const providedIdIsValid = await yup.string().uuid().isValid(taskId);

    if (!providedIdIsValid) {
      throw new BusinessFault('provided id is not a valid UUID');
    }

    const tasksRepository = databaseSource.getRepository(Task);

    const task = await tasksRepository.findOneBy({
      id: taskId,
    });

    if (!task) {
      throw new MissingResourceFault('task not found');
    }

    return response.status(200).json({
      success: true,
      data: task,
    } as ApiResponse<Task>);
  }

  public static async list(request: Request, response: Response) {
    let excludeCompleted = 'exclude_completed' in request.query;

    const tasksRepository = databaseSource.getRepository(Task);

    const tasks = await tasksRepository.findBy({
      ...(excludeCompleted ? { completed: false } : {}),
    });

    return response.status(200).json({
      success: true,
      data: tasks,
    } as ApiResponse<Task[]>);
  }

  public static async update(request: Request, response: Response) {
    const taskId = request.params.task_id;

    const providedIdIsValid = await yup.string().uuid().isValid(taskId);

    if (!providedIdIsValid) {
      throw new BusinessFault('provided id is not a valid UUID');
    }

    const updatedTask = await validateSchema<Task>(TaskSchema, request.body);

    if (updatedTask.completed) {
      throw new BusinessFault(
        'you cannot mark a task as completed through this endpoint',
      );
    }

    const tasksRepository = databaseSource.getRepository(Task);

    const foundTask = await tasksRepository.findOneBy({
      id: taskId,
    });

    if (!foundTask) {
      throw new MissingResourceFault('task not found');
    }

    if (foundTask.completed) {
      throw new BusinessFault(
        'you cannot update a task that is already completed',
      );
    }

    updatedTask.id = foundTask?.id;

    await tasksRepository.save(updatedTask);

    return response.status(200).json({
      success: true,
      data: updatedTask,
    } as ApiResponse<Task>);
  }

  public static async markAsCompleted(request: Request, response: Response) {
    const taskId = request.params.task_id;

    const providedIdIsValid = await yup.string().uuid().isValid(taskId);

    if (!providedIdIsValid) {
      throw new BusinessFault('provided id is not a valid UUID');
    }

    const tasksRepository = databaseSource.getRepository(Task);

    const task = await tasksRepository.findOneBy({
      id: taskId,
    });

    if (!task) {
      throw new MissingResourceFault('task not found');
    }

    if (task.completed) {
      throw new BusinessFault('task is already completed');
    }

    task.completed = true;

    await tasksRepository.save(task);

    return response.status(204).json({
      success: true,
    } as ApiResponse<never>);
  }

  public static async delete(request: Request, response: Response) {
    const taskId = request.params.task_id;

    const providedIdIsValid = await yup.string().uuid().isValid(taskId);

    if (!providedIdIsValid) {
      throw new BusinessFault('provided id is not a valid UUID');
    }

    const tasksRepository = databaseSource.getRepository(Task);

    const task = await tasksRepository.findOneBy({
      id: taskId,
    });

    if (!task) {
      throw new MissingResourceFault('task not found');
    }

    await tasksRepository.softDelete(task.id!);

    return response.status(204).send();
  }
}

export { TasksController };
