import { produce } from "immer";
import {useState, useMemo, useCallback} from "react";
import { Diagram } from "@nevcos/react-plantuml-ide-shared/src/diagram/Diagram";
import {DiagramId, getNextDiagramId} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramId";
import {DiagramName} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramName";
import {DiagramCode} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramCode";

export const defaultDiagrams = [
  { id: getNextDiagramId(), name: "Diagram 1" as DiagramName, code: "class Bob" as DiagramCode },
  { id: getNextDiagramId(), name: "Diagram 2" as DiagramName, code: "class Jane" as DiagramCode }
];

export function useDiagramStore() {
  const [diagrams, setDiagrams] = useState<Diagram[]>(defaultDiagrams);
  const [selectedDiagramId, setSelectedDiagramId] = useState<DiagramId | null>(defaultDiagrams[1].id);

  const getDiagramNames = useCallback(function () : DiagramName[] {
    return diagrams.map((d) => d.name);
  }, [diagrams])

  const getSelectedDiagram = useCallback(function (): Diagram | null {
    return diagrams.filter((d) => d.id === selectedDiagramId)[0];
  }, [diagrams, selectedDiagramId]);

  const selectDiagram = function(id: DiagramId): void {
    setSelectedDiagramId(id);
  };

  const updateDiagramCode = useCallback(function (code: DiagramCode): void {
    setDiagrams(diagrams =>
      produce(diagrams, (diagrams) => {
        for (const diagram of diagrams) {
          if (diagram.id === selectedDiagramId && diagram.code !== code) {
            diagram.code = code;
          }
        }
      })
    );
  }, [selectedDiagramId])

  const createNewDiagram = useCallback(function(): Diagram {
    const id = getNextDiagramId();
    const newDiagram = {
      id,
      name: `New Diagram ${id}` as DiagramName,
      code: `New->Diagram ${id}` as DiagramCode
    }
    setDiagrams(diagrams =>
      produce(diagrams, (diagrams) => {
        diagrams.push(newDiagram);
      })
    );
    setSelectedDiagramId(id);
    return newDiagram;
  }, []);

  const deleteDiagram = useCallback(function(id: DiagramId): void {
    setDiagrams(diagrams => diagrams.filter((diagram) => diagram.id !== id));
    setSelectedDiagramId(selectedDiagramId => {
      return selectedDiagramId === id ? null : selectedDiagramId
    })
  }, []);

  return {
    diagrams,
    setDiagrams,
    getDiagramNames,
    selectedDiagramId,
    selectDiagram,
    getSelectedDiagram,
    updateDiagramCode,
    createNewDiagram,
    deleteDiagram
  };
}
