import ReactDOM from "react-dom";

import {DiagramCode} from "@nevcos/react-plantuml-ide-shared/src/types";

import {CodeEditor} from "./ui/CodeEditor";

const samplePlantUmlCode = "Hello -> World" as DiagramCode;

export function mount(container: HTMLElement): () => void {
  ReactDOM.render(<CodeEditor code={samplePlantUmlCode} />, container);
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
