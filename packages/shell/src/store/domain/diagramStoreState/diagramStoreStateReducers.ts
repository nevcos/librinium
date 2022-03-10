import type { PayloadAction } from "@reduxjs/toolkit";
import type { DiagramMap } from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramMap";
import type { Diagram } from "@nevcos/react-plantuml-ide-shared/src/diagram/Diagram";
import type { DiagramId } from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramId";
import type { DiagramCode } from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramCode";
import type { DiagramStoreState } from "./DiagramStoreState";
import { getSelectedDiagram } from "./diagramStoreStateSelectors";

export function setDiagrams(state: DiagramStoreState, action: PayloadAction<DiagramMap>): void {
  state.diagrams = action.payload;
  state.selectedDiagramId = Object.values(state.diagrams)[0]?.id;
}

export function addDiagram(state: DiagramStoreState, action: PayloadAction<Diagram>): void {
  const diagram = action.payload;
  state.diagrams[diagram.id] = diagram;
  state.selectedDiagramId = diagram.id;
}

export function selectDiagram(state: DiagramStoreState, action: PayloadAction<DiagramId>): void {
  // noinspection UnnecessaryLocalVariableJS
  const id = action.payload;
  state.selectedDiagramId = id;
}

export function updateSelectedDiagramCode(state: DiagramStoreState, action: PayloadAction<DiagramCode>): void {
  const code = action.payload;
  const selectedDiagram = getSelectedDiagram(state);
  if (selectedDiagram && selectedDiagram.code !== code) {
    selectedDiagram.code = code;
  }
}

export function deleteDiagram(state: DiagramStoreState, action: PayloadAction<DiagramId>): void {
  const id = action.payload;
  delete state.diagrams[id];
  if (state.selectedDiagramId === id) {
    state.selectedDiagramId = null;
  }
}

export function setIsLoading(state: DiagramStoreState, action: PayloadAction<boolean>): void {
  state.isLoading = action.payload;
}
