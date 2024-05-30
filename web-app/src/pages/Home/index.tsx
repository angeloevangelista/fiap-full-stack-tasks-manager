import { useCallback, useMemo, useState } from 'react';
import Switch from 'react-switch';
import toast from 'react-hot-toast';
import { isSameWeek, isSameDay, isBefore, format } from 'date-fns';
import {
  BsPlus,
  BsCircle,
  BsCalendarDay,
  BsCalendarWeek,
  BsBracesAsterisk,
  BsCheckCircleFill,
} from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineLoading } from 'react-icons/ai';

import 'react-datepicker/dist/react-datepicker.css';

import { Task, TasksManagerApi } from '../../services';

import * as SC from './styles';
import { ITaskFormInput, TaskForm } from './components';

const Home: React.FC = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [expandedTaskId, setExpandedTaskId] = useState<string>();
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('all');
  const tasksManagerApi = useMemo(() => new TasksManagerApi(), []);

  const {
    data: tasks,
    isLoading: isListingTasks,
    refetch: reloadTasks,
  } = useQuery({
    queryKey: ['listTasks'],
    queryFn: () => tasksManagerApi.listTasks(),
  });

  const filteredTasks = useMemo(() => {
    let filterFunction: (_: Task) => boolean;

    switch (filter) {
      case 'all':
        filterFunction = (_: Task) => true;
        break;

      case 'today':
        filterFunction = (task) => isSameDay(new Date(), task.deadline);
        break;

      case 'week':
        filterFunction = (task) => isSameWeek(new Date(), task.deadline);
        break;
    }

    return tasks
      ?.filter(filterFunction)
      .filter((p) => (showCompleted ? true : !p.completed))
      .sort((a, b) => (isBefore(a.deadline, b.deadline) ? -1 : 1))
      .sort((_, b) => (b.completed ? -1 : 1));
  }, [tasks, filter, showCompleted]);

  const handleCompleteTask = useCallback(async (taskId: string) => {
    await tasksManagerApi.completeTask(taskId);

    toast.success('Task marked as completed');

    await reloadTasks();
  }, []);

  const handleFormSubmit = useCallback(
    async (action: 'create' | 'update', taskData: ITaskFormInput) => {
      switch (action) {
        case 'create':
          delete taskData.id;
          await tasksManagerApi.createTask(taskData);
          toast.success('Task created');
          break;
        case 'update':
          await tasksManagerApi.updateTask(taskData.id!, {
            title: taskData.title,
            deadline: taskData.deadline,
            description: taskData.description,
          });
          toast.success('Task updated');
          break;
      }

      setIsCreating(false);
      setExpandedTaskId(undefined);

      await reloadTasks();
    },
    [tasks],
  );

  return (
    <SC.Container>
      <SC.Header>
        <h1>Tasks Manager</h1>
      </SC.Header>

      <SC.Content>
        <SC.FiltersContainer>
          <h2>Filters</h2>

          <SC.FiltersList>
            <SC.FiltersListItem $selected={filter == 'all'}>
              <button onClick={() => setFilter('all')}>
                <BsBracesAsterisk /> <strong>All</strong>
              </button>
            </SC.FiltersListItem>
            <SC.FiltersListItem $selected={filter == 'today'}>
              <button onClick={() => setFilter('today')}>
                <BsCalendarDay /> <strong>Today</strong>
              </button>
            </SC.FiltersListItem>
            <SC.FiltersListItem $selected={filter == 'week'}>
              <button onClick={() => setFilter('week')}>
                <BsCalendarWeek /> <strong>Week</strong>
              </button>
            </SC.FiltersListItem>
          </SC.FiltersList>
        </SC.FiltersContainer>

        <SC.TasksContainer>
          <h2>Tasks</h2>

          <div className={`top-actions ${showCompleted ? 'checked' : ''}`}>
            <div>
              <strong>Show completed</strong>
              <Switch checked={showCompleted} onChange={setShowCompleted} />
            </div>

            <div>
              <button
                onClick={() => {
                  setExpandedTaskId(undefined);
                  setIsCreating(true);
                }}
              >
                <BsPlus />
              </button>
            </div>
          </div>

          {isListingTasks && (
            <SC.LoaderContainer>
              <AiOutlineLoading className="spin" />

              <strong>Loading tasks</strong>
            </SC.LoaderContainer>
          )}

          {isCreating && (
            <SC.CreateTaskContainer>
              <TaskForm
                onSubmit={handleFormSubmit}
                onCancel={() => setIsCreating(false)}
              />
            </SC.CreateTaskContainer>
          )}

          {filteredTasks && (
            <SC.TaskList>
              {filteredTasks?.map((task) => (
                <SC.TaskListItem
                  key={task.id}
                  $finished={task.completed}
                  className={expandedTaskId === task.id ? 'expanded' : ''}
                >
                  <div className="header">
                    <button onClick={() => handleCompleteTask(task.id)}>
                      {task.completed ? <BsCheckCircleFill /> : <BsCircle />}
                    </button>

                    <div
                      onClick={() => {
                        setExpandedTaskId(
                          expandedTaskId === task.id ? undefined : task.id,
                        );
                      }}
                    >
                      <strong>{task.title}</strong>
                      <span>{format(task.deadline, 'LLL d')}</span>
                    </div>
                  </div>

                  <TaskForm task={task} onSubmit={handleFormSubmit} />
                </SC.TaskListItem>
              ))}
            </SC.TaskList>
          )}

          {filteredTasks?.length === 0 && <strong>No tasks found</strong>}
        </SC.TasksContainer>
      </SC.Content>
    </SC.Container>
  );
};

export default Home;
