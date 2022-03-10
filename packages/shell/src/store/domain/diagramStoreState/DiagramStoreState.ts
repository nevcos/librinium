import { DiagramId, getNextDiagramId } from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramId";
import { DiagramMap } from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramMap";

export interface DiagramStoreState {
  isLoading: boolean;
  error: string | null;
  selectedDiagramId: DiagramId | null;
  diagrams: DiagramMap;
}

export const initialState: DiagramStoreState = {
  isLoading: false,
  error: null,
  selectedDiagramId: null,
  diagrams: {}
};
