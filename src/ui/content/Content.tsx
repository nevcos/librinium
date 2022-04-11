import styled from "styled-components";

import type {Document} from "../../domain/document/Document";
import {DocumentContentType} from "../../domain/document/DocumentContentType";

import {useActiveGist} from "../shared/useActiveGist";
import {CodeEditor} from "../codeEditor/CodeEditor";
import {PreviewPlantUml} from "../previewPlantUml/PreviewPlantUml";
import {PreviewPresentation} from "../previewRemark/PreviewRemark";

const Styled_Container = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Styled_Editor = styled.section`
  height: 100%;
  width: 70%;
  overflow: auto;

  position: relative;
  z-index: 1;
`;

const Styled_Preview = styled.section`
  overflow: auto;

  position: absolute;
  top: 0;
  right: 0;
  width: 70%;
  height: 100%;
`;

export function Content(): JSX.Element {
  const {gist, gistId} = useActiveGist();

  return (
    <Styled_Container key={gistId}>
      <Styled_Editor>
        <CodeEditor />
      </Styled_Editor>
      <Styled_Preview>{renderPreview(gist)}</Styled_Preview>
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
