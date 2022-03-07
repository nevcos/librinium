import { memo } from "react";
import styled from "styled-components";
import { Diagram } from "@nevcos/react-plantuml-ide-shared/src/diagram/Diagram";
import { DiagramId } from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramId";
import { RenderingCounter } from "@nevcos/react-plantuml-ide-shared/src/ui/renderingCounter/RenderingCounter";

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

  &:hover {
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

  &:hover {
    background-color: rosybrown;
  }
`;

interface Props {
  diagrams: Diagram[];
  selectedId?: DiagramId | null;
  onSelectDiagram?: (id: DiagramId) => void;
  onCreateDiagram?: () => void;
  onDeleteDiagram?: (id: DiagramId) => void;
  onRenameDiagram?: (id: DiagramId) => void;
}

export const DiagramsList = memo(function ({
  diagrams,
  selectedId,
  onSelectDiagram,
  onCreateDiagram,
  onDeleteDiagram,
  onRenameDiagram
}: Props): JSX.Element {
  return (
    <>
      <RenderingCounter />
      <ListUl>
        {[
          <OptionLi key="create">
            <NewButton onClick={onCreateDiagram} data-testid="create">
              + Create new
            </NewButton>
          </OptionLi>,
          ...diagrams.map((diagram) => (
            <OptionLi key={diagram.id} className={diagram.id === selectedId ? "--selected" : ""}>
              <OptionButton
                onClick={() => onSelectDiagram?.(diagram.id)}
                onDoubleClick={() => onRenameDiagram?.(diagram.id)}
                data-testid="select"
              >
                {diagram.name}
              </OptionButton>
              <DeleteButton onClick={() => onDeleteDiagram?.(diagram.id)} data-testid="delete">
                X
              </DeleteButton>
            </OptionLi>
          ))
        ]}
      </ListUl>
    </>
  );
});
