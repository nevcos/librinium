import type { DocumentId } from "../document/DocumentId";
import type { DocumentMap } from "../document/DocumentMap";
import {ImageDescriptor} from "../image/Image";

export interface DocumentStoreState {
  isLoading: boolean;
  isUploadingImage: DocumentId | null;
  error: string | null;
  documents: DocumentMap;
}
