import { darken } from 'polished';
import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  gap: 8px;

  padding: 16px;
  border-radius: 8px;
`;

type DeadLineInputProps = {
  $readOnly?: boolean;
};

export const DeadLineInput = styled(RectButton)<DeadLineInputProps>`
  flex-direction: row;
  gap: 16px;

  padding: 8px;

  color: ${(props) => props.theme.text};
  border-radius: 8px;
  background-color: ${(props) => props.theme.accent};

  ${(props) =>
    props.$readOnly &&
    css`
      background-color: ${(props) => darken(0.075, props.theme.accent)};
    `}
`;

export const ButtonsContainer = styled.View`
  gap: 8px;

  flex-direction: row;
`;

type ActionButtonProps = {
  $primary?: boolean;
};

export const ActionButton = styled(RectButton)<ActionButtonProps>`
  flex: 1;

  align-items: center;
  justify-content: center;

  padding: 8px;

  border-radius: 8px;
  background-color: ${(props) =>
    props.$primary ? props.theme.primary : props.theme.accent};
`;
