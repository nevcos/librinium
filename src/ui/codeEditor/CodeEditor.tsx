import { useCallback } from 'react';
import CodeMirror from "codemirror";
import debounce from "lodash.debounce";
import styled from "styled-components";
import { useLayoutEffect, useRef } from "react";

import "codemirror/lib/codemirror.css";

import { documentStoreSelectors, documentStoreActions } from '../../store/documentStore';
import type { DocumentContent } from "../../domain/document/DocumentContent";
import { RenderingCounter } from "../shared/RenderingCounter";
import { useSelector, useDispatch } from 'react-redux';
import {DocumentStoreState} from "../../domain/documentStoreState/DocumentStoreState";
import {Document} from "../../domain/document/Document";
import {DocumentId} from "../../domain/document/DocumentId";
import {useActiveGist} from "../shared/useActiveGist";

const CHANGE_DEBOUNCE_MS = 600;

const CodeEditorDiv = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  // Override
  > .CodeMirror {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
`;

type Params = {
  gistId: DocumentId;
}

export function CodeEditor(): JSX.Element {
  const {gist, gistId} = useActiveGist();
  const dispatch = useDispatch();

  const code = gist?.code || "";

  const elementRef = useRef<HTMLDivElement | null>(null);
  const codeMirror = useRef<CodeMirror.Editor | null>(null);

  const onCodeChange = useCallback(
    (code: DocumentContent) => dispatch(documentStoreActions.updateDocumentContent({id: gistId, code})),
    []
  );

  useLayoutEffect(() => {
    if (codeMirror.current || !elementRef.current) return;

    codeMirror.current = CodeMirror(elementRef.current, {
      lineWrapping: true,
      lineNumbers: true,
      value: code || "",
      mode: "javascript"
    });
    codeMirror.current.on(
      "change",
      debounce(() => {
        onCodeChange(codeMirror.current?.getValue() as DocumentContent);
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
}
