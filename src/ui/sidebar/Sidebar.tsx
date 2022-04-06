import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import type { DocumentId } from "../../domain/document/DocumentId";
import type { DocumentName } from '../../domain/document/DocumentName';
import { DocumentContentType } from "../../domain/document/DocumentContentType";
import type { DocumentStoreState } from '../../domain/documentStoreState/DocumentStoreState';
import { Gists } from "../gists/Gists"

import { RenderingCounter } from "../shared/RenderingCounter";
import { Spinner } from "../shared/Spinner";
import logoPath from "./assets/logo.svg";
import { DocumentIcon } from './DocumentIcon';
import { documentStoreActions, documentStoreSelectors } from '../../store/documentStore';

import * as Styled from './Sidebar.style';

export function Sidebar(): JSX.Element {
  const dispatch = useDispatch();

  const isLoading = useSelector(documentStoreSelectors.isLoading);
  const documents = useSelector(documentStoreSelectors.getDocuments);
  const selectedId = useSelector<DocumentStoreState>(state => state.selectedDocumentId);

  const onClickSelectDocument = useCallback((id: DocumentId) => dispatch(documentStoreActions.selectDocument(id)), []);
  const onClickCreatePlantUml = useCallback(() => dispatch(documentStoreActions.createNewDocument(DocumentContentType.PLANT_UML)), []);
  const onClickCreateRemark = useCallback(() => dispatch(documentStoreActions.createNewDocument(DocumentContentType.REMARK)), []);
  const onDoubleClickRename = useCallback((document) => {
    const newName = window.prompt("Rename", document.name);
    if (newName) {
      dispatch(documentStoreActions.updateDocumentName({id: document.id, name: newName as DocumentName}));
    }
  }, []);
  const onClickDeleteDocument = useCallback((document) => {
    const isConfirmed = window.confirm(`Delete ${document.name}?`);
    if (isConfirmed) {
      dispatch(documentStoreActions.deleteDocument(document.id));
    }
  }, []);

  return (
    <Styled.Container>
      <RenderingCounter />
      <Styled.Header>
        <Styled.ToggleButton aria-label="Expand / Collapse menu" title="Expand / Collapse menu">
          <span className="fa-solid fa-bars" aria-hidden="true"></span>
        </Styled.ToggleButton>
        <Styled.Logo src={logoPath} alt="librinium" />
        <Styled.Search>
          <span className="fa-solid fa-search" aria-hidden="true"></span>
          <input type="search" placeholder='search...'></input>
        </Styled.Search>
      </Styled.Header>

      <Styled.Nav>
        {isLoading ? (
          <Spinner />
        ) : (
          <Styled.ListUl>
            {documents.map((document) => (
              <Styled.OptionLi key={document.id} className={document.id === selectedId ? "--selected" : ""} data-testid="document">
                <Styled.OpenButton
                  onClick={() => onClickSelectDocument(document.id)}
                  onDoubleClick={() => onDoubleClickRename(document)}
                  data-testid="select"
                >
                  <DocumentIcon type={document.type}></DocumentIcon>
                  <span>{document.name}</span>
                </Styled.OpenButton>
                <Styled.DeleteButton onClick={() => onClickDeleteDocument(document)} data-testid="delete" title="Delete" aria-label='Delete'>
                  <span className="fa-solid fa-xmark" aria-hidden="true"></span>
                </Styled.DeleteButton>
              </Styled.OptionLi>
            ))}
            <Styled.OptionLi>
              <Styled.NewButton onClick={onClickCreatePlantUml} data-testid="create-plantuml">
                <DocumentIcon type={DocumentContentType.PLANT_UML}></DocumentIcon>
                <span>new Diagram ...</span>
              </Styled.NewButton>
            </Styled.OptionLi>
            <Styled.OptionLi>
              <Styled.NewButton onClick={onClickCreateRemark} data-testid="create-remark">
                <DocumentIcon type={DocumentContentType.REMARK}></DocumentIcon>
                <span>new Presentation ...</span>
              </Styled.NewButton>
            </Styled.OptionLi>
          </Styled.ListUl>
        )}
      </Styled.Nav>

      <Gists />

      <Styled.Footer>
        <div>
          <span className="fa-solid fa-wand-magic-sparkles" aria-hidden="true" /> double click a name to rename
        </div>
        <div>
           <a href="#about">
             <span className="fa-solid fa-code" aria-hidden="true" /> about librinium ...
           </a>
        </div>
      </Styled.Footer>
    </Styled.Container>
  );
}
