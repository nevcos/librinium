import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { DiagramId } from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramId";
import { Diagram } from "@nevcos/react-plantuml-ide-shared/src/diagram/Diagram";
import { DiagramName } from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramName";
import { DiagramCode } from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramCode";
import * as DiagramsApi from "../../remoteApi/diagramsApi";

let nextId = 1 as DiagramId;
function getNextId(): DiagramId {
  return nextId++ as DiagramId;
}

export interface DiagramStoreState {
  isLoading: boolean;
  error: string | null;
  selectedDiagramId: DiagramId | null;
  diagrams: Diagram[];
}

const initialState: DiagramStoreState = {
  isLoading: false,
  error: null,
  selectedDiagramId: nextId,
  diagrams: []
};

// First, create the thunk
export const fetchDiagramsThunk = createAsyncThunk("diagram/fetchDiagrams", DiagramsApi.fetchDiagrams);

function setDiagrams(state: DiagramStoreState, action: PayloadAction<Diagram[]>): void {
  state.diagrams = action.payload;
  state.selectedDiagramId = state.diagrams[0]?.id;
}

export const diagramStore = createSlice({
  name: "diagram",
  initialState,
  reducers: {
    setDiagrams,

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
      };
      state.diagrams.push(newDiagram);
      state.selectedDiagramId = id;
    },

    deleteDiagram(state: DiagramStoreState, action: PayloadAction<DiagramId>): void {
      const id = action.payload;
      state.diagrams = state.diagrams.filter((diagram) => diagram.id !== id);
      if (state.selectedDiagramId === id) {
        state.selectedDiagramId = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDiagramsThunk.pending, (state, action) => {
      state.isLoading = true;
    }),
      builder.addCase(fetchDiagramsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Error fetching...";
      }),
      builder.addCase(fetchDiagramsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        setDiagrams(state, action);
      });
  }
});

export const { selectDiagram, updateSelectedDiagramCode, createNewDiagram, deleteDiagram } = diagramStore.actions;

export function isLoadingSelector(state: DiagramStoreState): boolean {
  return state.isLoading;
}

export function selectedDiagramSelector(state: DiagramStoreState): Diagram | null {
  return state.diagrams.find((diagram) => diagram.id === state.selectedDiagramId) || null;
}

export function diagramsSelector(state: DiagramStoreState): Diagram[] {
  return state.diagrams;
}

export const diagramStoreReducer = diagramStore.reducer;
