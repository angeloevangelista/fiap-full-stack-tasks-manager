import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigation } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'styled-components/native';
import { isBefore, isSameDay, isSameWeek } from 'date-fns';
import { FontAwesome5, FontAwesome6, Feather } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { ITaskFormInput, TaskForm } from './components';
import { Chip, ThemedText } from '@/components';
import { Task, TasksManagerApi } from '@/services';

import * as SC from './styles';
import { RectButton } from 'react-native-gesture-handler';

export default function TasksScreen() {
  const theme = useTheme();
  const navigation = useNavigation();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [isCreating, setIsCreating] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('all');

  const tasksManagerApi = useMemo(() => new TasksManagerApi(), []);

  const { data: tasks, refetch: reloadTasks } = useQuery({
    queryKey: ['listTasks'],
    queryFn: () => tasksManagerApi.listTasks(),
  });

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

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
      .sort((a, b) => (isBefore(a.deadline, b.deadline) ? -1 : 1))
      .sort((_, b) => (b.completed ? -1 : 1));
  }, [tasks, filter]);

  const handleCompleteTask = useCallback(async (taskId: string) => {
    await tasksManagerApi.completeTask(taskId);

    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Task marked as completed',
    });

    await reloadTasks();
  }, []);

  const handleFormSubmit = useCallback(
    async (action: 'create' | 'update', taskData: ITaskFormInput) => {
      switch (action) {
        case 'create':
          delete taskData.id;
          await tasksManagerApi.createTask(taskData);
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Task created',
          });
          break;
        case 'update':
          await tasksManagerApi.updateTask(taskData.id!, {
            title: taskData.title,
            deadline: taskData.deadline,
            description: taskData.description,
          });
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Task updated',
          });
          break;
      }

      setSelectedTask(undefined);
      bottomSheetRef.current?.close();

      await reloadTasks();
    },
    [tasks],
  );

  return (
    <SC.Container>
      <ThemedText type="title" color={theme.primary}>
        Tasks Manager
      </ThemedText>

      <ThemedText type="subtitle" color={theme.text}>
        Tasks
      </ThemedText>

      <SC.FiltersContainer>
        <Chip
          text="All"
          selected={filter === 'all'}
          onPress={() => setFilter('all')}
          icon={
            <FontAwesome5 name="asterisk" size={20} color={theme.primary} />
          }
        />
        <Chip
          text="Today"
          selected={filter === 'today'}
          onPress={() => setFilter('today')}
          icon={
            <FontAwesome6 name="calendar-day" size={20} color={theme.primary} />
          }
        />
        <Chip
          text="Week"
          selected={filter === 'week'}
          onPress={() => setFilter('week')}
          icon={
            <FontAwesome6 name="calendar" size={20} color={theme.primary} />
          }
        />
      </SC.FiltersContainer>

      <SC.TasksList contentContainerStyle={{ rowGap: 8 }}>
        {filteredTasks?.map((task) => (
          <SC.TasksListItem key={task.id} $completed={task.completed}>
            <RectButton
              onPress={() => !task.completed && handleCompleteTask(task.id)}
              style={{ padding: 8 }}
            >
              <Feather
                name={task.completed ? 'check-circle' : 'circle'}
                size={20}
                color={theme.text}
              />
            </RectButton>

            <SC.TaskDetailsButton
              onPress={() => {
                setSelectedTask(task);
                bottomSheetRef.current?.expand();
              }}
            >
              <ThemedText
                style={{
                  ...(task.completed && {
                    textDecorationLine: 'line-through',
                  }),
                }}
              >
                {task.title}
              </ThemedText>
            </SC.TaskDetailsButton>
          </SC.TasksListItem>
        ))}
      </SC.TasksList>

      <SC.NewTaskButton
        onPress={() => {
          setIsCreating(true);
          setSelectedTask(undefined);
          bottomSheetRef.current?.expand();
        }}
      >
        <Feather name="plus" size={24} color={theme.background} />
      </SC.NewTaskButton>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['50%', '90%']}
        enableDynamicSizing={true}
        index={-1}
        enablePanDownToClose
        onClose={() => {
          setIsCreating(false);
          setSelectedTask(undefined);
        }}
      >
        <BottomSheetScrollView
          style={{ backgroundColor: theme.background, height: '100%' }}
        >
          {(selectedTask || isCreating) && (
            <TaskForm
              task={selectedTask}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setIsCreating(false);
                setSelectedTask(undefined);
                bottomSheetRef.current?.close();
              }}
            />
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </SC.Container>
  );
}
