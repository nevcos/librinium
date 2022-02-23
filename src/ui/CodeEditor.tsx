import CodeMirror from "codemirror";
import debounce from "lodash.debounce";
import styled from "styled-components";
import {useLayoutEffect, useRef} from "react";

import "codemirror/lib/codemirror.css";
import {DiagramCode} from "../types";

const CHANGE_DEBOUNCE_MS = 600;

const CodeEditorDiv = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  > .CodeMirror {
    width: 100%;
    height: 100%;
  }
`;

interface CodeEditorProps {
  code: DiagramCode,
  onChange?: (code: DiagramCode) => void
}

export function CodeEditor({ code, onChange }: CodeEditorProps): JSX.Element {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const codeMirror = useRef<CodeMirror.Editor | null>(null);

  useLayoutEffect(() => {
    if (codeMirror.current || !elementRef.current) return;

    codeMirror.current = CodeMirror(elementRef.current, {
      value: code || "",
      mode: "javascript"
    });
    codeMirror.current.on(
      "change",
      debounce(() => {
        onChange?.(codeMirror.current?.getValue() as DiagramCode);
      }, CHANGE_DEBOUNCE_MS)
    );
  }, []);

  useLayoutEffect(() => {
    if (codeMirror.current) {
      if (code !== codeMirror.current.getValue()) {
        codeMirror.current.setValue(code || "");
      }
    }
  }, [code]);

  return <CodeEditorDiv ref={elementRef} />;
}
