import { screen } from "@testing-library/dom";

import { renderWithDocumentStore } from "../../test/reactTestUtils";

import type { DocumentContent } from "../../domain/document/DocumentContent";
import { CodeEditor } from "./CodeEditor";
import { DocumentStoreState } from '../../domain/documentStoreState/DocumentStoreState';
import { createNewPlantUml, createEmptyState } from '../../domain/documentStoreState/documentStoreStateSelectors';
import { addDocument, selectDocument } from '../../domain/documentStoreState/documentStoreStateReducers';

export function createInitialState(documentContent: DocumentContent): DocumentStoreState {
  const document = createNewPlantUml();
  document.code = documentContent;

  const state = createEmptyState()
  addDocument(state, {payload: document});
  selectDocument(state, {payload: document.id})

  return state;
}

describe("<CodeEditor />", () => {
  test("should display code editor with the expected code", async () => {
    const code = "Test->Success" as DocumentContent;
    const state = createInitialState(code);

    renderWithDocumentStore(<CodeEditor />, state);

    const codeContainer = await screen.findByText(code);
    expect(codeContainer?.textContent).toBe(code);
  });

  test("should change code in store when user changes code", async () => {
    // TODO
  });
});
