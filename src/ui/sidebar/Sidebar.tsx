import { useCallback } from 'react';

import type { DocumentId } from "../../domain/document/DocumentId";
import type { DocumentName } from '../../domain/document/DocumentName';
import { DocumentContentType } from "../../domain/document/DocumentContentType";

import { RenderingCounter } from "../shared/RenderingCounter";
import { Spinner } from "../shared/Spinner";

import logoPath from "./assets/logo.svg";
import { BreadCrumb } from "./BreadCrumb";
import { DocumentIcon } from './DocumentIcon';
import * as Styled from './Sidebar.style';
import { useSelector, useDispatch } from 'react-redux';
import { documentStoreActions, documentStoreSelectors } from '../../store/documentStore';
import { DocumentStoreState } from '../../domain/documentStoreState/DocumentStoreState';

export function Sidebar(): JSX.Element {
  const dispatch = useDispatch();

  const isLoading = useSelector<DocumentStoreState>(documentStoreSelectors.isLoading);
  const documents = useSelector<DocumentStoreState>(documentStoreSelectors.getDocuments);
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
        <Styled.Logo src={logoPath} alt="librinium logo"></Styled.Logo>
        <Styled.Title>
          <BreadCrumb />
        </Styled.Title>
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
                <Styled.DeleteButton onClick={() => onClickDeleteDocument(document)} data-testid="delete" title="Delete">
                  <i className="fa-solid fa-xmark"></i>
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

      <Styled.Footer>
        <span className="fa-solid fa-circle-info" aria-hidden="true" /> Double click on an document name to rename it
      </Styled.Footer>
    </Styled.Container>
  );
}
