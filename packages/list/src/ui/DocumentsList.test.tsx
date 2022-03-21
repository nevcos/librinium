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
  test("should call onCreateDocument when clicking on create button", async () => {
    const props = {
      documents: [],
      onCreateDocument: jest.fn()
    };
    render(<DocumentsList {...props} />);

    const btn = await screen.findByTestId<HTMLButtonElement>("create");
    fireEvent.click(btn);

    await waitForCallbackToBeCalledOnce(props.onCreateDocument);
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
    expect(props.onSelectDocument.mock.results[0].value).toBe(triggeredDocumentId);
  });

  test("should callback onRenameDocument when double clicking on select button for document 0", async () => {
    const props = {
      documents,
      onRenameDocument: jest.fn((id) => id)
    };
    render(<DocumentsList {...props} />);

    const btns = await screen.findAllByTestId<HTMLButtonElement>("select");
    const index = 0;
    fireEvent.doubleClick(btns[index]);
    const triggeredDocumentId = documents[index].id;

    await waitForCallbackToBeCalledOnce(props.onRenameDocument);
    expect(props.onRenameDocument.mock.results[0].value).toBe(triggeredDocumentId);
  });

  test("should callback onDeleteDocument when clicking on delete button for document 1", async () => {
    const props = {
      documents: [document0, document1],
      onDeleteDocument: jest.fn((id) => id)
    };
    render(<DocumentsList {...props} />);

    const btns = await screen.findAllByTestId<HTMLButtonElement>("delete");
    const index = 0;
    fireEvent.click(btns[index]);
    const triggeredDocumentId = documents[index].id;

    await waitForCallbackToBeCalledOnce(props.onDeleteDocument);
    expect(props.onDeleteDocument.mock.results[0].value).toBe(triggeredDocumentId);
  });
});

function waitForCallbackToBeCalledOnce(callback: Mock) {
  return waitFor(() => expect(callback).toBeCalledTimes(1));
}
