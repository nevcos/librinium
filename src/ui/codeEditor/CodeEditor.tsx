import { useCallback, useLayoutEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import CodeMirror from "codemirror";
import { debounce } from "lodash";
import styled from "styled-components";

import "codemirror/mode/markdown/markdown";
import "../../contentType/plugins/plantUML/plantUMLCodeMirrorMode";
import "codemirror/lib/codemirror.css";

import type { NoteContent } from "../../domain/note/NoteContent";
import { noteStoreActions } from "../../store/noteStore";

import { RenderingCounter } from "../shared/RenderingCounter";
import { useActiveNote } from "../shared/useActiveNote";
import { registerCodeMirrorInstance } from "../../service/codeMirrorService";
import {getContentTypePluginByName} from "../../contentType/ContentTypeService";

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

export function CodeEditor(): JSX.Element {
  const { note, noteId } = useActiveNote();
  const dispatch = useDispatch();

  // TODO: Gists with empty content are deleted
  const code = note?.code || "";
  const type = note?.type;
  const folderId = note?.folderId;

  const elementRef = useRef<HTMLDivElement | null>(null);
  const codeMirror = useRef<CodeMirror.Editor | null>(null);

  const onCodeChange = useCallback(
    (code: NoteContent) => dispatch(noteStoreActions.updateNote({ patch: { id: noteId, code, folderId } })),
    []
  );

  useLayoutEffect(() => {
    if (codeMirror.current || !elementRef.current) return;

    codeMirror.current = CodeMirror(elementRef.current, {
      lineWrapping: true,
      lineNumbers: true,
      value: code || "",
      mode: getContentTypePluginByName(type)?.codeMirrorMode || "null"
    });
    codeMirror.current.on(
      "change",
      debounce(() => {
        onCodeChange(codeMirror.current?.getValue() as NoteContent);
      }, CHANGE_DEBOUNCE_MS)
    );
    registerCodeMirrorInstance(codeMirror.current);
  }, [type]);

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
