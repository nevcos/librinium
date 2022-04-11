import {useParams} from "react-router-dom";

import {useGistSelector} from "../../hook/useGistSelector";
import {DocumentId} from "../../domain/document/DocumentId";
import {Document} from "../../domain/document/Document";
import {documentStoreSelectors} from "../../store/documentStore";

type Params = {
  gistId: DocumentId;
}

export function useActiveGist(): {gistId: DocumentId, gist: Document | null} {
  const gistId = useParams<Params>().gistId as DocumentId;
  const gist = useGistSelector<Document | null>(state => documentStoreSelectors.getDocument(state, gistId));
  return {gistId, gist};
}
