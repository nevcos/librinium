import type { NoteId } from "../note/NoteId";
import type { NoteMap } from "../note/NoteMap";
import { FolderMap } from "../folder/FolderMap";

export interface NoteStoreState {
  isLoading: boolean;
  isUploadingImage: NoteId | null;
  error: string | null;
  notes: NoteMap;
  folders: FolderMap;
}
