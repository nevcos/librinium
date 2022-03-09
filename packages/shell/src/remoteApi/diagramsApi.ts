import {Diagram} from "@nevcos/react-plantuml-ide-shared/src/diagram/Diagram";

const BASE_URL = "https://my-json-server.typicode.com/nevcos/react-plantuml-ide";

export async function fetchDiagrams(): Promise<Diagram[]> {
  const response = await fetch(BASE_URL + "/diagrams");
  return await response.json();
}
