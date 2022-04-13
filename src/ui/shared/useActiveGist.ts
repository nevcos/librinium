import {useParams} from "react-router-dom";

import {useGistSelector} from "../../hook/useGistSelector";
import {NoteId} from "../../domain/note/NoteId";
import {Note} from "../../domain/note/Note";
import {noteStoreSelectors} from "../../store/noteStore";

type Params = {
  gistId: NoteId;
}

export function useActiveGist(): {gistId: NoteId, gist: Note | null} {
  const gistId = useParams<Params>().gistId as NoteId;
  const gist = useGistSelector<Note | null>(state => noteStoreSelectors.getNote(state, gistId));
  return {gistId, gist};
}
