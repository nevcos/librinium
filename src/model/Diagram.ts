import {DiagramCode, DiagramId, DiagramName} from "../types";

export interface Diagram {
    id: DiagramId;
    name: DiagramName;
    code: DiagramCode;
}
