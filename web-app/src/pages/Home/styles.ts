import { darken, transparentize } from 'polished';
import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  padding: 1rem 4rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Header = styled.header`
  color: ${(props) => props.theme.primary};
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
`;

export const FiltersContainer = styled.aside`
  padding: 2rem;
  border-radius: 1.4rem;

  height: fit-content;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.24);
  background-color: ${(props) => props.theme.secondary};

  h2 {
  }
`;

export const FiltersList = styled.ul`
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

type FiltersListItemProps = {
  $selected?: boolean;
};

export const FiltersListItem = styled.li<FiltersListItemProps>`
  display: flex;
  border-radius: 0.4rem;

  background: ${(props) => (props.$selected ? props.theme.accent : 'none')};
  transition: background 0.25s ease-in-out;

  ${(props) =>
    !props.$selected &&
    css`
      &:hover {
        background: ${(props) => transparentize(0.75, props.theme.accent)};
      }
    `}

  button {
    flex: 1;

    padding: 0.8rem;
    border: none;
    background: none;

    display: flex;
    align-items: center;
    justify-content: start;
    gap: 0.8rem;
  }
`;

export const TasksContainer = styled.main`
  padding: 2rem;
  border-radius: 1.4rem;

  height: fit-content;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.24);
  background-color: ${(props) => props.theme.secondary};

  h2 {
  }

  .top-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .react-switch-bg {
      background: ${(props) => props.theme.accent} !important;
    }

    &.checked .react-switch-bg {
      background: ${(props) => props.theme.primary} !important;
    }

    > div {
      display: flex;
      align-items: center;

      gap: 0.8rem;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      border: none;
      background: ${(props) => props.theme.primary};

      padding: 0.8rem;
      border-radius: 0.4rem;

      svg {
        width: 1.2rem;
        height: 1.2rem;
      }
    }
  }
`;

export const CreateTaskContainer = styled.div`
  padding: 1rem;
  border-radius: 0.4rem;

  background: ${(props) => props.theme.background};

  & + * {
    margin-top: 1rem;
  }
`;

export const TaskList = styled.ul`
  list-style: none;

  padding-right: 2rem;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  max-height: 420px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.8rem;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 16px 2px rgba(0, 0, 0, 0.24);
    border-radius: 0.4rem;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.4rem;
    background-color: ${(props) => props.theme.accent};
    outline: 1px solid ${(props) => props.theme.secondary};
  }
`;

type TaskListItemProps = {
  $finished: boolean;
};

export const TaskListItem = styled.li<TaskListItemProps>`
  display: flex;
  flex-direction: column;

  border-radius: 0.4rem;

  background-color: ${(props) => props.theme.background};

  .header {
    flex: 1;

    border-radius: 0.4rem;
    border: 1px solid ${(props) => props.theme.secondary};

    transition: border 0.25s ease-in-out;
    text-decoration: ${(props) => (props.$finished ? 'line-through' : 'none')};

    display: flex;
    align-items: center;

    cursor: pointer;

    background-color: ${(props) => props.theme.accent};

    ${(props) =>
      props.$finished
        ? css`
            opacity: 0.25;
          `
        : css`
            &:hover {
              border-color: ${(props) => props.theme.primary};
            }
          `}

    > div {
      flex: 1;

      padding: 0.8rem;

      display: flex;
      align-items: center;
    }

    span {
      margin-left: auto;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      border: none;
      background: none;

      width: 1.8rem;
      height: 1.8rem;

      margin: 0 0.4rem;
    }
  }

  form {
    padding: 0.8rem;

    border-bottom-left-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;

    overflow: hidden;

    display: none;
    transition: max-height 0.5s ease-in-out;
  }

  &.expanded form {
    height: auto;
    display: flex;
  }
`;

export const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  color: ${(props) => darken(0.5, props.theme.text)};

  svg {
    width: 1.6rem;
    height: 1.6rem;

    color: ${(props) => props.theme.primary};
  }

  .spin {
    animation: ${spin} 1s infinite linear;
  }
`;
