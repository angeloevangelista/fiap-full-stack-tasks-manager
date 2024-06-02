import { darken } from 'polished';
import styled, { css } from 'styled-components/native';

export const Input = styled.TextInput.attrs((props) => {
  return {
    placeholderTextColor: darken(0.5, props.theme.text),
  };
})`
  padding: 8px;

  color: ${(props) => props.theme.text};
  border-radius: 8px;
  background-color: ${(props) => props.theme.accent};

  ${(props) =>
    props.readOnly &&
    css`
      background-color: ${(props) => darken(0.075, props.theme.accent)};
    `}
`;
