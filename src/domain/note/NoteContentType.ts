export enum NoteContentType {
  PLANT_UML = "PLANT_UML",
  REMARK = "REMARK",
  MARKDOWN = "MARKDOWN"
}

export const noteContentTypeValues = [NoteContentType.MARKDOWN, NoteContentType.PLANT_UML, NoteContentType.REMARK];

export const noteContentTypesInfo = {
  [NoteContentType.MARKDOWN]: {label: "Markdown", docsUrl: "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"},
  [NoteContentType.PLANT_UML]: {label: "PlantUML", docsUrl: "https://plantuml.com/sitemap-language-specification"},
  [NoteContentType.REMARK]: {label: "Remark", docsUrl: "https://github.com/gnab/remark/wiki/Markdown"}
}
