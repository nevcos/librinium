import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { documentContentTypeValues } from '../../domain/document/DocumentContentType';
import { Gists } from "../gists/Gists";

import { documentStoreSelectors } from "../../store/documentStore";
import { RenderingCounter } from "../shared/RenderingCounter";
import { Spinner } from "../shared/Spinner";
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
          <span className="icon fa-solid fa-bars" aria-hidden="true"></span>
        </Styled.ToggleButton>
        <Styled.Logo src={logoPath} alt="librinium" />
        <Styled.Search>
          <span className="icon fa-solid fa-search" aria-hidden="true"></span>
          <input type="search" placeholder="search..."></input>
        </Styled.Search>
      </Styled.Header>

      <Styled.Nav>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Styled.ListUl className="documents-list">
              {documents.map((document) => 
                <SidebarNavItemLink document={document} />
              )}
            </Styled.ListUl>
            <Styled.ListUl className="create-list">
              {documentContentTypeValues.map((type) => 
                <SidebarNavItemCreate type={type} />
              )}
            </Styled.ListUl>
          </>
        )}
      </Styled.Nav>

      <Gists />

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
