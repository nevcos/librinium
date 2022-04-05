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
import { PreviewPlantUml } from "./previewPlantUml/PreviewPlantUml";
import { PreviewPresentation } from "./previewRemark/PreviewRemark";
import { isLoading } from '../domain/documentStoreState/documentStoreStateSelectors';

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

const Styled_EmptyState = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  text-align: center;
  color: #ccc;
`;

export function App(): JSX.Element {
  const dispatch = useDispatch();

  const isLoading = useSelector(documentStoreSelectors.isLoading);
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
      ) : 
      (
        <Styled_EmptyState>
          {isLoading ? (
            <>
              <span className="fa-solid fa-spinner" />
              waiting ...
            </>
          ) : (
            <>
              <span className="fa-solid fa-arrow-left-long" />
              select or create a document
            </>
          )}
        </Styled_EmptyState>
      )}
    </Styled_Grid>
  );
}

function renderPreview(document: Document | null): JSX.Element | null {
  if (!document) return null;
  switch(document.type) {
    case DocumentContentType.PLANT_UML:
      return <PreviewPlantUml key={document.id} />;
    case DocumentContentType.REMARK:
      return <PreviewPresentation key={document.id} />
    case DocumentContentType.MARKDOWN:
    default:
      return null;
  }
}
