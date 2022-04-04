import { memo } from "react";
import CodeMirror from "codemirror";
import debounce from "lodash.debounce";
import styled from "styled-components";
import { useLayoutEffect, useRef } from "react";

import "codemirror/lib/codemirror.css";

import type { DocumentContent } from "../../domain/document/DocumentContent";
import { RenderingCounter } from "../shared/RenderingCounter";

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

interface Props {
  code: DocumentContent | undefined;
  onChange?: (code: DocumentContent) => void;
}

export const CodeEditor = memo(function ({ code, onChange }: Props): JSX.Element {
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
        onChange?.(codeMirror.current?.getValue() as DocumentContent);
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

  return (
    <>
      <RenderingCounter />
      <CodeEditorDiv ref={elementRef} />
    </>
  );
});
