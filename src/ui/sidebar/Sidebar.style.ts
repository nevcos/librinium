import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// Common

export const sidebarInput = css`
  border: none;
  border-radius: var(--input-border-radius);
  background-color: transparent;
  text-align: left;
  padding: var(--input-padding);
  color: inherit;
`;

export const sidebarButtonLink = css`
  ${sidebarInput}
  vertical-align: middle;

  &:not(:disabled) {
    cursor: pointer;
  }

  > .label {
    margin-left: var(--sidebar-padding);
    display: var(--sidebar-labels-display);
  }
`;

export const Icon = styled.span`
  font-size: var(--icon-size);
  width: 15px;
  text-align: center;
`;

// Auth

export const AuthText = styled.p`
  padding: calc(var(--sidebar-padding) * 2);
`;

export const AuthLink = styled.a`
  display: block;
  padding-top: 1rem;
  color: var(--color-secondary);
`;

// Container

export const Container = styled.div`
  height: 100%;
  background-color: var(--sidebar-bg-color);
  color: var(--sidebar-content-color);
  display: flex;
  flex-direction: column;

  a,
  a:link,
  a:visited {
    color: inherit;
  }
`;

// Header

export const Header = styled.header`
  padding: var(--sidebar-padding);
  padding-top: calc(var(--sidebar-padding) * 3);
  padding-bottom: 0;
`;

export const ToggleButton = styled.button`
  ${sidebarButtonLink}
`;

export const Logo = styled.img`
  vertical-align: middle;
  margin-left: var(--sidebar-padding);
  display: var(--sidebar-labels-display);
`;

export const Search = styled.div`
  margin-top: calc(var(--sidebar-padding) * 2);
  position: relative;

  > .icon {
    position: absolute;
    font-size: var(--icon-size);
    left: var(--input-padding);
    top: 1rem;
    color: var(--sidebar-content-dimmed-color);
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
      color: var(--sidebar-content-dimmed-color);
    }

    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }
  }
`;

// Nav

export const Nav = styled.nav`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  > .folder-list {
    padding: var(--sidebar-padding);
    overflow: hidden;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    scroll-padding: var(--sidebar-padding);

    &::-webkit-scrollbar {
      width: var(--scroll-size);
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--scroll-color);
      border-radius: var(--input-border-radius);
    }
  }

  > .create-list {
    flex-shrink: 0;
    padding: var(--sidebar-padding);
    padding-top: 0;
  }
`;

export const ListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const OptionLi = styled.li`
  display: flex;
  border-radius: var(--input-border-radius);
  scroll-snap-align: start;
  overflow-x: hidden;
  opacity: .7;

  &:hover {
    background-color: var(--sidebar-item-hover-bg-color);
    opacity: 1;
  }

  &.--active {
    background-color: var(--sidebar-item-selected-bg-color);
    opacity: 1;
  }
`;

export const FolderLi = styled.li`
  scroll-snap-align: start;

  display: flex;
  flex-direction: column;

  padding: var(--input-padding);
  padding-right: 0;
  padding-top: 0;

  &:last-child {
    padding-bottom: 0;
  }
`;

export const FolderTitle = styled.div`
  display: flex;
  align-items: center;

  > .icon {
    font-size: var(--icon-size);
  }

  > .label {
    flex-grow: 1;
    margin-left: var(--sidebar-padding);

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const NavLink = styled(Link)`
  ${sidebarButtonLink}
  text-decoration: none;
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DefaultIconButton = styled.button`
  ${sidebarButtonLink}

  &:hover,
  &:focus {
    background-color: var(--sidebar-delete-active-bg-color);
  }
`;

export const DeleteButton = styled.button`
  ${sidebarButtonLink}

  &:hover,
  &:focus {
    background-color: var(--sidebar-delete-active-bg-color);
  }
`;

export const DeleteFileButton = styled(DeleteButton)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

export const NewButton = styled.button`
  ${sidebarButtonLink}
  width: 100%;
  color: var(--sidebar-content-dimmed-color);
  font-style: italic;
`;

// Footer

export const Footer = styled.footer`
  padding: 1rem 1.2rem;
  font-size: var(--font-small-size);
  color: var(--sidebar-content-dimmed-color);
`;
