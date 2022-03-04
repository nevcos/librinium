import ReactDOM from "react-dom";

import {CodeEditor} from "./ui/CodeEditor";
import {DiagramCode} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramCode";
import {MFFragment} from "@nevcos/react-plantuml-ide-shared/src/microFrontend/model/MFModule";
import {MFEvent} from "@nevcos/react-plantuml-ide-shared/src/microFrontend/model/MFEvent";
import {
  isMFShellModeEnabled,
  mountMFModule
} from "@nevcos/react-plantuml-ide-shared/src/microFrontend/MFService";

const samplePlantUmlCode = "Hello -> World" as DiagramCode;

export default class CodeEditorModule extends HTMLElement implements MFFragment {
  connectedCallback(): void {
    ReactDOM.render(<CodeEditor code={samplePlantUmlCode} />, this);
  }
  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }
  onEvent?(event: MFEvent<unknown>): void {

  }
}

if (!isMFShellModeEnabled()) {
  const container = document.getElementById("root") as HTMLElement;
  mountMFModule(container, "test-code-editor", CodeEditorModule);
}
