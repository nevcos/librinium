import { DiagramCode, DiagramId, DiagramName } from "@nevcos/react-plantuml-ide-shell/src/types";

export interface Diagram {
  id: DiagramId;
  name: DiagramName;
  code: DiagramCode;
}
