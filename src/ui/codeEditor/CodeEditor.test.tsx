import { screen } from "@testing-library/dom";

import { renderWithRoutingAndStore } from "../../test/reactTestUtils";

import type { NoteContent } from "../../domain/note/NoteContent";
import { CodeEditor } from "./CodeEditor";
import { createEmptyNote } from "../../domain/noteStoreState/noteStoreStateSelectors";
import { addNotes } from "../../domain/noteStoreState/noteStoreStateReducers";
import { createEmptyState } from "../../domain/storeState/storeStateSelectors";
import {ContentTypeName} from "../../contentType/domain/ContentTypeName";

describe("<CodeEditor />", () => {
  it("should display code editor with the expected code", async () => {
    const note = createEmptyNote();
    note.code = "Testing note" as NoteContent;
    const state = createEmptyState();
    addNotes(state.note, { payload: { [note.id]: note } });

    renderWithRoutingAndStore(<CodeEditor />, state, `/note/${note.id}`);

    // FIXME: Not working
    // expect(await screen.findByText(document.code)).toBeDefined();
  });

  it("should change code in store when user changes code", async () => {
    // TODO
  });
});
