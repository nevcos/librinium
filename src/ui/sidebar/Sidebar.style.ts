import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  background-color: #2d404d;
  color: white;
  display: flex;
  flex-direction: column;
`;

// Header

export const Header = styled.header`
  margin: 0.6rem;
  margin-left: 1rem;
`;

export const Logo = styled.div`
  margin: 1.5rem 0;
`;

export const Title = styled.div`
  margin-top: 1.2rem;
`;
// Nav

export const Nav = styled.nav`
  flex-grow: 1;

  padding: 0.6rem;
  overflow-y: auto;
`;

export const ListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: grid;
  grid-gap: 0.2rem;
`;

export const OptionLi = styled.li`
  display: flex;
  border-radius: 0.2rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.--selected {
    background-color: rgba(255, 255, 255, 0.3);

    &:hover {
      background-color: rgba(255, 255, 255, 0.4);
    }
  }
`;

export const AbstractButton = styled.button`
  border: none;
  border-radius: 0.2rem;
  background-color: transparent;
  text-align: left;
  padding: 0.6rem 0.8rem;
  color: inherit;

  &:not(:disabled) {
    cursor: pointer;
  }

  > :nth-child(2) {
    margin-left: 0.6rem;
  }
`;

export const OpenButton = styled(AbstractButton)`
  width: 100%;
`;

export const DeleteButton = styled(AbstractButton)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  &:hover,
  &:focus {
    background-color: rosybrown;
  }
`;

export const NewButton = styled(AbstractButton)`
  width: 100%;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
`;

// Footer

export const Footer = styled.footer`
  padding: 0.6rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
`;
