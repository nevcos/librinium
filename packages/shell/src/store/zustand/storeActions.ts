// Actions
import * as DiagramsApi from "../../remoteApi/diagramsApi";
import * as selectors from "../domain/diagramStoreState/diagramStoreStateSelectors";
import { DiagramId } from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramId";
import { Diagram } from "@nevcos/react-plantuml-ide-shared/src/diagram/Diagram";
import {DiagramMap} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramMap";
import {useStore, logAsyncAction} from "./store";
import produce from "immer";
import * as reducers from "../domain/diagramStoreState/diagramStoreStateReducers";
import {DiagramCode} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramCode";

const p = <T>(v: T) => ({ type: "", payload: v });

export const setDiagrams = (diagrams: DiagramMap) =>
  useStore.setState(produce((state) => reducers.setDiagrams(state, p(diagrams))), false, "setDiagrams");
export const addDiagram = (diagram: Diagram) =>
  useStore.setState(produce((state) => reducers.addDiagram(state, p(diagram))), false, "addDiagram");
export const selectDiagram = (id: DiagramId) =>
  useStore.setState(produce((state) => reducers.selectDiagram(state, p(id))), false, "selectDiagram");
export const updateSelectedDiagramCode = (code: DiagramCode) =>
  useStore.setState(produce((state) => reducers.updateSelectedDiagramCode(state, p(code))), false, "updateSelectedDiagramCode");
export const deleteDiagram = (id: DiagramId) =>
  useStore.setState(produce((state) => reducers.deleteDiagram(state, p(id))), false, "deleteDiagram");
export const setIsLoading = (loading: boolean) =>
  useStore.setState(produce((state) => reducers.setIsLoading(state, p(loading))), false, "setIsLoading");

export async function fetchDiagrams(): Promise<void> {
  const actionName = "fetchDiagrams";
  logAsyncAction(actionName);

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
  const actionName = "createNewDiagram";
  logAsyncAction(actionName);

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
