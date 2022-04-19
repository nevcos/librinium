import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";

import type { Note } from "../../domain/note/Note";
import { NoteName } from "../../domain/note/NoteName";
import { noteStoreActions } from "../../store/noteStore";

import { useNavigation } from "../shared/useNavigation";
import { SidebarNavItem } from "./navItem/SidebarNavItem";
import { NoteIcon } from "../shared/NoteIcon";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { sidebarButtonLink } from "./styled/sidebarButtonLink";

export const Styled_OptionLi = styled.li`
  display: flex;
  border-radius: var(--input-border-radius);
  scroll-snap-align: start;
  overflow-x: hidden;
  opacity: 0.7;

  &:hover {
    background-color: var(--sidebar-item-hover-bg-color);
    opacity: 1;
  }

  &.--active {
    background-color: var(--sidebar-item-selected-bg-color);
    opacity: 1;
  }
`;

type Props = {
  note: Note;
};

export const SidebarNavLink = memo(function ({ note }: Props) {
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

  return (
    <Styled_OptionLi key={note.id} className={isActive ? "--active" : ""} data-testid="note">
      <SidebarNavItem
        to={to}
        icon={<NoteIcon contentTypeName={note.type} />}
        label={note.name}
        items={[
          { label: "Rename...", onClick: onClickRenameNote, iconClassName: "fa-solid fa-i-cursor" },
          { label: "Delete...", onClick: onClickDeleteNote, iconClassName: "fa-solid fa-xmark" }
        ]}
      />
    </Styled_OptionLi>
  );
});
