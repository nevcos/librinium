import { memo, useCallback } from 'react';

import type { Document } from "../../domain/document/Document";
import type { DocumentId } from "../../domain/document/DocumentId";
import type { DocumentName } from '../../domain/document/DocumentName';
import { DocumentContentType } from "../../domain/document/DocumentContentType";

import { RenderingCounter } from "../shared/RenderingCounter";
import { Spinner } from "../shared/Spinner";

import logoPath from "./assets/logo.svg";
import { BreadCrumb } from "./BreadCrumb";
import { DocumentIcon } from './DocumentIcon';
import * as Styled from './DocumentsList.style';

interface Props {
  isLoading: boolean;
  documents: Document[];
  selectedId?: DocumentId | null;
  onSelectDocument?: (id: DocumentId) => void;
  onCreateDocument?: (type: DocumentContentType) => void;
  onDeleteDocument?: (id: DocumentId) => void;
  onRenameDocument?: (id: DocumentId, newName: DocumentName) => void;
}

export const DocumentsList = memo(function ({
  isLoading,
  documents,
  selectedId,
  onSelectDocument,
  onCreateDocument,
  onDeleteDocument,
  onRenameDocument
}: Props): JSX.Element {
  const onCreatePlantUml = useCallback(() => onCreateDocument?.(DocumentContentType.PLANT_UML), []);
  const onCreateRemark = useCallback(() => onCreateDocument?.(DocumentContentType.REMARK), []);
  const onDoubleClickRename = useCallback((document) => {
    if (!onRenameDocument) return;
    const newName = window.prompt("Rename", document.name);
    if (newName) {
      onRenameDocument(document.id, newName as DocumentName);
    }
  }, []);
  const onClickDeleteDocument = useCallback((document) => {
    if (!onDeleteDocument) return;
    const isConfirmed = window.confirm(`Delete ${document.name}?`);
    if (isConfirmed) {
      onDeleteDocument(document.id);
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
              <Styled.OptionLi key={document.id} className={document.id === selectedId ? "--selected" : ""}>
                <Styled.OpenButton
                  onClick={() => onSelectDocument?.(document.id)}
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
              <Styled.NewButton onClick={onCreatePlantUml} data-testid="create-plantuml">
                <DocumentIcon type={DocumentContentType.PLANT_UML}></DocumentIcon>
                <span>new Diagram ...</span>
              </Styled.NewButton>
            </Styled.OptionLi>
            <Styled.OptionLi>
              <Styled.NewButton onClick={onCreateRemark} data-testid="create-remark">
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
});
