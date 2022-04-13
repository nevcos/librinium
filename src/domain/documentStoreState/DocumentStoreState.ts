import type { DocumentMap } from "../document/DocumentMap";
import { FolderMap } from "../folder/FolderMap";

export interface DocumentStoreState {
  isLoading: boolean;
  error: string | null;
  documents: DocumentMap;
  folders: FolderMap;
}
