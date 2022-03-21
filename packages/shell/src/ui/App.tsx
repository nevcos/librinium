import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CodeEditor } from "@nevcos/code-editor/src/ui/CodeEditor";
import { DocumentContent } from "@nevcos/shared/src/document/DocumentContent";
import { DocumentsList } from "@nevcos/list/src/ui/DocumentsList";
import { DocumentId } from "@nevcos/shared/src/document/DocumentId";
import PlantUmlPreview from "@nevcos/preview-plantuml/src/ui/PlantUmlPreview";
import { Spinner } from "./Spinner";
import * as storeSelectors from "../store/domain/documentStoreState/documentStoreStateSelectors";
import { documentStoreActions } from "../store/rtk/documentStore";
import { DocumentContentType } from "@nevcos/shared/src/document/DocumentContentType";
import { PreviewPresentation } from "../../../preview-presentation/src/ui/PreviewPresentation";

const AppGridDiv = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: fit-content(80%);
  grid-gap: 10px;
  grid-template-areas:
    "sidebar content"
    "sidebar preview";
`;

const SideBarDiv = styled.div`
  grid-area: sidebar;
  overflow: auto;

  background-color: #eee;
`;

const ContentDiv = styled.div`
  grid-area: content;
  overflow: auto;

  background-color: white;
`;

const PreviewDiv = styled.div`
  grid-area: preview;
  overflow: auto;

  background-color: white;
  border-top: 1px solid #ccc;
  padding-top: 10px;
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
    <AppGridDiv>
      <SideBarDiv>
        {isLoading ? (
          <Spinner />
        ) : (
          <DocumentsList
            selectedId={selectedDocument?.id}
            documents={documents}
            onSelectDocument={onSelectDocument}
            onCreateDocument={onCreateDocument}
            onDeleteDocument={onDeleteDocument}
          />
        )}
      </SideBarDiv>
      {selectedDocument ? (
        <>
          <ContentDiv>
            <CodeEditor key={selectedDocument?.id} code={selectedDocument?.code} onChange={onCodeChange} />
          </ContentDiv>
          <PreviewDiv>
            {selectedDocument?.type === DocumentContentType.REMARK ? (
              <PreviewPresentation key={selectedDocument?.id} code={selectedDocument?.code} />
            ) : (
              <PlantUmlPreview key={selectedDocument?.id} code={selectedDocument?.code} />
            )}
          </PreviewDiv>
        </>
      ) : (
        <div>Nothing to show 🤷‍♂️</div>
      )}
    </AppGridDiv>
  );
}
