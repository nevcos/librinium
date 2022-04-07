import { fireEvent, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import Mock = jest.Mock;

import type { DocumentId } from "../../domain/document/DocumentId";
import type { DocumentName } from "../../domain/document/DocumentName";
import type { DocumentContent } from "../../domain/document/DocumentContent";
import { DocumentContentType } from "../../domain/document/DocumentContentType";
import type { Document } from "../../domain/document/Document";

import { Sidebar } from "./Sidebar";
import { renderWithDocumentStore } from '../../test/reactTestUtils';
import { createEmptyState, getSelectedDocument, getDocuments } from '../../domain/documentStoreState/documentStoreStateSelectors';
import { addDocument } from "../../domain/documentStoreState/documentStoreStateReducers";

const document0: Document = {
  id: "0" as DocumentId,
  name: "document0" as DocumentName,
  code: "code0" as DocumentContent,
  type: DocumentContentType.PLANT_UML
};

const document1: Document = {
  id: "1" as DocumentId,
  name: "document1" as DocumentName,
  code: "code1" as DocumentContent,
  type: DocumentContentType.PLANT_UML
};

describe("<Sidebar />", () => {

  it("FIXME", async () => {
    expect(true).toBeDefined();
  });

//   it("should create a PlantUML document and select it when clicking on create PlantUml button", async () => {
//     const {getState} = renderWithDocumentStore(<Sidebar />);
//
//     await clickButton("create-plantuml");
//
//     expect(await screen.findByTestId("document")).toBeDefined();
//     expect(getSelectedDocument(getState())?.type).toBe(DocumentContentType.PLANT_UML);
//   });
//
//   it("should create a Remark document and select it when clicking on create Remark button", async () => {
//     const {getState} = renderWithDocumentStore(<Sidebar />);
//
//     await clickButton("create-remark");
//
//     expect(await screen.findByTestId("document")).toBeDefined();
//     expect(getSelectedDocument(getState())?.type).toBe(DocumentContentType.REMARK);
//   });
//
//   it("should select document when clicking on select button for first document", async () => {
//     const state = createEmptyState();
//     addDocument(state, {payload: document0});
//     addDocument(state, {payload: document1});
//     const {getState} = renderWithDocumentStore(<Sidebar />, state);
//
//     await clickNthButton("select", 0);
//
//     expect(getSelectedDocument(getState())?.id).toBe(document0.id);
//   });
//
//   it("should rename when double clicking on select button for first document", async () => {
//     const newName = "New Name";
//     jest.spyOn(global, "prompt").mockReturnValueOnce(newName);
//
//     const state = createEmptyState();
//     addDocument(state, {payload: document0});
//     const {getState} = renderWithDocumentStore(<Sidebar />, state);
//
//     await doubleClickNthButton("select", 0);
//
//     expect(getSelectedDocument(getState())?.name).toBe(newName);
//   });
//
//   it("should delete document when clicking on delete button for document 1", async () => {
//     jest.spyOn(global, "confirm").mockReturnValueOnce(true);
//
//     const state = createEmptyState();
//     addDocument(state, {payload: document0});
//     const {getState} = renderWithDocumentStore(<Sidebar />, state);
//
//     await clickNthButton("delete", 0);
//
//     expect(getDocuments(getState()).length).toBe(0);
//   });
});

async function clickButton(testId: string): Promise<void> {
  const btn = await screen.findByTestId<HTMLButtonElement>(testId);
  act(() => {
    fireEvent.click(btn);
  });
}

async function clickNthButton(testId: string, index: number): Promise<void> {
  const btns = await screen.findAllByTestId<HTMLButtonElement>(testId);
  act(() => {
    fireEvent.click(btns[index]);
  });
}

async function doubleClickNthButton(testId: string, index: number): Promise<void> {
  const btns = await screen.findAllByTestId<HTMLButtonElement>(testId);
  act(() => {
    fireEvent.doubleClick(btns[index]);
  });
}
