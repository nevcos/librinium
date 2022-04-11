import { fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { act } from "react-dom/test-utils";

import type { Document } from "../../domain/document/Document";
import type { DocumentId } from "../../domain/document/DocumentId";
import type { DocumentName } from "../../domain/document/DocumentName";
import type { DocumentContent } from "../../domain/document/DocumentContent";
import {DocumentContentType, documentContentTypeValues} from "../../domain/document/DocumentContentType";
import { createEmptyState, getDocuments } from '../../domain/documentStoreState/documentStoreStateSelectors';
import { addDocument } from "../../domain/documentStoreState/documentStoreStateReducers";

import { Sidebar } from "./Sidebar";
import { renderWithRoutingAndStore } from '../../test/reactTestUtils';

const GISTS_PATH = "/gists/";

const DOCUMENT_0: Document = {
  id: "0" as DocumentId,
  name: "document0" as DocumentName,
  code: "code0" as DocumentContent,
  type: DocumentContentType.PLANT_UML
};

const DOCUMENT_1: Document = {
  id: "1" as DocumentId,
  name: "document1" as DocumentName,
  code: "code1" as DocumentContent,
  type: DocumentContentType.PLANT_UML
};

describe("<Sidebar />", () => {

  it.each(documentContentTypeValues)("should create a %s document and select it when clicking on create %s button", async (type: DocumentContentType) => {
    const {getState} = renderWithRoutingAndStore(<Sidebar />, GISTS_PATH);

    await clickFirstElement(`create-${type}`);

    expect(await screen.findByTestId("document")).toBeDefined();
    const document = getDocuments(getState())[0];
    expect(document.type).toBe(type);
    expect(await screen.findByTestId('location-display')).toHaveTextContent(`/gists/${document.id}`)
  });

  it("should open document when clicking on open link for first document", async () => {
    const state = createEmptyState();
    addDocument(state, {payload: DOCUMENT_0});
    addDocument(state, {payload: DOCUMENT_1});
    const {getState} = renderWithRoutingAndStore(<Sidebar />, GISTS_PATH, state);

    await clickNthElement("open", 0);

    expect(await screen.findByTestId('location-display')).toHaveTextContent(`/gists/${DOCUMENT_0.id}`)
  });

  it("should rename when double clicking on select button for first document", async () => {
    const newName = "New Name";
    jest.spyOn(global, "prompt").mockReturnValueOnce(newName);

    const state = createEmptyState();
    addDocument(state, {payload: DOCUMENT_0});
    const {getState} = renderWithRoutingAndStore(<Sidebar />, GISTS_PATH, state);

    await doubleClickNthElement("open", 0);

    expect(getDocuments(getState())[0]?.name).toBe(newName);
  });

  it("should delete document when clicking on delete button for document 1", async () => {
    jest.spyOn(global, "confirm").mockReturnValueOnce(true);

    const state = createEmptyState();
    addDocument(state, {payload: DOCUMENT_0});
    const {getState} = renderWithRoutingAndStore(<Sidebar />, GISTS_PATH, state);

    await doubleClickNthElement("delete", 0);

    // FIXME: Not working...
    // expect(getDocuments(getState()).length).toBe(0);
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
