import {useCallback, useState} from "react";
import styled from "styled-components";

import type {Note} from "../../domain/note/Note";
import {NoteContentType} from "../../domain/note/NoteContentType";

import {useActiveNote} from "../shared/useActiveNote";
import {CodeEditor} from "../codeEditor/CodeEditor";
import {PreviewPlantUml} from "../previewPlantUml/PreviewPlantUml";
import {PreviewPresentation} from "../previewRemark/PreviewRemark";
import {useZoomable} from "./useZoomable";
import {useDraggable} from "./useDraggable";
import {PreviewMarkdown} from "../previewMarkdown/PreviewMarkdown";
import {uploadFile} from "../../remoteApi/imgur/imgurApi";
import {Toolbar} from "../toolbar/Toolbar";

const Styled_Container = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Styled_EditorContainer = styled.section`
  flex-grow: 1;
  overflow: auto;
  border-bottom: 1px solid var(--color-gray-light);

  z-index: 2;
  transition: opacity 200ms;

  &:not(.--active) {
    pointer-events: none;
    opacity: .5;
  }
`;

const Styled_ToolbarContainer = styled.menu`
  flex-shrink: 0;

  // reset UL
  list-style: none;
  padding: 0;
  margin: 0;

  // code-mirror gutter size which is ... variable
  padding-left: 30px;
  background-color: var(--color-gray-lightest);
`;

const Styled_PreviewContainer = styled.section`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;

  z-index: 1;
  cursor: move;
  transition: opacity 200ms;

  &:not(.--active) {
    pointer-events: none;
    opacity: .6;
  }
`;

const Styled_MouseCapture = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%;

  z-index: 3;
  cursor: move;

  &:not(.--active) {
    pointer-events: none;
  }
`;

const Styled_PreviewContent = styled.div`
  position: absolute;
  right: 0;
  width: 60%;
  height: 100%;
`;

export function Content(): JSX.Element {
  const {note, noteId} = useActiveNote();
  const [isPreviewActive, setPreviewActive] = useState(false);

  const {isDragging, initDraggable} = useDraggable();
  const {initZoomable} = useZoomable();

  const previewContainerRef = useCallback(node => {
    node && initDraggable(node);
    node && initZoomable(node);
  }, []);

  const onCaptureMouseOver = useCallback(() => setPreviewActive(true), []);
  const onCaptureMouseOut = useCallback(() => setPreviewActive(false), []);

  return (
    <Styled_Container key={noteId}>
      <Styled_EditorContainer className={isPreviewActive || isDragging ? "" : "--active"}>
        <CodeEditor />
      </Styled_EditorContainer>
      <Styled_ToolbarContainer>
        <Toolbar />
      </Styled_ToolbarContainer>
      <Styled_PreviewContainer ref={previewContainerRef}
                               className={isPreviewActive || isDragging ? "--active" : ""}
                               onMouseOut={onCaptureMouseOut}>
        <Styled_PreviewContent>
            {renderPreview(note)}
        </Styled_PreviewContent>
      </Styled_PreviewContainer>
      <Styled_MouseCapture className={isPreviewActive || isDragging ? "" : "--active"}
                           onMouseOver={onCaptureMouseOver} aria-hidden="true" />
    </Styled_Container>
  );
}

function renderPreview(note: Note | null): JSX.Element | null {
  if (!note) return null;
  switch (note.type) {
    case NoteContentType.PLANT_UML:
      return <PreviewPlantUml key={note.id} />;
    case NoteContentType.REMARK:
      return <PreviewPresentation key={note.id} />;
    case NoteContentType.MARKDOWN:
    default:
      return <PreviewMarkdown key={note.id} />;
  }
}
