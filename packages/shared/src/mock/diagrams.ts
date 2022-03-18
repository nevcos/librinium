import { DiagramCode } from "../diagram/DiagramCode";
import { DiagramId } from "../diagram/DiagramId";
import { DiagramName } from "../diagram/DiagramName";
import { DiagramType } from "../diagram/DiagramType";

export const diagramMock0 = {
  id: "0" as DiagramId,
  name: "diagram0" as DiagramName,
  code: "code0 -> code0" as DiagramCode,
  type: DiagramType.PLANT_UML
};

export const diagramMock1 = {
  id: "1" as DiagramId,
  name: "diagram1" as DiagramName,
  code: "code1 -> code1" as DiagramCode,
  type: DiagramType.PLANT_UML
};

export const diagramMock2 = {
  id: "2" as DiagramId,
  name: "diagram2" as DiagramName,
  code: "code2 -> code2" as DiagramCode,
  type: DiagramType.REMARK
};

export const diagramsListMock = [diagramMock0, diagramMock1];

export const diagramsMapMock = {
  [diagramMock0.id]: diagramMock0,
  [diagramMock1.id]: diagramMock1,
  [diagramMock2.id]: diagramMock2
};
