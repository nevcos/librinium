import styled from "styled-components";
import { DiagramId } from "../types";
import { Diagram } from "../model/Diagram";

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
  background-color: lightskyblue;

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

export function DiagramsList({
  diagrams,
  selectedId,
  onSelectDiagram,
  onCreateDiagram,
  onDeleteDiagram,
  onRenameDiagram
}: Props): JSX.Element {
  return (
    <ListUl>
      {[
        <OptionLi key="create">
          <NewButton onClick={onCreateDiagram} data-testid="create">+ Create new</NewButton>
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
            <DeleteButton onClick={() => onDeleteDiagram?.(diagram.id)} data-testid="delete">X</DeleteButton>
          </OptionLi>
        ))
      ]}
    </ListUl>
  );
}
