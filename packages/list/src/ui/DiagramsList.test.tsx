import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import {screen} from '@testing-library/dom'
import {DiagramsList} from "./DiagramsList";
import Mock = jest.Mock;
import {DiagramId} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramId";
import {DiagramName} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramName";
import {DiagramCode} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramCode";

const diagram0 = {
  id: "0" as DiagramId,
  name: "diagram0" as DiagramName,
  code: "code0" as DiagramCode
};

const diagram1 = {
  id: "1" as DiagramId,
  name: "diagram1" as DiagramName,
  code: "code1" as DiagramCode
};

const diagrams = [diagram0, diagram1];

describe("<DiagramsList />", () => {
  test("should call onCreateDiagram when clicking on create button", async () => {
    const props = {
      diagrams: [],
      onCreateDiagram: jest.fn(),
    };
    render(<DiagramsList {...props} />);

    const btn = await screen.findByTestId<HTMLButtonElement>("create");
    fireEvent.click(btn);

    await waitForCallbackToBeCalledOnce(props.onCreateDiagram);
  });

  test("should callback onSelectDiagram when clicking on select button for diagram 0", async () => {
    const props = {
      diagrams,
      onSelectDiagram: jest.fn(id => id),
    };
    render(<DiagramsList {...props} />);

    const createBtns = await screen.findAllByTestId<HTMLButtonElement>("select");
    const diagramIndex = 0;
    fireEvent.click(createBtns[diagramIndex]);
    const triggeredDiagramId = diagrams[diagramIndex].id;

    await waitForCallbackToBeCalledOnce(props.onSelectDiagram);
    expect(props.onSelectDiagram.mock.results[0].value).toBe(triggeredDiagramId);
  });

  test("should callback onRenameDiagram when double clicking on select button for diagram 0", async () => {
    const props = {
      diagrams,
      onRenameDiagram: jest.fn(id => id),
    };
    render(<DiagramsList {...props} />);

    const btns = await screen.findAllByTestId<HTMLButtonElement>("select");
    const diagramIndex = 0;
    fireEvent.doubleClick(btns[diagramIndex]);
    const triggeredDiagramId = diagrams[diagramIndex].id;

    await waitForCallbackToBeCalledOnce(props.onRenameDiagram);
    expect(props.onRenameDiagram.mock.results[0].value).toBe(triggeredDiagramId);
  });

  test("should callback onDeleteDiagram when clicking on delete button for diagram 1", async () => {
    const props = {
      diagrams: [diagram0, diagram1],
      onDeleteDiagram: jest.fn(id => id),
    };
    render(<DiagramsList {...props} />);

    const btns = await screen.findAllByTestId<HTMLButtonElement>("delete");
    const diagramIndex = 0;
    fireEvent.click(btns[diagramIndex]);
    const triggeredDiagramId = diagrams[diagramIndex].id;

    await waitForCallbackToBeCalledOnce(props.onDeleteDiagram);
    expect(props.onDeleteDiagram.mock.results[0].value).toBe(triggeredDiagramId);
  });
});

function waitForCallbackToBeCalledOnce(callback: Mock) {
  return waitFor(() => expect(callback).toBeCalledTimes(1));
}
