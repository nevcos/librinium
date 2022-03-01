import {act, renderHook} from "@testing-library/react-hooks";
import {useDiagramStore} from "./diagramStore";
import {DiagramCode, DiagramId, DiagramName} from "../types";
import {Diagram} from "../model/Diagram";

const diagram0 = {
  id: 0 as DiagramId,
  name: "diagram0" as DiagramName,
  code: "code0" as DiagramCode
};

const diagram1 = {
  id: 1 as DiagramId,
  name: "diagram1" as DiagramName,
  code: "code1" as DiagramCode
};

const diagrams = [diagram0, diagram1];

describe("diagramStore", () => {

  it("Should store and return the same diagrams", () => {
    const diagramNames = diagrams.map(diagram => diagram.name);
    const { result } = renderHook(useDiagramStore);

    act(() => {
      result.current.setDiagrams(diagrams);
    });

    expect(result.current.diagrams).toEqual(diagrams);
    expect(result.current.getDiagramNames()).toEqual(diagramNames);
  });

  it("Should store and return the proper selected diagram", () => {
    const { result } = renderHook(useDiagramStore);

    act(() => {
      result.current.setDiagrams(diagrams);
      result.current.setSelectedDiagramId(diagram1.id);
    });

    expect(result.current.getSelectedDiagram()).toEqual(diagram1);
  });

  it("Should store and return the proper selected diagram", () => {
    const { result } = renderHook(useDiagramStore);

    act(() => {
      result.current.setDiagrams(diagrams);
      result.current.setSelectedDiagramId(diagram1.id);
    });

    expect(result.current.getSelectedDiagram()).toEqual(diagram1);
  });

  it("Should store and return the proper selected diagram", () => {
    const { result } = renderHook(useDiagramStore);

    act(() => {
      result.current.setDiagrams(diagrams);
      result.current.setSelectedDiagramId(diagram1.id);
    });

    expect(result.current.getSelectedDiagram()).toEqual(diagram1);
  });

  it("Should store and return the selected diagram code", () => {
    const newDiagramCode = "newCode" as DiagramCode;
    const { result } = renderHook(useDiagramStore);

    act(() => {
      result.current.setDiagrams(diagrams);
      result.current.setSelectedDiagramId(diagram1.id);
      result.current.setSelectedDiagramCode(newDiagramCode)
    });

    expect(result.current.getSelectedDiagram()?.code).toEqual(newDiagramCode);
  });

  it("Should create a new Diagram", () => {
    const { result } = renderHook(useDiagramStore);
    let newDiagram: Diagram | null = null;

    act(() => {
      newDiagram = result.current.createNewDiagram();
    });

    expect(newDiagram).toBeDefined();
    newDiagram && expect(result.current.diagrams.includes(newDiagram)).toBeTruthy();
  });

  // it("Should delete diagram", () => {
  //   const newDiagramCode = "newCode" as DiagramCode;
  //   const { result } = renderHook(useDiagramStore);
  //   let newDiagram: Diagram | null = null;
  //
  //   act(() => {
  //     result.current.setDiagrams(diagrams);
  //     newDiagram = result.current.createNewDiagram();
  //   });
  //
  //   expect(newDiagram).toBeDefined();
  //   expect(result.current.diagrams.includes(newDiagram)).toBeTruthy();
  // });

});

//
//   createNewDiagram,
//   deleteDiagram
