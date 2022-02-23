import { produce } from "immer";
import { useState } from "react";

export function useDiagramStore() {
  const [lastId, setLastId] = useState(2);

  const [diagrams, setDiagrams] = useState(() => [
    { id: 1, name: "Diagram 1", code: "class Bob" },
    { id: 2, name: "Diagram 2", code: "class Jane" }
  ]);

  const [selectedDiagramId, setSelectedDiagramId] = useState(1);

  function getNextId() {
    const nextId = lastId + 1;
    setLastId(nextId);
    return nextId;
  }

  function getDiagramNames() {
    return diagrams.map((d) => d.name);
  }

  function getSelectedDiagram() {
    return diagrams.filter((d) => d.id === selectedDiagramId)[0];
  }

  function setSelectedDiagramCode(code) {
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

  function createNewDiagram() {
    const id = getNextId();
    setDiagrams(
      produce(diagrams, (diagrams) => {
        diagrams.push({
          id,
          name: `New Diagram ${id}`,
          code: `Hello->World`
        });
      })
    );
    setSelectedDiagramId(id);
  }

  function deleteDiagram(id) {
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
