import ReactDOM from "react-dom";

import {Diagram} from "@nevcos/react-plantuml-ide-shared/src/diagram/Diagram";

import {DiagramsList} from "./ui/DiagramsList";
import {
  isMFShellModeEnabled,
  mountMFModule
} from "@nevcos/react-plantuml-ide-shared/src/microFrontend/MFService";
import {MFFragment} from "@nevcos/react-plantuml-ide-shared/src/microFrontend/model/MFModule";
import {MFEvent} from "@nevcos/react-plantuml-ide-shared/src/microFrontend/model/MFEvent";

const sampleDiagramsList = [] as Diagram[];

export default class DiagramsListModule extends HTMLElement implements MFFragment {
  connectedCallback(): void {
    ReactDOM.render(<DiagramsList diagrams={sampleDiagramsList} />, this);
  }
  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }
  onEvent?(event: MFEvent<unknown>): void {

  }
}

if (!isMFShellModeEnabled()) {
  const container = document.getElementById("root") as HTMLElement;
  mountMFModule(container, "test-diagrams-list", DiagramsListModule);
}
