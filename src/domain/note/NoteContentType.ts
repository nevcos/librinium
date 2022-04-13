export enum NoteContentType {
  PLANT_UML = "PLANT_UML",
  REMARK = "REMARK",
  MARKDOWN = "MARKDOWN"
}

export const noteContentTypeValues = [NoteContentType.MARKDOWN, NoteContentType.PLANT_UML, NoteContentType.REMARK];

export const labelNoteContentTypeMap = {
  [NoteContentType.MARKDOWN]: "Markdown",
  [NoteContentType.PLANT_UML]: "PlantUML",
  [NoteContentType.REMARK]: "Remark",
};
