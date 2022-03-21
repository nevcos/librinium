import { memo, useCallback } from "react";
import styled from "styled-components";
import { Document } from "@nevcos/shared/src/document/Document";
import { DocumentId } from "@nevcos/shared/src/document/DocumentId";
import { RenderingCounter } from "@nevcos/shared/src/ui/renderingCounter/RenderingCounter";
import { DocumentContentType } from "@nevcos/shared/src/document/DocumentContentType";

const ListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const OptionLi = styled.li`
  display: flex;

  &.--selected {
    background-color: white;
  }

  &:hover,
  &:focus {
    background-color: lightgray;
  }
`;

const OptionButton = styled.button`
  border: none;
  padding: 10px;
  width: 100%;
  background-color: transparent;

  &:not(:disabled) {
    cursor: pointer;
  }
`;

const NewButton = styled(OptionButton)`
  background-color: orange;

  &:not(:disabled) {
    cursor: pointer;
  }
`;

const DeleteButton = styled.button`
  border-color: transparent;
  background-color: transparent;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:hover,
  &:focus {
    background-color: rosybrown;
  }
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
    <>
      <RenderingCounter />
      <ListUl>
        {[
          <OptionLi key="create">
            <NewButton onClick={onCreatePlantUml} data-testid="create">
              + Create new PlantUML diagram
            </NewButton>
            <NewButton onClick={onCreateRemark} data-testid="create">
              + Create new Remark Presentation
            </NewButton>
          </OptionLi>,
          ...documents.map((document) => (
            <OptionLi key={document.id} className={document.id === selectedId ? "--selected" : ""}>
              <OptionButton
                onClick={() => onSelectDocument?.(document.id)}
                onDoubleClick={() => onRenameDocument?.(document.id)}
                data-testid="select"
              >
                {document.name}
              </OptionButton>
              <DeleteButton onClick={() => onDeleteDocument?.(document.id)} data-testid="delete" title="Delete">
                X
              </DeleteButton>
            </OptionLi>
          ))
        ]}
      </ListUl>
    </>
  );
});
