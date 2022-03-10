// Actions
import * as DiagramsApi from "../../remoteApi/diagramsApi";
import * as selectors from "../domain/diagramStoreState/diagramStoreStateSelectors";
import { DiagramId } from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramId";
import { Diagram } from "@nevcos/react-plantuml-ide-shared/src/diagram/Diagram";
import {DiagramMap} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramMap";
import {useStore} from "./store";
import produce from "immer";
import * as reducers from "../domain/diagramStoreState/diagramStoreStateReducers";
import {DiagramCode} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramCode";

const p = <T>(v: T) => ({ type: "", payload: v });

export const setDiagrams = (diagrams: DiagramMap) =>
  useStore.setState(produce((state) => reducers.setDiagrams(state, p(diagrams))));
export const addDiagram = (diagram: Diagram) =>
  useStore.setState(produce((state) => reducers.addDiagram(state, p(diagram))));
export const selectDiagram = (id: DiagramId) =>
  useStore.setState(produce((state) => reducers.selectDiagram(state, p(id))));
export const updateSelectedDiagramCode = (code: DiagramCode) =>
  useStore.setState(produce((state) => reducers.updateSelectedDiagramCode(state, p(code))));
export const deleteDiagram = (id: DiagramId) =>
  useStore.setState(produce((state) => reducers.deleteDiagram(state, p(id))));
export const setIsLoading = (loading: boolean) =>
  useStore.setState(produce((state) => reducers.setIsLoading(state, p(loading))));

export async function fetchDiagrams(): Promise<void> {
  setIsLoading(true);
  try {
    const diagrams = await DiagramsApi.getDiagrams();
    setDiagrams(diagrams);
  } catch (error) {
    // TBD
  } finally {
    setIsLoading(false);
  }
}

export async function createNewDiagram(): Promise<void> {
  setIsLoading(true);
  const newDiagram = selectors.createNewDiagram();
  try {
    await DiagramsApi.postDiagram(newDiagram);
    addDiagram(newDiagram);
  } catch (error) {
    // TBD
  } finally {
    setIsLoading(false);
  }
}

export async function putDiagram(id: DiagramId, update: Partial<Diagram>): Promise<void> {
  await DiagramsApi.putDiagram(id, update);
}
