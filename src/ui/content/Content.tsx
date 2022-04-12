import {useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";

import type {Document} from "../../domain/document/Document";
import {DocumentContentType} from "../../domain/document/DocumentContentType";

import {useActiveGist} from "../shared/useActiveGist";
import {CodeEditor} from "../codeEditor/CodeEditor";
import {PreviewPlantUml} from "../previewPlantUml/PreviewPlantUml";
import {PreviewPresentation} from "../previewRemark/PreviewRemark";
import {useZoomable} from "./useZoomable";
import {useDraggable} from "./useDraggable";

const Styled_Container = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Styled_Editor = styled.section`
  height: 100%;
  width: 100%;
  overflow: auto;

  position: relative;
  z-index: 2;

  transition: opacity 200ms;

  &.--active {
  }

  &:not(.--active) {
    pointer-events: none;
    opacity: .5;
  }
`;

const Styled_Preview = styled.section`
  overflow: hidden;

  position: absolute;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
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
  width: 50%;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  cursor: move;

  &:not(.--active) {
    pointer-events: none;
  }
`;

const Styled_PreviewContent = styled.div`
  position: absolute;
  width: 60%;
  height: 100%;
  right: 0;
`;

export function Content(): JSX.Element {
  const {gist, gistId} = useActiveGist();
  const [isPreviewActive, setPreviewActive] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const previewContentRef = useRef<HTMLDivElement>(null);

  const [isDragging] = useDraggable(previewRef, previewContentRef);
  useZoomable(previewContentRef);

  const onCaptureMouseOver = useCallback(() => setPreviewActive(true), []);
  const onCaptureMouseOut = useCallback(() => setPreviewActive(false), []);

  return (
    <Styled_Container key={gistId}>
      <Styled_Editor className={isPreviewActive || isDragging ? "" : "--active"}>
        <CodeEditor />
      </Styled_Editor>
      <Styled_Preview ref={previewRef}
                      className={isPreviewActive || isDragging ? "--active" : ""}
                      onMouseOut={onCaptureMouseOut}>
        <Styled_PreviewContent ref={previewContentRef}>
            {renderPreview(gist)}
        </Styled_PreviewContent>
      </Styled_Preview>
      <Styled_MouseCapture className={isPreviewActive || isDragging ? "" : "--active"}
                           onMouseOver={onCaptureMouseOver} aria-hidden="true" />
    </Styled_Container>
  );
}

function renderPreview(gist: Document | null): JSX.Element | null {
  if (!gist) return null;
  switch (gist.type) {
    case DocumentContentType.PLANT_UML:
      return <PreviewPlantUml key={gist.id} />;
    case DocumentContentType.REMARK:
      return <PreviewPresentation key={gist.id} />;
    case DocumentContentType.MARKDOWN:
    default:
      return null;
  }
}
