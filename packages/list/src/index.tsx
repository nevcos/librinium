import ReactDOM from "react-dom";

import { Document } from "@nevcos/shared/src/document/Document";

import { DocumentsList } from "./ui/DocumentsList";
import { isMFShellModeEnabled, mountMFModule } from "@nevcos/shared/src/microFrontend/MFService";
import { MFFragment } from "@nevcos/shared/src/microFrontend/model/MFFragment";
import { MFEvent } from "@nevcos/shared/src/microFrontend/model/MFEvent";

const sampleDocumentsList = [] as Document[];

export default class DocumentsListModule extends HTMLElement implements MFFragment {
  connectedCallback(): void {
    ReactDOM.render(<DocumentsList documents={sampleDocumentsList} />, this);
  }
  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }
  onEvent?(event: MFEvent<unknown>): void {}
}

if (!isMFShellModeEnabled()) {
  const container = document.getElementById("root") as HTMLElement;
  mountMFModule(container, "test-documents-list", DocumentsListModule);
}
