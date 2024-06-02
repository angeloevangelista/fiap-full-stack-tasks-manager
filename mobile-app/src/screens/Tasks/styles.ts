import { View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { css } from 'styled-components';
import styled from 'styled-components/native';

export const Container = styled(View)`
  gap: 16px;
  height: 100%;

  padding: 32px 16px 64px 16px;

  background-color: ${(props) => props.theme.background};
`;

export const NewTaskButton = styled(RectButton)`
  position: absolute;

  right: 32px;
  bottom: 32px;

  padding: 16px;
  border-radius: 32px;
  background-color: ${(props) => props.theme.primary};
`;

export const FiltersContainer = styled.View`
  gap: 8px;
  flex-direction: row;
`;

export const TasksList = styled.ScrollView`
  padding: 0 8px;
`;

type TasksListItemProps = {
  $completed?: boolean;
};

export const TasksListItem = styled.View<TasksListItemProps>`
  gap: 8px;
  flex-direction: row;
  align-items: center;

  border-radius: 8px;
  background-color: ${(props) => props.theme.accent};

  ${(props) =>
    props.$completed &&
    css`
      opacity: 0.5;
    `}
`;

export const TaskDetailsButton = styled(RectButton)`
  flex: 1;
  padding: 8px;
`;
