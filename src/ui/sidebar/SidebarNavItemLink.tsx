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

  const to = `/gists/${document.id}`;
  const isActive = navigation.isActive(to);

  const onDoubleClickRename = useCallback(() => {
    const newName = window.prompt("Rename", document.name);
    if (newName) {
      const id = document.id;
      const name = newName as NoteName;
      dispatch(noteStoreActions.updateNoteName({ id, name }));
    }
  }, [note]);

  const onClickDeleteNote = useCallback(
    (event: MouseEvent) => {
      const isConfirmationBypassed = event.ctrlKey && event.shiftKey;
      const isConfirmed = isConfirmationBypassed || window.confirm(`Delete file ${document.name}?`);
      if (isConfirmed) {
        const folderId = document.folderId; // root file will have this as undefined
        const fileId = document.id;
        dispatch(noteStoreActions.deleteNote({ navigation, fileId, folderId }));
      }
    },
    [note]
  );

  return (
    <Styled.OptionLi key={document.id} className={isActive ? "--active" : ""} data-testid="note">
      <Styled.NavLink to={to} onDoubleClick={onDoubleClickRename} data-testid="open">
        <NoteIcon type={document.type} />
        <span className="label">{document.name}</span>
      </Styled.NavLink>
      <Styled.DeleteButton onClick={onClickDeleteNote} data-testid="delete" title="Delete" aria-label="Delete">
        <span className="icon fa-solid fa-xmark" aria-hidden="true" />
      </Styled.DeleteButton>
    </Styled.OptionLi>
  );
});
