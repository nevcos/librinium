import { fireEvent, render, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { DocumentsList } from "./DocumentsList";
import Mock = jest.Mock;
import { DocumentId } from "@nevcos/shared/src/document/DocumentId";
import { DocumentName } from "@nevcos/shared/src/document/DocumentName";
import { DocumentContent } from "@nevcos/shared/src/document/DocumentContent";
import { DocumentContentType } from "@nevcos/shared/src/document/DocumentContentType";
import { Document } from "@nevcos/shared/src/document/Document";

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

const documents = [document0, document1];

describe("<DocumentsList />", () => {
  test("should call onCreateDocument with proper type when clicking on create PlantUml button", async () => {
    const props = {
      documents: [],
      onCreateDocument: jest.fn()
    };
    render(<DocumentsList {...props} />);

    await clickButton("create-plantuml");

    await waitForCallbackToBeCalledOnce(props.onCreateDocument);
    expect(props.onCreateDocument.mock.calls[0][0]).toBe(DocumentContentType.PLANT_UML);
  });

  test("should call onCreateDocument with proper type when clicking on create Remark button", async () => {
    const props = {
      documents: [],
      onCreateDocument: jest.fn()
    };
    render(<DocumentsList {...props} />);

    await clickButton("create-remark");

    await waitForCallbackToBeCalledOnce(props.onCreateDocument);
    expect(props.onCreateDocument.mock.calls[0][0]).toBe(DocumentContentType.REMARK);
  });

  test("should callback onSelectDocument when clicking on select button for document 0", async () => {
    const props = {
      documents,
      onSelectDocument: jest.fn((id) => id)
    };
    render(<DocumentsList {...props} />);

    const createBtns = await screen.findAllByTestId<HTMLButtonElement>("select");
    const documentIndex = 0;
    fireEvent.click(createBtns[documentIndex]);
    const triggeredDocumentId = documents[documentIndex].id;

    await waitForCallbackToBeCalledOnce(props.onSelectDocument);
    expect(props.onSelectDocument.mock.calls[0][0]).toBe(triggeredDocumentId);
  });

  test("should callback onRenameDocument when double clicking on select button for document 0", async () => {
    const props = {
      documents,
      onRenameDocument: jest.fn((id) => id)
    };
    render(<DocumentsList {...props} />);

    const index = 0;
    await doubleClickNthButton("select", index);
    const triggeredDocumentId = documents[index].id;

    await waitForCallbackToBeCalledOnce(props.onRenameDocument);
    expect(props.onRenameDocument.mock.calls[0][0]).toBe(triggeredDocumentId);
  });

  test("should callback onDeleteDocument when clicking on delete button for document 1", async () => {
    const props = {
      documents: [document0, document1],
      onDeleteDocument: jest.fn((id) => id)
    };
    render(<DocumentsList {...props} />);

    const index = 0;
    await clickNthButton("delete", index);
    const triggeredDocumentId = documents[index].id;

    await waitForCallbackToBeCalledOnce(props.onDeleteDocument);
    expect(props.onDeleteDocument.mock.calls[0][0]).toBe(triggeredDocumentId);
  });
});

async function clickButton(testId: string): Promise<void> {
  const btn = await screen.findByTestId<HTMLButtonElement>(testId);
  fireEvent.click(btn);
}

async function clickNthButton(testId: string, index: number): Promise<void> {
  const btns = await screen.findAllByTestId<HTMLButtonElement>(testId);
  fireEvent.click(btns[index]);
}

async function doubleClickNthButton(testId: string, index: number): Promise<void> {
  const btns = await screen.findAllByTestId<HTMLButtonElement>(testId);
  fireEvent.doubleClick(btns[index]);
}

function waitForCallbackToBeCalledOnce(callback: Mock): Promise<void> {
  return waitFor(() => expect(callback).toBeCalledTimes(1));
}
