import type { DocumentId } from "../document/DocumentId";
import type { DocumentMap } from "../document/DocumentMap";
import { FolderMap } from "../folder/FolderMap";

export interface DocumentStoreState {
  isLoading: boolean;
  isUploadingImage: DocumentId | null;
  error: string | null;
  documents: DocumentMap;
  folders: FolderMap;
}
