import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;

  gap: 1rem;

  > .row {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    gap: 1rem;

    input {
      width: 100%;
      padding: 0.8rem;
    }

    > * {
      flex: 1;
      display: flex;
    }
  }

  .text-center {
    text-align: center;
  }

  .grid-3fr-1fr {
    display: grid;
    grid-template-columns: 3fr 1fr;
  }

  input {
    padding: 0.4rem;

    outline: none;
    border-radius: 0.4rem;

    font-size: inherit;

    border: none;
  }

  textarea {
    flex: 1;

    padding: 1rem;

    font-size: inherit;
    font-family: inherit;

    resize: none;
    border: none;
    background: ${(props) => props.theme.accent};
    outline: none;

    border-radius: 0.4rem;
  }

  input,
  textarea {
    background: ${(props) => darken(0.05, props.theme.accent)};

    &[readOnly] {
      background: ${(props) => darken(0.1, props.theme.accent)};
    }
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    background: ${(props) => props.theme.secondary};
    border-radius: 0.4rem;

    padding: 0.6rem;

    &.primary {
      background: ${(props) => darken(0.1, props.theme.primary)};
    }

    svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;
