import {DiagramCode} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramCode";
import {render, waitFor} from "@testing-library/react";
import {screen} from '@testing-library/dom'
import React from "react";
import {CodeEditor} from "./CodeEditor";

describe("<CodeEditor />", () => {
  test("should display code editor with the expected code", async () => {
    const code = "Test->Success" as DiagramCode;

    render(<CodeEditor code={code} />);

    const codeContainer = await screen.findByText(code);
    expect(codeContainer?.textContent).toBe(code);
  });

  test("should trigger onChange callback when user changes code", async () => {
    // TODO
  });

});
