import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { documentContentTypeValues } from '../../domain/document/DocumentContentType';
import { documentStoreSelectors } from "../../store/documentStore";

import { GitHubAuth } from "../gitHubAuth/GitHubAuth";
import { Spinner } from "../shared/Spinner";
import { RenderingCounter } from "../shared/RenderingCounter";
import logoPath from "./assets/logo.svg";
import * as Styled from "./Sidebar.style";
import { SidebarNavItemLink as SidebarNavItemLink } from './SidebarNavItemLink';
import { SidebarNavItemCreate } from './SidebarNavItemCreate';

export function Sidebar(): JSX.Element {
  const isLoading = useSelector(documentStoreSelectors.isLoading);
  const documents = useSelector(documentStoreSelectors.getDocuments);

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
            <Styled.ListUl className="documents-list">
              {documents.map((document) =>
                <SidebarNavItemLink document={document} key={document.id} />
              )}
            </Styled.ListUl>
            <Styled.ListUl className="create-list">
              {documentContentTypeValues.map((type) =>
                <SidebarNavItemCreate type={type} key={type} />
              )}
            </Styled.ListUl>
          </>
        )}
      </Styled.Nav>

      <Styled.Footer>
        <div>
          <span className="icon fa-solid fa-wand-magic-sparkles" aria-hidden="true" /> double click a name to rename
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
