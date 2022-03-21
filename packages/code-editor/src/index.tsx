import ReactDOM from "react-dom";

import { CodeEditor } from "./ui/CodeEditor";
import { DocumentContent } from "@nevcos/shared/src/document/DocumentContent";
import { MFFragment } from "@nevcos/shared/src/microFrontend/model/MFFragment";
import { MFEvent } from "@nevcos/shared/src/microFrontend/model/MFEvent";
import { isMFShellModeEnabled, mountMFModule } from "@nevcos/shared/src/microFrontend/MFService";

const samplePlantUmlCode = "Hello -> World" as DocumentContent;

export default class CodeEditorModule extends HTMLElement implements MFFragment {
  connectedCallback(): void {
    ReactDOM.render(<CodeEditor code={samplePlantUmlCode} />, this);
  }
  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }
  onEvent?(event: MFEvent<unknown>): void {}
}

if (!isMFShellModeEnabled()) {
  const container = document.getElementById("root") as HTMLElement;
  mountMFModule(container, "test-code-editor", CodeEditorModule);
}
