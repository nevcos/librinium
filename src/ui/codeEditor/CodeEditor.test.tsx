import { screen } from "@testing-library/dom";

import { renderWithRoutingAndStore } from "../../test/reactTestUtils";

import type { DocumentContent } from "../../domain/document/DocumentContent";
import { CodeEditor } from "./CodeEditor";
import { createNewPlantUml, createEmptyGistState } from '../../domain/documentStoreState/documentStoreStateSelectors';
import { addDocument } from '../../domain/documentStoreState/documentStoreStateReducers';
import {createEmptyState} from "../../domain/storeState/storeStateSelectors";

describe("<CodeEditor />", () => {
  it("should display code editor with the expected code", async () => {
    const document = createNewPlantUml();
    document.code = "Test->Success" as DocumentContent;
    const state = createEmptyState()
    addDocument(state.gist, {payload: document});

    renderWithRoutingAndStore(<CodeEditor />, state, `/gists/${document.id}`);

    // FIXME: Not working
    // expect(await screen.findByText(document.code)).toBeDefined();
  });

  it("should change code in store when user changes code", async () => {
    // TODO
  });
});
