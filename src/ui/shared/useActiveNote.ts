import {useParams} from "react-router-dom";

import {useGistSelector} from "../../hook/useGistSelector";
import {NoteId} from "../../domain/note/NoteId";
import {Note} from "../../domain/note/Note";
import {noteStoreSelectors} from "../../store/noteStore";

type Params = {
  noteId: NoteId;
}

export function useActiveNote(): {noteId: NoteId, note: Note | null} {
  const noteId = useParams<Params>().noteId as NoteId;
  const note = useGistSelector<Note | null>(state => noteStoreSelectors.getNote(state, noteId));
  return {noteId, note};
}
