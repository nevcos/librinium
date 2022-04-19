import { useCallback, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { noteStoreActions, noteStoreSelectors } from "../../store/noteStore";
import { Spinner } from "../shared/Spinner";
import { RenderingCounter } from "../shared/RenderingCounter";
import { useGistSelector } from "../../hook/useGistSelector";
import { FolderName } from "../../domain/folder/FolderName";
import { useUserSelector } from "../../hook/useUserSelector";
import { userStoreSelectors } from "../../store/userStore";
import { Icon } from "../shared/Icon";

import { sidebarButtonLink } from "./styled/sidebarButtonLink";
import { sidebarInput } from "./styled/sidebarInput";
import logoPath from "./assets/logo.svg";
import { GitHubAuth } from "./GitHubAuth";
import { SidebarNavFolder } from "./SidebarNavFolder";
import { SidebarNavLink } from "./SidebarNavLink";
import { SidebarNavItem } from "./navItem/SidebarNavItem";

// Container

const Styled_Container = styled.div`
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

const Styled_Header = styled.header`
  padding: var(--sidebar-padding);
  padding-top: calc(var(--sidebar-padding) * 3);
  padding-bottom: 0;
`;

const Styled_Logo = styled.img`
  vertical-align: middle;
  margin-left: var(--sidebar-padding);
  display: var(--sidebar-labels-display);
`;

const Styled_Search = styled.div`
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

const Styled_Nav = styled.nav`
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
    font-style: italic;
    color: var(--sidebar-content-dimmed-color);
  }
`;

const Styled_ListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Footer

const Styled_Footer = styled.footer`
  padding: 1rem 1.2rem;
  font-size: var(--font-small-size);
  color: var(--sidebar-content-dimmed-color);
`;

export function Sidebar(): JSX.Element {
  const dispatch = useDispatch();

  const isAuth = useUserSelector(userStoreSelectors.isAuth);
  const isLoading = useGistSelector(noteStoreSelectors.isLoading);
  const folders = useGistSelector(noteStoreSelectors.getFolders);
  const notesWithoutFolder = useGistSelector(noteStoreSelectors.getNotesWithoutFolder);

  const onClickCreateFolder = useCallback((event: MouseEvent) => {
    const name = prompt("Please enter the folder name") as FolderName;

    if (name) {
      dispatch(noteStoreActions.createFolder({ name }));
    }
  }, []);

  return (
    <Styled_Container>
      <RenderingCounter />
      <Styled_Header>
        {/*<Styled_ToggleButton aria-label="Expand / Collapse menu" title="Expand / Collapse menu">*/}
        {/*  <span className="icon fa-solid fa-bars" aria-hidden="true" />*/}
        {/*</Styled_ToggleButton>*/}
        <Styled_Logo src={logoPath} alt="librinium" />
        <Styled_Search>
          <span className="icon fa-solid fa-search" aria-hidden="true" />
          <input type="search" placeholder="search..." />
        </Styled_Search>
      </Styled_Header>

      <GitHubAuth />

      <Styled_Nav>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Styled_ListUl className="folder-list">
              {folders.map((folder) => (
                <SidebarNavFolder key={folder.id} folder={folder} />
              ))}
            </Styled_ListUl>

            <Styled_ListUl className="folder-list">
              {notesWithoutFolder.map((note) => (
                <SidebarNavLink note={note} key={note.id} />
              ))}
            </Styled_ListUl>

            {isAuth && (
              <Styled_ListUl className="create-list">
                <SidebarNavItem
                  label="Create new folder..."
                  onClick={onClickCreateFolder}
                  icon={<Icon className="fa-solid fa-plus" title="Folder" />}
                />
              </Styled_ListUl>
            )}
          </>
        )}
      </Styled_Nav>

      <Styled_Footer>
        <div>
          <span className="icon fa-solid fa-magnifying-glass" aria-hidden="true" /> <kbd>ctrl</kbd> + mouse wheel to
          zoom preview
        </div>
        <div>
          <Link to="/about">
            <span className="icon fa-solid fa-code" aria-hidden="true" /> about librinium ...
          </Link>
        </div>
      </Styled_Footer>
    </Styled_Container>
  );
}
