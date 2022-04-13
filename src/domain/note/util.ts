import { NoteContentType } from "./NoteContentType";

export function getFileTypeFromExtension(filename: string): NoteContentType {
  const DEFAULT_TYPE = NoteContentType.MARKDOWN;

  const splitFilename = filename.split(".");
  const extension = splitFilename[splitFilename.length - 1];

  switch (extension) {
    case "md":
    case "markdown":
      return NoteContentType.MARKDOWN;
    case "pu":
    case "plantuml":
      return NoteContentType.PLANT_UML;
    default:
      console.error(`getFileTypeFromExtension() - no match, defaulting to ${DEFAULT_TYPE}`);
      return DEFAULT_TYPE;
  }
}
