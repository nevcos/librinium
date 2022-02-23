import styled from "styled-components";
import { useDiagramStore } from "../store/diagramStore";
import { CodeEditor } from "./CodeEditor";
import { DiagramsList } from "./DiagramsList";
import { PlantUmlPreview } from "./PlantUmlPreview";
import { DiagramCode, DiagramId } from "../types";

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

  return (
    <AppGridDiv>
      <SideBarDiv>
        <DiagramsList
          selectedId={store.selectedDiagramId}
          diagrams={store.diagrams}
          onSelectedId={(id: DiagramId) => store.setSelectedDiagramId(id)}
          onCreateDiagram={() => store.createNewDiagram()}
          onDeleteDiagram={(id: DiagramId) => store.deleteDiagram(id)}
        />
      </SideBarDiv>
      <ContentDiv>
        <CodeEditor
          key={store.getSelectedDiagram()?.id}
          code={store.getSelectedDiagram()?.code}
          onChange={(code: DiagramCode) => store.setSelectedDiagramCode(code)}
        />
      </ContentDiv>
      <PreviewDiv>
        <PlantUmlPreview key={store.getSelectedDiagram()?.id} code={store.getSelectedDiagram()?.code} />
      </PreviewDiv>
    </AppGridDiv>
  );
}
