import {DiagramId} from "./DiagramId";
import {DiagramName} from "./DiagramName";
import {DiagramCode} from "./DiagramCode";

export interface Diagram {
  id: DiagramId;
  name: DiagramName;
  code: DiagramCode;
}
