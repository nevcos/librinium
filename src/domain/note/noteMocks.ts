import type { NoteContent } from "./NoteContent";
import type { NoteId } from "./NoteId";
import type { NoteName } from "./NoteName";
import {PlantUMLContentTypeName} from "../../contentType/plugins/plantUML";
import {RemarkContentTypeName} from "../../contentType/plugins/remarkJS";

export const noteMock0 = {
  id: "0" as NoteId,
  name: "note0" as NoteName,
  code: "code0 -> code0" as NoteContent,
  type: PlantUMLContentTypeName
};

export const noteMock1 = {
  id: "1" as NoteId,
  name: "note1" as NoteName,
  code: "code1 -> code1" as NoteContent,
  type: PlantUMLContentTypeName
};

export const noteMock2 = {
  id: "2" as NoteId,
  name: "note2" as NoteName,
  code: "code2 -> code2" as NoteContent,
  type: RemarkContentTypeName
};

export const notesListMock = [noteMock0, noteMock1];

export const notesMapMock = {
  [noteMock0.id]: noteMock0,
  [noteMock1.id]: noteMock1,
  [noteMock2.id]: noteMock2
};
