import { produce } from "immer";
import { useState } from "react";
import { Diagram } from "../model/Diagram";
import { DiagramCode, DiagramId, DiagramName } from "../types";

export const defaultDiagrams = [
  { id: 1 as DiagramId, name: "Diagram 1" as DiagramName, code: "class Bob" as DiagramCode },
  { id: 2 as DiagramId, name: "Diagram 2" as DiagramName, code: "class Jane" as DiagramCode }
];

export function useDiagramStore() {
  const [lastId, setLastId] = useState<DiagramId>(2 as DiagramId);
  const [diagrams, setDiagrams] = useState<Diagram[]>(defaultDiagrams);
  const [selectedDiagramId, setSelectedDiagramId] = useState<DiagramId | null>(1 as DiagramId);

  function getNextId(): DiagramId {
    const nextId = (lastId + 1) as DiagramId;
    setLastId(nextId);
    return nextId;
  }

  function getDiagramNames(): DiagramName[] {
    return diagrams.map((d) => d.name);
  }

  function getSelectedDiagram(): Diagram | null {
    return diagrams.filter((d) => d.id === selectedDiagramId)[0];
  }

  function setSelectedDiagramCode(code: DiagramCode): void {
    setDiagrams(
      produce(diagrams, (diagrams) => {
        for (const diagram of diagrams) {
          if (diagram.id === selectedDiagramId && diagram.code !== code) {
            diagram.code = code;
          }
        }
      })
    );
  }

  function createNewDiagram(): Diagram {
    const id = getNextId();
    const newDiagram = {
      id,
      name: `New Diagram ${id}` as DiagramName,
      code: `Hello->World` as DiagramCode
    }
    setDiagrams(
      produce(diagrams, (diagrams) => {
        diagrams.push(newDiagram);
      })
    );
    setSelectedDiagramId(id);
    return newDiagram;
  }

  function deleteDiagram(id: number): void {
    setDiagrams(diagrams.filter((diagram) => diagram.id !== id));
    if (selectedDiagramId === id) {
      setSelectedDiagramId(null);
    }
  }

  return {
    diagrams,
    setDiagrams,
    getDiagramNames,
    selectedDiagramId,
    setSelectedDiagramId,
    getSelectedDiagram,
    setSelectedDiagramCode,
    createNewDiagram,
    deleteDiagram
  };
}
