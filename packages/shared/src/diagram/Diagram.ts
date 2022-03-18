import {DiagramId} from "./DiagramId";
import {DiagramName} from "./DiagramName";
import {DiagramCode} from "./DiagramCode";
import { DiagramType } from "./DiagramType";

export interface Diagram {
  id: DiagramId;
  name: DiagramName;
  code: DiagramCode;
  type: DiagramType;
}
