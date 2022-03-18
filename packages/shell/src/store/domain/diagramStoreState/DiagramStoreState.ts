import { DiagramId } from "@nevcos/shared/src/diagram/DiagramId";
import { DiagramMap } from "@nevcos/shared/src/diagram/DiagramMap";
import { diagramsMapMock } from "@nevcos/shared/src/mock/diagrams";

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
