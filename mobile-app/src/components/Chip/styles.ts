import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { ThemedText } from '../ThemedText';

type ContainerProps = {
  $selected?: boolean;
};

export const Container = styled(RectButton)<ContainerProps>`
  padding: 8px 16px;

  gap: 8px;
  flex: 1;
  flex-direction: row;
  align-items: center;

  border-radius: 96px;

  border: 1px solid ${(props) => props.theme.secondary};
  background-color: ${(props) =>
    props.$selected ? props.theme.accent : props.theme.secondary};
`;

export const Text = styled(ThemedText)`
  flex: 1;
  text-align: center;
`;
