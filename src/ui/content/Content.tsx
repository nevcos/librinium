import { useSelector } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import type { Document } from "../../domain/document/Document";
import type { DocumentId } from '../../domain/document/DocumentId';
import { DocumentContentType } from "../../domain/document/DocumentContentType";

import { CodeEditor } from "../codeEditor/CodeEditor";
import { documentStoreSelectors } from "../../store/documentStore";
import { PreviewPlantUml } from "../previewPlantUml/PreviewPlantUml";
import { PreviewPresentation } from "../previewRemark/PreviewRemark";
import { DocumentStoreState } from '../../domain/documentStoreState/DocumentStoreState';

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

type Params = {
  gistId: DocumentId;
}

export function Content(): JSX.Element {
  const {gistId} = useParams<Params>();
  const gist = useSelector<DocumentStoreState, Document | null>(state => documentStoreSelectors.getDocument(state, gistId));

  return (
    <Styled_Container>
      <Styled_Editor>
        <CodeEditor key={gistId} />
      </Styled_Editor>
      <Styled_Preview>{renderPreview(gist)}</Styled_Preview>
    </Styled_Container>
  );
}

function renderPreview(document: Document | null): JSX.Element | null {
  if (!document) return null;
  switch (document.type) {
    case DocumentContentType.PLANT_UML:
      return <PreviewPlantUml key={document.id} />;
    case DocumentContentType.REMARK:
      return <PreviewPresentation key={document.id} />;
    case DocumentContentType.MARKDOWN:
    default:
      return null;
  }
}
