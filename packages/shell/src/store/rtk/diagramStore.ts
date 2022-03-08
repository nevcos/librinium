import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {DiagramId} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramId";
import {Diagram} from "@nevcos/react-plantuml-ide-shared/src/diagram/Diagram";
import {DiagramName} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramName";
import {DiagramCode} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramCode";

let nextId = 1 as DiagramId;
function getNextId(): DiagramId {
  return nextId ++ as DiagramId;
}

export interface DiagramStoreState {
  selectedDiagramId: DiagramId | null;
  diagrams: Diagram[]
}

const initialState: DiagramStoreState = {
  selectedDiagramId: nextId,
  diagrams: [
    { id: nextId ++ as DiagramId, name: "Diagram 1" as DiagramName, code: "class Bob" as DiagramCode },
    { id: nextId ++ as DiagramId, name: "Diagram 2" as DiagramName, code: "class Jane" as DiagramCode }
  ]
};

export const diagramStore = createSlice({
  name: 'diagram',
  initialState,
  reducers: {

    selectDiagram(state: DiagramStoreState, action: PayloadAction<DiagramId>): void {
      // noinspection UnnecessaryLocalVariableJS
      const id = action.payload;
      state.selectedDiagramId = id;
    },

    updateSelectedDiagramCode(state: DiagramStoreState, action: PayloadAction<DiagramCode>): void {
      const code = action.payload;
      for (const diagram of state.diagrams) {
        if (diagram.id === state.selectedDiagramId && diagram.code !== code) {
          diagram.code = code;
        }
      }
    },

    createNewDiagram(state: DiagramStoreState): void {
      const id = getNextId();
      const newDiagram = {
        id,
        name: `New Diagram ${id}` as DiagramName,
        code: `New->Diagram ${id}` as DiagramCode
      }
      state.diagrams.push(newDiagram);
      state.selectedDiagramId = id;
    },

    deleteDiagram(state: DiagramStoreState, action: PayloadAction<DiagramId>): void {
      const id = action.payload;
      state.diagrams = state.diagrams.filter((diagram) => diagram.id !== id)
      if (state.selectedDiagramId === id) {
        state.selectedDiagramId = null;
      }
    }

  }
})

export const {
  selectDiagram,
  updateSelectedDiagramCode,
  createNewDiagram,
  deleteDiagram
} = diagramStore.actions;

export function selectedDiagramSelector(state: DiagramStoreState): Diagram | null {
  return state.diagrams.find((diagram) => diagram.id === state.selectedDiagramId) || null
}

export function diagramsSelector(state: DiagramStoreState): Diagram[] {
  return state.diagrams;
}

export const diagramStoreReducer = diagramStore.reducer;
