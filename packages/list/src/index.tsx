import ReactDOM from "react-dom";

import {Diagram} from "@nevcos/react-plantuml-ide-shared/src/model/Diagram";

import {DiagramsList} from "./ui/DiagramsList";

const sampleDiagramsList = [] as Diagram[];

export function mount(container: HTMLElement): () => void {
  ReactDOM.render(<DiagramsList diagrams={sampleDiagramsList} />, container);
  return () => unmount(container);
}

export function unmount(element: HTMLElement): void {
  ReactDOM.unmountComponentAtNode(element);
}

function isStandaloneMode(): boolean {
  return "isStandaloneMode" in window;
}

if (isStandaloneMode()) {
  mount(document.getElementById("root") as HTMLElement);
}
