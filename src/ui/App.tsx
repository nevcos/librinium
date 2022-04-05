import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import type { DocumentContent } from "../domain/document/DocumentContent";
import type { DocumentName } from "../domain/document/DocumentName";
import type { DocumentId } from "../domain/document/DocumentId";
import { DocumentContentType } from "../domain/document/DocumentContentType";

import { documentStoreActions, documentStoreSelectors } from '../store/documentStore';
import { CodeEditor } from "./editor/CodeEditor";
import { DocumentsList } from "./sidebar/DocumentsList";
import { PlantUmlPreview } from "./previewPlantUml/PlantUmlPreview";
import { PreviewPresentation } from "./previewRemark/PreviewPresentation";

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

export function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector(documentStoreSelectors.isLoading);
  const documents = useSelector(documentStoreSelectors.getDocuments);
  const selectedDocument = useSelector(documentStoreSelectors.getSelectedDocument);

  useEffect(() => {
    dispatch(documentStoreActions.fetchDocuments());
  }, []);

  const onSelectDocument = useCallback((id: DocumentId) => dispatch(documentStoreActions.selectDocument(id)), []);
  const onCreateDocument = useCallback(
    (type: DocumentContentType) => dispatch(documentStoreActions.createNewDocument(type)),
    []
  );
  const onDeleteDocument = useCallback((id: DocumentId) => dispatch(documentStoreActions.deleteDocument(id)), []);
  const onRenameDocument = useCallback(
    (id: DocumentId, name: DocumentName) => dispatch(documentStoreActions.updateDocumentName({id, name})),
    []
  );

  return (
    <Styled_Grid>
      <Styled_Sidebar>
        <DocumentsList
          isLoading={isLoading}
          selectedId={selectedDocument?.id}
          documents={documents}
          onSelectDocument={onSelectDocument}
          onCreateDocument={onCreateDocument}
          onDeleteDocument={onDeleteDocument}
          onRenameDocument={onRenameDocument}
        />
      </Styled_Sidebar>
      {selectedDocument ? (
        <>
          <Styled_Editor>
            <CodeEditor key={selectedDocument?.id} />
          </Styled_Editor>
          <Styled_Preview>
            {selectedDocument?.type === DocumentContentType.REMARK ? (
              <PreviewPresentation key={selectedDocument?.id} code={selectedDocument?.code} />
            ) : (
              <PlantUmlPreview key={selectedDocument?.id} code={selectedDocument?.code} />
            )}
          </Styled_Preview>
        </>
      ) : (
        <div>Nothing to show 🤷‍♂️</div>
      )}
    </Styled_Grid>
  );
}
