import { DocumentContentType } from "./DocumentContentType";

export function getFileTypeFromExtension(filename: string): DocumentContentType {
  const DEFAULT_TYPE = DocumentContentType.MARKDOWN;

  const splitFilename = filename.split(".");
  const extension = splitFilename[splitFilename.length - 1];

  switch (extension) {
    case "md":
    case "markdown":
      return DocumentContentType.MARKDOWN;
    case "pu":
    case "plantuml":
      return DocumentContentType.PLANT_UML;
    default:
      console.error(`getFileTypeFromExtension() - no match, defaulting to ${DEFAULT_TYPE}`);
      return DEFAULT_TYPE;
  }
}
