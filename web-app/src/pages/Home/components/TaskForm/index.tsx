import React, { useEffect, useState } from 'react';
import { BsX, BsCheck, BsPencil } from 'react-icons/bs';
import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import ReactTextareaAutosize from 'react-textarea-autosize';

import 'react-datepicker/dist/react-datepicker.css';

import { Task } from '../../../../services';

import * as SC from './styles';

interface ITaskFormInput {
  id?: string;
  title: string;
  description: string;
  deadline: Date;
}

type TaskFormProps = {
  task?: Task;
  onCancel?: () => void;
  onSubmit: (action: 'create' | 'update', data: ITaskFormInput) => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [isEditing, setIsEditing] = useState<boolean>(!task);

  const { control, register, handleSubmit, reset } = useForm<ITaskFormInput>({
    defaultValues: {
      ...task,
      deadline: task ? new Date(task.deadline) : undefined,
    },
  });

  useEffect(() => {}, []);

  return (
    <SC.Container
      onSubmit={handleSubmit((data) => {
        setIsEditing(false);
        onSubmit(task ? 'update' : 'create', data);
      })}
    >
      <input type="hidden" {...register('id')} />

      <div className="row grid-3fr-1fr">
        <input
          type="text"
          placeholder="Title"
          readOnly={!isEditing}
          {...register('title')}
        />

        <div>
          <Controller
            control={control}
            name="deadline"
            render={({ field: { onChange, onBlur, value } }) => (
              <ReactDatePicker
                readOnly={!isEditing}
                className="text-center"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                minDate={new Date()}
                placeholderText="Deadline"
              />
            )}
          />
        </div>
      </div>

      <div className="row">
        <ReactTextareaAutosize
          readOnly={!isEditing}
          defaultValue={task?.description}
          placeholder="Task description..."
          {...register('description')}
        />
      </div>

      {((task && !task.completed) || !task) && (
        <div className="row">
          {(isEditing || !task) && (
            <>
              <button
                title="Cancel"
                onClick={(e) => {
                  e.preventDefault();

                  if (task) {
                    setIsEditing(false);
                    reset({ ...task, deadline: new Date(task.deadline) });
                  }

                  onCancel && onCancel();
                }}
              >
                <BsX />
              </button>

              <button title="Save" className="primary" type="submit">
                <BsCheck />
              </button>
            </>
          )}

          {!isEditing && task && (
            <button
              title="Edit"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
            >
              <BsPencil />
            </button>
          )}
        </div>
      )}
    </SC.Container>
  );
};

export { TaskForm };
export type { ITaskFormInput };
