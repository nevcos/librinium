import { memo, MouseEvent, useCallback } from "react";
import { useDispatch } from "react-redux";

import type { Note } from "../../domain/note/Note";
import { NoteName } from "../../domain/note/NoteName";
import { noteStoreActions } from "../../store/noteStore";

import { useNavigation } from "../shared/useNavigation";
import { NoteIcon } from "./NoteIcon";
import * as Styled from "./Sidebar.style";

type Props = {
  note: Note;
};

export const SidebarNavItemLink = memo(function ({ note }: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const to = `/note/${note.id}`;
  const isActive = navigation.isActive(to);

  const onDoubleClickRename = useCallback(() => {
    const newName = window.prompt("Rename", note.name);
    if (newName) {
      const id = note.id;
      const name = newName as NoteName;
      dispatch(noteStoreActions.updateNoteName({ id, name }));
    }
  }, [note]);

  const onClickDeleteNote = useCallback(
    (event: MouseEvent) => {
      const isConfirmationBypassed = event.ctrlKey && event.shiftKey;
      const isConfirmed = isConfirmationBypassed || window.confirm(`Delete file ${note.name}?`);
      if (isConfirmed) {
        const folderId = note.folderId; // root file will have this as undefined
        const fileId = note.id;
        dispatch(noteStoreActions.deleteNote({ navigation, id: fileId, folderId }));
      }
    },
    [note]
  );

  return (
    <Styled.OptionLi key={note.id} className={isActive ? "--active" : ""} data-testid="note">
      <Styled.NavLink to={to} onDoubleClick={onDoubleClickRename} data-testid="open">
        <NoteIcon type={note.type} />
        <span className="label">{note.name}</span>
      </Styled.NavLink>
      <Styled.DeleteFileButton onClick={onClickDeleteNote} data-testid="delete" title="Delete" aria-label="Delete">
        <span className="icon fa-solid fa-xmark" aria-hidden="true" />
      </Styled.DeleteFileButton>
    </Styled.OptionLi>
  );
});
