import type {Diagram} from "@nevcos/react-plantuml-ide-shared/src/diagram/Diagram";
import type {DiagramMap} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramMap";
import type {DiagramId} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramId";

const BASE_URL = "https://my-json-server.typicode.com/nevcos/react-plantuml-ide";

export async function getDiagrams(): Promise<DiagramMap> {
  const response = await fetch(BASE_URL + "/diagrams");
  return await response.json();
}

export async function postDiagram(diagram: Diagram): Promise<void> {
  const response = await fetch(BASE_URL + "/diagrams/", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(diagram)
  });
  return await response.json();
}

export async function putDiagram(id: DiagramId, update: Partial<Diagram>): Promise<void> {
  const response = await fetch(BASE_URL + `/diagrams/${id}/`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update)
  });
  return await response.json();
}
