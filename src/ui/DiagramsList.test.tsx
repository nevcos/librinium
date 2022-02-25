import React from "react";
import {findByTestId, fireEvent, render, waitFor} from "@testing-library/react";
import {screen} from '@testing-library/dom'
import {DiagramsList} from "./DiagramsList";
import {DiagramCode, DiagramId, DiagramName} from "../types";

const diagram0 = {
  id: 0 as DiagramId,
  name: "diagram0" as DiagramName,
  code: "code0" as DiagramCode
};

const diagram1 = {
  id: 1 as DiagramId,
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

    await waitFor(() => expect(props.onCreateDiagram).toBeCalledTimes(1));
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

    await waitFor(() => expect(props.onSelectDiagram).toBeCalledTimes(1));
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

    await waitFor(() => expect(props.onRenameDiagram).toBeCalledTimes(1));
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

    await waitFor(() => expect(props.onDeleteDiagram).toBeCalledTimes(1));
    expect(props.onDeleteDiagram.mock.results[0].value).toBe(triggeredDiagramId);
  });
});
