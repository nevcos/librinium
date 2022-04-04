import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { CodeEditor } from "@nevcos/code-editor/src/ui/CodeEditor";
import { DocumentContent } from "@nevcos/shared/src/document/DocumentContent";
import { DocumentsList } from "@nevcos/list/src/ui/DocumentsList";
import { DocumentId } from "@nevcos/shared/src/document/DocumentId";
import { PlantUmlPreview } from "@nevcos/preview-plantuml/src/ui/PlantUmlPreview";
import { PreviewPresentation } from "@nevcos/preview-presentation/src/ui/PreviewPresentation";
import { DocumentContentType } from "@nevcos/shared/src/document/DocumentContentType";

import { documentStoreActions } from "../store/rtk/documentStore";
import * as storeSelectors from "../store/domain/documentStoreState/documentStoreStateSelectors";

const Styled_Grid = styled.div`
  background-color: white;
  height: 100%;
  display: grid;
  grid-template-areas:
    "sidebar content"
    "sidebar preview";
  grid-template-columns: fit-content(100%) auto;
  grid-template-rows: fit-content(80%);
  grid-gap: .6rem;
`;

const Styled_Sidebar = styled.aside`
  grid-area: sidebar;
  overflow: auto;
  display: grid;
  
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
  padding-top: .6rem;
`;

export function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector(storeSelectors.isLoading);
  const documents = useSelector(storeSelectors.getDocuments);
  const selectedDocument = useSelector(storeSelectors.getSelectedDocument);

  useEffect(() => {
    dispatch(documentStoreActions.fetchDocuments());
  }, []);

  const onSelectDocument = useCallback((id: DocumentId) => dispatch(documentStoreActions.selectDocument(id)), []);
  const onCreateDocument = useCallback(
    (type: DocumentContentType) => dispatch(documentStoreActions.createNewDocument(type)),
    []
  );
  const onDeleteDocument = useCallback((id: DocumentId) => dispatch(documentStoreActions.deleteDocument(id)), []);
  const onCodeChange = useCallback(
    (code: DocumentContent) => dispatch(documentStoreActions.updateSelectedDocumentContent(code)),
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
        />
      </Styled_Sidebar>
      {selectedDocument ? (
        <>
          <Styled_Editor>
            <CodeEditor key={selectedDocument?.id} code={selectedDocument?.code} onChange={onCodeChange} />
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
