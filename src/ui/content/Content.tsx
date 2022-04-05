import { useSelector } from "react-redux";
import styled from "styled-components";

import type { Document } from "../../domain/document/Document";
import { DocumentContentType } from "../../domain/document/DocumentContentType";

import { CodeEditor } from "../codeEditor/CodeEditor";
import { documentStoreSelectors } from "../../store/documentStore";
import { PreviewPlantUml } from "../previewPlantUml/PreviewPlantUml";
import { PreviewPresentation } from "../previewRemark/PreviewRemark";
import { EmptyState } from "./EmptyState";

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

  /* background-color: yellow; */
  border-top: 1px solid #ccc;
  padding-top: 0.6rem;

  position: absolute;
  top: 0;
  right: 0;
  width: 70%;
  height: 100%;
`;

const Styled_EmptyState = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  text-align: center;
  color: #ccc;
`;

export function Content(): JSX.Element {
  const selectedDocument = useSelector(documentStoreSelectors.getSelectedDocument);

  return (
    <Styled_Container>
      {selectedDocument ? (
        <>
          <Styled_Editor>
            <CodeEditor key={selectedDocument?.id} />
          </Styled_Editor>
          <Styled_Preview>{renderPreview(selectedDocument)}</Styled_Preview>
        </>
      ) : (
        <Styled_EmptyState>
          <EmptyState />
        </Styled_EmptyState>
      )}
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
