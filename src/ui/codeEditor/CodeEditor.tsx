import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import CodeMirror from "codemirror";
import { debounce } from "lodash";
import styled from "styled-components/macro";

import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown";
import "../../contentType/plugins/plantUML/plantUMLCodeMirrorMode";

import type { NoteContent } from "../../domain/note/NoteContent";
import { noteStoreActions } from "../../store/noteStore";

import { RenderingCounter } from "../shared/RenderingCounter";
import { useActiveNote } from "../shared/useActiveNote";
import { registerCodeMirrorInstance, unregisterCodeMirrorInstance } from "../../service/codeMirrorService";
import { getContentTypePluginByName } from "../../contentType/ContentTypeService";
import { NoteId } from "../../domain/note/NoteId";

const CHANGE_DEBOUNCE_MS = 1400;

const Styled_CodeEditor = styled.div`
  width: 100%;
  height: 100%;

  // Override
  > .CodeMirror {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
`;

export function CodeEditor(props: { [key: string]: unknown }): JSX.Element {
  const { note, noteId } = useActiveNote();
  const dispatch = useDispatch();

  const type = note?.type;
  const folderId = note?.folderId;

  const elementRef = useRef<HTMLDivElement | null>(null);
  const codeMirror = useRef<CodeMirror.Editor | null>(null);

  const getEditorCode = () => (codeMirror.current?.getValue() || "") as NoteContent;

  // Create + manage CodeMirror instance
  useLayoutEffect(() => {
    if (codeMirror.current || !elementRef.current) return;

    codeMirror.current = CodeMirror(elementRef.current, {
      lineWrapping: true,
      lineNumbers: true,
      value: note?.code || "",
      mode: getContentTypePluginByName(type)?.codeMirrorMode || "null"
    });

    const debouncedOnEditorCodeChanged = debounce((noteId: NoteId, content: NoteContent) => {
      console.debug("CodeEditor.debouncedOnEditorCodeChanged", { noteId, content });
      dispatch(noteStoreActions.updateNote({ patch: { id: noteId, code: content, folderId } }));
    }, CHANGE_DEBOUNCE_MS);

    const onChangeCallback = () => {
      if (!codeMirror.current) return;
      // Need to send current state, otherwise it'll use the wrong state (when a new noteId is selected)
      debouncedOnEditorCodeChanged(noteId, getEditorCode());
    };

    codeMirror.current.on("change", onChangeCallback);
    registerCodeMirrorInstance(codeMirror.current);

    return () => {
      if (!codeMirror.current) return;

      unregisterCodeMirrorInstance(codeMirror.current);
      codeMirror.current.off("change", onChangeCallback);
      codeMirror.current = null;

      if (elementRef.current) {
        // If contents are not explicitly destroyed, they will be reused when re-initializing CodeMirror
        elementRef.current.innerHTML = "";
      }
    };
  }, [noteId]);

  // Update CodeMirror with updated code from store
  useEffect(() => {
    if (codeMirror.current && note?.code) {
      if (note?.code !== getEditorCode()) {
        codeMirror.current.setValue(note?.code);
      }
    }
  }, [note?.code]);

  return (
    <>
      <RenderingCounter />
      <Styled_CodeEditor ref={elementRef} {...props} />
    </>
  );
}
