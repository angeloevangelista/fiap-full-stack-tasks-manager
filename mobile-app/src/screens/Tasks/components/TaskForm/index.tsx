import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import DatePicker from 'react-native-date-picker';
import FeatherIcons from '@expo/vector-icons/Feather';

import { Task } from '@/services';
import { ThemedText, InputField } from '@/src/components';

import * as SC from './styles';
import { Alert } from 'react-native';

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
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState<boolean>(!task);
  const [datePickerIsOpened, setDatePickerIsOpened] = useState<boolean>(false);

  const { control, handleSubmit, reset, watch, setValue } =
    useForm<ITaskFormInput>({});

  useEffect(() => reset(task), [task]);

  return (
    <SC.Container>
      <InputField
        name="title"
        control={control}
        placeholder="Title"
        readOnly={!isEditing}
      />

      <InputField
        name="description"
        control={control}
        multiline={true}
        placeholder="Description"
        readOnly={!isEditing}
      />

      <SC.DeadLineInput
        enabled={isEditing}
        $readOnly={!isEditing}
        onPress={() => setDatePickerIsOpened(true)}
      >
        <FeatherIcons name="calendar" size={24} color={theme.primary} />

        <ThemedText>
          {watch('deadline')
            ? format(watch('deadline'), 'dd/MM/yyyy')
            : '--/--/----'}
        </ThemedText>

        <DatePicker
          modal
          mode="date"
          open={datePickerIsOpened}
          buttonColor={theme.primary}
          dividerColor={theme.primary}
          date={task?.deadline ? new Date(task?.deadline) : new Date()}
          onConfirm={(date) => {
            setDatePickerIsOpened(false);
            setValue('deadline', date);
          }}
          onCancel={() => {
            setDatePickerIsOpened(false);
          }}
        />
      </SC.DeadLineInput>

      <SC.ButtonsContainer>
        {((task && !task.completed) || !task) && (
          <>
            {(isEditing || !task) && (
              <>
                <SC.ActionButton
                  onPress={(e) => {
                    if (task) {
                      setIsEditing(false);
                      reset({ ...task, deadline: new Date(task.deadline) });
                    }

                    !task && onCancel && onCancel();
                  }}
                >
                  <FeatherIcons name="x" size={24} color={theme.text} />
                </SC.ActionButton>

                <SC.ActionButton
                  $primary
                  onPress={() => {
                    handleSubmit((data) => {
                      onSubmit(task ? 'update' : 'create', data);
                    })(undefined);
                  }}
                >
                  <FeatherIcons name="check" size={24} color={theme.text} />
                </SC.ActionButton>
              </>
            )}

            {!isEditing && task && (
              <SC.ActionButton
                onPress={(e) => {
                  setIsEditing(true);
                }}
              >
                <FeatherIcons name="edit" size={24} color={theme.text} />
              </SC.ActionButton>
            )}
          </>
        )}
      </SC.ButtonsContainer>
    </SC.Container>
  );
};

export { TaskForm };
export type { ITaskFormInput };
