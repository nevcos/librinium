import { DiagramId, getNextDiagramId } from "@nevcos/shared/src/diagram/DiagramId";
import { DiagramName } from "@nevcos/shared/src/diagram/DiagramName";
import { DiagramCode } from "@nevcos/shared/src/diagram/DiagramCode";
import { Diagram } from "@nevcos/shared/src/diagram/Diagram";
import { DiagramStoreState } from "./DiagramStoreState";
import { DiagramType } from "@nevcos/shared/src/diagram/DiagramType";

export function createNewDiagram(): Diagram {
  const id = getNextDiagramId();
  return {
    id,
    name: `New Diagram` as DiagramName,
    code: `New->Diagram` as DiagramCode,
    type: DiagramType.PLANT_UML
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
