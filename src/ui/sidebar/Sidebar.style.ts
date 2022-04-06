import styled, {css} from "styled-components";

// Common

export const sidebarInput = css`
  border: none;
  border-radius: 0.2rem;
  background-color: transparent;
  text-align: left;
  padding: 0.8rem 0.8rem;
  color: inherit;
`;

export const SidebarButton = styled.button`
  ${sidebarInput}

  &:not(:disabled) {
    cursor: pointer;
  }

  > :nth-child(2) {
    margin-left: 0.6rem;
  }
`;

// Container

export const Container = styled.div`
  height: 100%;
  background-color: #183153;
  color: white;
  display: flex;
  flex-direction: column;

  a, a:link, a:visited {
    color: inherit;
  }
`;

// Header

export const Header = styled.header`
  padding: 0.6rem;
  padding-bottom: 0;
`;

export const Logo = styled.div`
  padding: 1.4rem 0.6rem 0.6rem;
`;

export const Search = styled.div`
  margin-top: 1.2rem;
  position: relative;

  > span {
    position: absolute;
    font-size: 0.8rem;
    left: 0.8rem;
    top: 1rem;
    color: rgba(255, 255, 255, 0.5);
    pointer-events: none;
  }

  > input {
    ${sidebarInput}
    border-radius: 0;
    width: 100%;
    padding-left: 2.4rem;
    border-bottom: 1px solid transparent;

    &:focus {
      outline: none;
      border-color: white;
    }

    &::placeholder {
      font-style: italic;
      color: rgba(255, 255, 255, 0.5)
    }

    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }
  }
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
    background-color: rgba(0, 0, 0, 0.3);
  }

  &.--selected {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export const OpenButton = styled(SidebarButton)`
  width: 100%;
`;

export const DeleteButton = styled(SidebarButton)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  &:hover,
  &:focus {
    background-color: #d45500;  
  }
`;

export const NewButton = styled(SidebarButton)`
  width: 100%;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
`;

// Footer

export const Footer = styled.footer`
  padding: 1rem 1.2rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
`;
