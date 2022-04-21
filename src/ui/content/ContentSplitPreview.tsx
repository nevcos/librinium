import styled from "styled-components";

import { CodeEditor } from "../codeEditor/CodeEditor";
import { Toolbar } from "../toolbar/Toolbar";
import { Preview } from "./Preview";

const Styled_Container = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;

  display: flex;
  flex-direction: row;
`;

const Styled_EditorContainer = styled.section`
  flex-grow: 1;
  width: 50%;
  overflow: auto;
`;

const Styled_PreviewContainer = styled.section`
  flex-grow: 1;
  width: 50%;
  resize: horizontal;
  position: relative;
  overflow: scroll;
  padding: var(--padding);
  border-inline-start: var(--border-light);
`;

export function ContentSplitPreview(): JSX.Element {
  return (
    <Styled_Container>
      <Styled_EditorContainer>
        <CodeEditor />
      </Styled_EditorContainer>
      <Toolbar />
      <Styled_PreviewContainer>
        <Preview />
      </Styled_PreviewContainer>
    </Styled_Container>
  );
}
