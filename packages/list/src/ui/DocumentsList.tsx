import { memo, useCallback } from "react";
import styled from "styled-components";
import { Document } from "@nevcos/shared/src/document/Document";
import { DocumentId } from "@nevcos/shared/src/document/DocumentId";
import { RenderingCounter } from "@nevcos/shared/src/ui/renderingCounter/RenderingCounter";
import { DocumentContentType } from "@nevcos/shared/src/document/DocumentContentType";
import logoPath from "./assets/logo.svg";
import { BreadCrumb } from "./BreadCrumb";

const Container = styled.div`
  background-color: #275063;
  color: white;
  padding: 10px;
`;

const LogoImage = styled.img``;

const ListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: grid;
  grid-gap: 2px;
`;

const OptionLi = styled.li`
  display: flex;
  border-radius: 3px;
  
  &:hover {
    background-color: rgba(255,255,255,0.1);
  }

  &.--selected {
    background-color: rgba(255,255,255,0.3);
    
    &:hover {
      background-color: rgba(255,255,255,0.4);
    }
  }
`;

const SimpleButton = styled.button`
  border: none;
  border-radius: 2px;
  background-color: transparent;
  text-align: left;
  padding: 10px;
  color: inherit;     

  &:not(:disabled) {
    cursor: pointer;
  }
`;

const DocumentButton = styled(SimpleButton)`
  padding: 10px;
  width: 100%;
`;

const DeleteButton = styled(SimpleButton)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  &:hover,
  &:focus {
    background-color: rosybrown;
  }
`;

const NewButton = styled(DocumentButton)`
  width: 100%;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
`;

interface Props {
  documents: Document[];
  selectedId?: DocumentId | null;
  onSelectDocument?: (id: DocumentId) => void;
  onCreateDocument?: (type: DocumentContentType) => void;
  onDeleteDocument?: (id: DocumentId) => void;
  onRenameDocument?: (id: DocumentId) => void;
}

export const DocumentsList = memo(function ({
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
    <Container>
      <RenderingCounter />

      <LogoImage src={logoPath} alt="librinium logo"></LogoImage>

      <BreadCrumb />

      <ListUl>
        {documents.map((document) => (
          <OptionLi key={document.id} className={document.id === selectedId ? "--selected" : ""}>
            <DocumentButton
              onClick={() => onSelectDocument?.(document.id)}
              onDoubleClick={() => onRenameDocument?.(document.id)}
              data-testid="select"
            >
              {document.name}
            </DocumentButton>
            <DeleteButton onClick={() => onDeleteDocument?.(document.id)} data-testid="delete" title="Delete">
              <i className="fa-solid fa-xmark"></i>
            </DeleteButton>
          </OptionLi>
        ))}
        <OptionLi>
          <NewButton onClick={onCreatePlantUml} data-testid="create-plantuml">
            new Diagram ...
          </NewButton>
        </OptionLi>
        <OptionLi>
          <NewButton onClick={onCreateRemark} data-testid="create-remark">
            new Presentation ...
          </NewButton>
        </OptionLi>
      </ListUl>
    </Container>
  );
});
