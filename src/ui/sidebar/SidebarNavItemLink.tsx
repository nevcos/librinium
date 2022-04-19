import { memo, MouseEvent, useCallback } from "react";
import { useDispatch } from "react-redux";

import type { Note } from "../../domain/note/Note";
import { NoteName } from "../../domain/note/NoteName";
import { noteStoreActions } from "../../store/noteStore";

import { useNavigation } from "../shared/useNavigation";
import * as Styled from "./Sidebar.style";
import { SidebarNavItem } from "./shared/SidebarNavItem";
import { getContentTypePluginByName } from "../../contentType/ContentTypeService";
import { NoteIcon } from "../shared/NoteIcon";

type Props = {
  note: Note;
};

export const SidebarNavItemLink = memo(function ({ note }: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const to = `/note/${note.id}`;
  const isActive = navigation.isActive(to);

  const onClickRenameNote = useCallback(() => {
    const newName = window.prompt("Rename", note.name);
    if (newName) {
      const id = note.id;
      const name = newName as NoteName;
      dispatch(noteStoreActions.updateNoteName({ id, name }));
    }
  }, [note]);

  const onClickDeleteNote = useCallback(() => {
    const isConfirmed = window.confirm(`Delete file ${note.name}?`);
    if (isConfirmed) {
      const folderId = note.folderId; // root file will have this as undefined
      const fileId = note.id;
      dispatch(noteStoreActions.deleteNote({ navigation, id: fileId, folderId }));
    }
  }, [note]);

  const contentTypePlugin = getContentTypePluginByName(note.type);

  return (
    <Styled.OptionLi key={note.id} className={isActive ? "--active" : ""} data-testid="note">
      <SidebarNavItem
        to={to}
        icon={<NoteIcon contentTypeName={note.type}/>}
        label={note.name}
        items={[
          { label: "Rename...", onClick: onClickRenameNote, iconClassName: "fa-solid fa-i-cursor" },
          { label: "Delete...", onClick: onClickDeleteNote, iconClassName: "fa-solid fa-xmark" }
        ]}
      />
    </Styled.OptionLi>
  );
});
