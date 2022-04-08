export enum DocumentContentType {
  PLANT_UML = "PLANT_UML",
  REMARK = "REMARK",
  MARKDOWN = "MARKDOWN"
}

export const documentContentTypeValues = [DocumentContentType.MARKDOWN, DocumentContentType.PLANT_UML, DocumentContentType.REMARK];

export const labelDocumentContentTypeMap = {
  [DocumentContentType.MARKDOWN]: "Markdown",
  [DocumentContentType.PLANT_UML]: "PlantUML",
  [DocumentContentType.REMARK]: "Remark",
};
