import CodeMirror from "codemirror";
import debounce from "lodash.debounce";
import styled from "styled-components";
import { useLayoutEffect, useRef } from "react";

import "codemirror/lib/codemirror.css";

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

export function CodeEditor({ code, onChange }) {
  let elementRef = useRef(null);
  let codeMirror = useRef(null);

  useLayoutEffect(() => {
    if (codeMirror.current) return;
    codeMirror.current = new CodeMirror(elementRef.current, {
      value: code || "",
      mode: "javascript"
    });
    codeMirror.current.on(
      "change",
      debounce(() => {
        onChange(codeMirror.current.getValue());
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
