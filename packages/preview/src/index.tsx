import ReactDOM from "react-dom";

import {PlantUmlPreview} from "./ui/PlantUmlPreview";
import {DiagramCode} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramCode";
import {
  isMFShellModeEnabled,
  mountMFModule
} from "@nevcos/react-plantuml-ide-shared/src/microFrontend/MFService";
import {MFFragment} from "@nevcos/react-plantuml-ide-shared/src/microFrontend/model/MFModule";
import {MFEvent} from "@nevcos/react-plantuml-ide-shared/src/microFrontend/model/MFEvent";

const samplePlantUmlCode = "Hello -> World" as DiagramCode;

export default class PlantUmlPreviewModule extends HTMLElement implements MFFragment {
  connectedCallback(): void {
    ReactDOM.render(<PlantUmlPreview code={samplePlantUmlCode} />, this);
  }
  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }
  onEvent?(event: MFEvent<unknown>): void {

  }
}

if (!isMFShellModeEnabled()) {
  const container = document.getElementById("root") as HTMLElement;
  mountMFModule(container, "test-preview", PlantUmlPreviewModule);
}
