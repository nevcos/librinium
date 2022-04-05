import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import type { Document } from "../domain/document/Document";
import type { DocumentName } from "../domain/document/DocumentName";
import type { DocumentId } from "../domain/document/DocumentId";
import { DocumentContentType } from "../domain/document/DocumentContentType";

import { documentStoreActions, documentStoreSelectors } from '../store/documentStore';
import { CodeEditor } from "./codeEditor/CodeEditor";
import { Sidebar } from "./sidebar/Sidebar";
import { PlantUmlPreview } from "./previewPlantUml/PreviewPlantUml";
import { PreviewPresentation } from "./previewRemark/PreviewRemark";

const Styled_Grid = styled.div`
  background-color: white;
  height: 100%;
  display: grid;
  grid-template-areas:
    "sidebar content"
    "sidebar preview";
  grid-template-columns: fit-content(100%) auto;
  grid-template-rows: fit-content(80%);
  grid-gap: 0.6rem;
`;

const Styled_Sidebar = styled.aside`
  grid-area: sidebar;
  height: 100%;
  
  overflow: hidden;
  width: 250px;
  min-width: 200px;
  max-width: 500px;
  resize: horizontal;
`;

const Styled_Editor = styled.section`
  grid-area: content;
  overflow: auto;

  background-color: white;
`;

const Styled_Preview = styled.section`
  grid-area: preview;
  overflow: auto;

  background-color: white;
  border-top: 1px solid #ccc;
  padding-top: 0.6rem;
`;

export function App(): JSX.Element {
  const dispatch = useDispatch();

  const selectedDocument = useSelector(documentStoreSelectors.getSelectedDocument);

  useEffect(() => {
    dispatch(documentStoreActions.fetchDocuments());
  }, []);

  return (
    <Styled_Grid>
      <Styled_Sidebar>
        <Sidebar />
      </Styled_Sidebar>
      {selectedDocument ? (
        <>
          <Styled_Editor>
            <CodeEditor key={selectedDocument?.id} />
          </Styled_Editor>
          <Styled_Preview>
            {renderPreview(selectedDocument)}
          </Styled_Preview>
        </>
      ) : (
        <div>Nothing to show 🤷‍♂️</div>
      )}
    </Styled_Grid>
  );
}

function renderPreview(document: Document): JSX.Element | null {
  if (!document) return null;
  switch(document.type) {
    case DocumentContentType.PLANT_UML:
      return <PlantUmlPreview key={document.id} code={document.code} />;
    case DocumentContentType.REMARK:
      return <PreviewPresentation key={document.id} code={document.code} />
    case DocumentContentType.MARKDOWN:
    default:
      return null;
  }
}
