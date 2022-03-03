import {useLayoutEffect, useRef} from "react";
import styled from "styled-components";
import {useDiagramStore} from "../store/diagramStore";
import {
  mountMFModule,
  enableMicroFrontendShellMode
} from "@nevcos/react-plantuml-ide-shared/src/microFrontend/MFService";

enableMicroFrontendShellMode();

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
  const store = useDiagramStore();

  const listContainer = useRef<HTMLDivElement | null>(null);
  const editorContainer = useRef<HTMLDivElement | null>(null);
  const previewContainer = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!listContainer.current || !editorContainer.current || !previewContainer.current) return;

    // @ts-ignore
    import("@nevcos/react-plantuml-ide-list/src/index.tsx").then(module => {
      mountMFModule(listContainer.current as HTMLElement, "mf-diagrams-list", module.default);
    });

    // @ts-ignore
    import("@nevcos/react-plantuml-ide-editor/src/index.tsx").then(module => {
      mountMFModule(editorContainer.current as HTMLElement, "mf-code-editor", module.default);
    });

    // @ts-ignore
    import("@nevcos/react-plantuml-ide-preview/src/index.tsx").then(module => {
      mountMFModule(previewContainer.current as HTMLElement, "mf-preview", module.default);
    });
  }, []);

  return (
    <AppGridDiv>
      <SideBarDiv ref={listContainer}>
        {/*<DiagramsList*/}
        {/*  selectedId={store.selectedDiagramId}*/}
        {/*  diagrams={store.diagrams}*/}
        {/*  onSelectDiagram={(id: DiagramId) => store.setSelectedDiagramId(id)}*/}
        {/*  onCreateDiagram={() => store.createNewDiagram()}*/}
        {/*  onDeleteDiagram={(id: DiagramId) => store.deleteDiagram(id)}*/}
        {/*/>*/}
      </SideBarDiv>
      <ContentDiv ref={editorContainer}>
        {/*<CodeEditor*/}
        {/*  key={store.getSelectedDiagram()?.id}*/}
        {/*  code={store.getSelectedDiagram()?.code}*/}
        {/*  onChange={(code: DiagramCode) => store.setSelectedDiagramCode(code)}*/}
        {/*/>*/}
      </ContentDiv>
      <PreviewDiv ref={previewContainer}>
        {/*<Suspense fallback={<div>Loading...</div>}>*/}
        {/*  /!*<LazyPlantUmlPreview key={store.getSelectedDiagram()?.id} code={store.getSelectedDiagram()?.code} />*!/*/}
        {/*</Suspense>*/}
      </PreviewDiv>
    </AppGridDiv>
  );
}
