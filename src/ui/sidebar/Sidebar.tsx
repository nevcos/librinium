import { useCallback, MouseEvent, useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { noteStoreActions, noteStoreSelectors } from "../../store/noteStore";
import { userStoreSelectors } from "../../store/userStore";
import { useGistSelector } from "../../hook/useGistSelector";
import { FolderName } from "../../domain/folder/FolderName";
import { useUserSelector } from "../../hook/useUserSelector";
import { Spinner } from "../shared/Spinner";
import { RenderingCounter } from "../shared/RenderingCounter";
import { Icon } from "../shared/Icon";

import { User } from "./User";
import { sidebarInput } from "./styled/sidebarInput";
import logoPath from "./assets/logo.svg";
import { GitHubAuth } from "./GitHubAuth";
import { SidebarNodeFolder } from "./SidebarNodeFolder";
import { SidebarNavBranch } from "./navItem/SidebarNavBranch";
import { SidebarNodeNote } from "./SidebarNodeNote";
import { isFolder } from "../../domain/noteStoreState/FilesNode";

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
`;

const Styled_PlainList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Styled_FilesList = styled(Styled_PlainList)`
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
`;

const Styled_CreateList = styled(Styled_PlainList)`
  flex-shrink: 0;
  padding: var(--sidebar-padding);
  padding-top: 0;
  font-style: italic;
  color: var(--sidebar-content-dimmed-color);
`;

// Footer

const Styled_Footer = styled.footer`
  padding: 1rem 1.2rem;
  font-size: var(--font-small-size);
  color: var(--sidebar-content-dimmed-color);
`;

export function Sidebar(): JSX.Element {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");

  const isAuth = useUserSelector(userStoreSelectors.isAuth);
  const isLoading = useGistSelector(noteStoreSelectors.isLoading);
  const filesTree = useGistSelector((state) => noteStoreSelectors.getFilesTree(state, filter));

  const onFiltering = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  }, []);

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
      
        <User></User>

        <Styled_Search>
          <span className="icon fa-solid fa-search" aria-hidden="true" />
          <input type="search" placeholder="filter..." onChange={onFiltering} />
        </Styled_Search>
      </Styled_Header>

      <GitHubAuth />

      <Styled_Nav>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Styled_FilesList>
              {filesTree.children?.map((child) => {
                return isFolder(child.value) ? (
                  <SidebarNodeFolder folder={child.value} children={child.children} key={child.value.id} />
                ) : (
                  <SidebarNodeNote note={child.value} key={child.value.id} />
                );
              })}
            </Styled_FilesList>

            {isAuth && (
              <Styled_CreateList>
                <SidebarNavBranch
                  label="Create new folder..."
                  onClick={onClickCreateFolder}
                  icon={<Icon className="fa-solid fa-plus" title="Folder" />}
                />
              </Styled_CreateList>
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
