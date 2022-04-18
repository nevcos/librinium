import { fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { act } from "react-dom/test-utils";

import type { Note } from "../../domain/note/Note";
import type { NoteId } from "../../domain/note/NoteId";
import type { NoteName } from "../../domain/note/NoteName";
import type { NoteContent } from "../../domain/note/NoteContent";
import { getNotes } from "../../domain/noteStoreState/noteStoreStateSelectors";
import { addNotes } from "../../domain/noteStoreState/noteStoreStateReducers";
import { createEmptyState } from "../../domain/storeState/storeStateSelectors";
import { ContentTypeName } from "../../contentType/domain/ContentTypeName";
import { renderWithRoutingAndStore } from "../../test/reactTestUtils";

import { Sidebar } from "./Sidebar";

const DOCUMENT_0: Note = {
  id: "0" as NoteId,
  name: "note0" as NoteName,
  code: "code0" as NoteContent,
  type: "PlantUML" as ContentTypeName
};

const DOCUMENT_1: Note = {
  id: "1" as NoteId,
  name: "note1" as NoteName,
  code: "code1" as NoteContent,
  type: "PlantUML" as ContentTypeName
};

describe("<Sidebar />", () => {
  // it.each(noteContentTypeValues)("should create a %s note and select it when clicking on create %s button", async (type: NoteContentType) => {
  //   const {getState} = renderWithRoutingAndStore(<Sidebar />);

  //   await clickFirstElement(`create-${type}`);

  //   expect(await screen.findByTestId("note")).toBeDefined();
  //   const note = getNotes(getState().note)[0];
  //   expect(note.type).toBe(type);
  //   expect(await screen.findByTestId('location-display')).toHaveTextContent(`/note/${note.id}`)
  // });

  it("should open note when clicking on open link for first note", async () => {
    const state = createEmptyState();
    addNotes(state.note, { payload: { [DOCUMENT_0.id]: DOCUMENT_0 } });
    addNotes(state.note, { payload: { [DOCUMENT_1.id]: DOCUMENT_1 } });
    renderWithRoutingAndStore(<Sidebar />, state);

    await clickNthElement("open", 0);

    expect(await screen.findByTestId("location-display")).toHaveTextContent(`/note/${DOCUMENT_0.id}`);
  });

  it("should rename when double clicking on select button for first note", async () => {
    const newName = "New Name";
    jest.spyOn(global, "prompt").mockReturnValueOnce(newName);

    const state = createEmptyState();
    addNotes(state.note, { payload: { [DOCUMENT_0.id]: DOCUMENT_0 } });
    const { getState } = renderWithRoutingAndStore(<Sidebar />, state);

    await doubleClickNthElement("open", 0);

    expect(getNotes(getState().note)[0]?.name).toBe(newName);
  });

  it("should delete note when clicking on delete button for note 1", async () => {
    jest.spyOn(global, "confirm").mockReturnValueOnce(true);

    const state = createEmptyState();
    addNotes(state.note, { payload: { [DOCUMENT_0.id]: DOCUMENT_0 } });
    const { getState } = renderWithRoutingAndStore(<Sidebar />, state);

    await doubleClickNthElement("delete", 0);

    // FIXME: Not working...
    // expect(getNotes(getState().length).toBe(0);
  });
});

async function clickFirstElement(testId: string): Promise<void> {
  await clickNthElement(testId, 0);
}

async function clickNthElement(testId: string, index: number): Promise<void> {
  const elements = await screen.findAllByTestId<HTMLElement>(testId);
  act(() => {
    fireEvent.click(elements[index]);
  });
}

async function doubleClickNthElement(testId: string, index: number): Promise<void> {
  const elements = await screen.findAllByTestId<HTMLElement>(testId);
  act(() => {
    fireEvent.doubleClick(elements[index]);
  });
}
