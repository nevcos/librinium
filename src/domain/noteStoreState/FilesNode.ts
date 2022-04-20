import { Folder } from "../folder/Folder";
import { Note } from "../note/Note";

export interface FilesNode {
  value: Folder | Note;
  children: FilesNode[];
}

export function isNote(file: Folder | Note): file is Note {
  return "type" in file;
}

export function isFolder(file: Folder | Note): file is Folder {
  return !isNote(file);
}
