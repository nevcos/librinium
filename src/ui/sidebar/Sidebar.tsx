import { Link } from "react-router-dom";

import { noteContentTypeValues } from "../../domain/note/NoteContentType";
import { noteStoreSelectors } from "../../store/noteStore";

import { GitHubAuth } from "../gitHubAuth/GitHubAuth";
import { Spinner } from "../shared/Spinner";
import { RenderingCounter } from "../shared/RenderingCounter";
import logoPath from "./assets/logo.svg";
import * as Styled from "./Sidebar.style";
import { SidebarNavItemCreate } from "./SidebarNavItemCreate";
import { useGistSelector } from "../../hook/useGistSelector";
import { SidebarNavFolder } from "./SidebarNavFolder";
import { SidebarNavItemLink } from "./SidebarNavItemLink";

export function Sidebar(): JSX.Element {
  const isLoading = useGistSelector(noteStoreSelectors.isLoading);
  const folders = useGistSelector(noteStoreSelectors.getFolders);
  const notesWithoutFolder = useGistSelector(noteStoreSelectors.getNotesWithoutFolder);

  return (
    <Styled.Container>
      <RenderingCounter />
      <Styled.Header>
        <Styled.ToggleButton aria-label="Expand / Collapse menu" title="Expand / Collapse menu">
          <span className="icon fa-solid fa-bars" aria-hidden="true" />
        </Styled.ToggleButton>
        <Styled.Logo src={logoPath} alt="librinium" />
        <Styled.Search>
          <span className="icon fa-solid fa-search" aria-hidden="true" />
          <input type="search" placeholder="search..." />
        </Styled.Search>
      </Styled.Header>

      <GitHubAuth />

      <Styled.Nav>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Styled.ListUl className="folder-list">
              {folders.map((folder) => (
                <SidebarNavFolder key={folder.id} folder={folder} />
              ))}
            </Styled.ListUl>

            <Styled.ListUl className="folder-list">
              {notesWithoutFolder.map((note) => (
                <SidebarNavItemLink note={note} key={document.id} />
              ))}
            </Styled.ListUl>

            <Styled.ListUl className="create-list">
              {noteContentTypeValues.map((type) => (
                <SidebarNavItemCreate type={type} key={type} />
              ))}
            </Styled.ListUl>
          </>
        )}
      </Styled.Nav>

      <Styled.Footer>
        <div>
          <span className="icon fa-solid fa-wand-magic-sparkles" aria-hidden="true" /> double click a name to rename
        </div>
        <div>
          <span className="icon fa-solid fa-wand-magic-sparkles" aria-hidden="true" /> <kbd>ctrl</kbd> + mouse wheel to
          zoom preview
        </div>
        <div>
          <Link to="/about">
            <span className="icon fa-solid fa-code" aria-hidden="true" /> about librinium ...
          </Link>
        </div>
      </Styled.Footer>
    </Styled.Container>
  );
}
