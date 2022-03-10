import {DiagramId, getNextDiagramId} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramId";
import {DiagramName} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramName";
import {DiagramCode} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramCode";
import {Diagram} from "@nevcos/react-plantuml-ide-shared/src/diagram/Diagram";
import {DiagramStoreState} from "./DiagramStoreState";

export function createNewDiagram() {
  const id = getNextDiagramId();
  return {
    id,
    name: `New Diagram` as DiagramName,
    code: `New->Diagram` as DiagramCode
  };
}

export function isLoading(state: DiagramStoreState): boolean {
  return state.isLoading;
}

export function getDiagrams(state: DiagramStoreState): Diagram[] {
  return Object.values(state.diagrams);
}

export function getDiagram(state: DiagramStoreState, diagramId: DiagramId): Diagram | null {
  return getDiagrams(state).find((diagram) => diagram.id === diagramId) || null;
}

export function getSelectedDiagram(state: DiagramStoreState): Diagram | null {
  if (!state.selectedDiagramId) return null;
  return getDiagram(state, state.selectedDiagramId);
}
