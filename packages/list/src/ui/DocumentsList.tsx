import { memo, useCallback } from "react";
import styled from "styled-components";

import { Document } from "@nevcos/shared/src/document/Document";
import { DocumentId } from "@nevcos/shared/src/document/DocumentId";
import { RenderingCounter } from "@nevcos/shared/src/ui/renderingCounter/RenderingCounter";
import { DocumentContentType } from "@nevcos/shared/src/document/DocumentContentType";

import logoPath from "./assets/logo.svg";
import { BreadCrumb } from "./BreadCrumb";
import { Spinner } from "./Spinner";
import { DocumentIcon } from './DocumentIcon';

const Styled_Container = styled.div`
  background-color: #275063;
  color: white;
  padding: .6rem;
`;

const Styled_Title = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.1rem;
`;

const Styled_Logo = styled.img``;

const Styled_ListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: grid;
  grid-gap: .2rem;
`;

const Styled_OptionLi = styled.li`
  display: flex;
  border-radius: .2rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.--selected {
    background-color: rgba(255, 255, 255, 0.3);

    &:hover {
      background-color: rgba(255, 255, 255, 0.4);
    }
  }
`;

const Styled_AbstractButton = styled.button`
  border: none;
  border-radius: .2rem;
  background-color: transparent;
  text-align: left;
  padding: .6rem .8rem;
  color: inherit;

  &:not(:disabled) {
    cursor: pointer;
  }

  > :nth-child(2) {
    margin-left: .6rem;
  }
`;

const Styled_DocumentButton = styled(Styled_AbstractButton)`
  padding: .6rem;
  width: 100%;
`;

const Styled_DeleteButton = styled(Styled_AbstractButton)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  &:hover,
  &:focus {
    background-color: rosybrown;
  }
`;

const Styled_NewButton = styled(Styled_DocumentButton)`
  width: 100%;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
`;

interface Props {
  isLoading: boolean;
  documents: Document[];
  selectedId?: DocumentId | null;
  onSelectDocument?: (id: DocumentId) => void;
  onCreateDocument?: (type: DocumentContentType) => void;
  onDeleteDocument?: (id: DocumentId) => void;
  onRenameDocument?: (id: DocumentId) => void;
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

  return (
    <Styled_Container>
      <RenderingCounter />

      <header>
        <Styled_Logo src={logoPath} alt="librinium logo"></Styled_Logo>
        <Styled_Title>
          <BreadCrumb />
        </Styled_Title>
      </header>

      {isLoading ? (
        <Spinner />
      ) : (
        <Styled_ListUl>
          {documents.map((document) => (
            <Styled_OptionLi key={document.id} className={document.id === selectedId ? "--selected" : ""}>
              <Styled_DocumentButton
                onClick={() => onSelectDocument?.(document.id)}
                onDoubleClick={() => onRenameDocument?.(document.id)}
                data-testid="select"
              >
                <DocumentIcon type={document.type}></DocumentIcon>
                <span>{document.name}</span>
              </Styled_DocumentButton>
              <Styled_DeleteButton onClick={() => onDeleteDocument?.(document.id)} data-testid="delete" title="Delete">
                <i className="fa-solid fa-xmark"></i>
              </Styled_DeleteButton>
            </Styled_OptionLi>
          ))}
          <Styled_OptionLi>
            <Styled_NewButton onClick={onCreatePlantUml} data-testid="create-plantuml">
              <DocumentIcon type={DocumentContentType.PLANT_UML}></DocumentIcon>
              <span>new Diagram ...</span>
            </Styled_NewButton>
          </Styled_OptionLi>
          <Styled_OptionLi>
            <Styled_NewButton onClick={onCreateRemark} data-testid="create-remark">
              <DocumentIcon type={DocumentContentType.REMARK}></DocumentIcon>
              <span>new Presentation ...</span>
            </Styled_NewButton>
          </Styled_OptionLi>
        </Styled_ListUl>
      )}
    </Styled_Container>
  );
});
