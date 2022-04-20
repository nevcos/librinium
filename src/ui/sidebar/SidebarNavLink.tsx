import { memo } from "react";
import { useDispatch } from "react-redux";

import type { Note } from "../../domain/note/Note";
import { NoteName } from "../../domain/note/NoteName";
import { noteStoreActions } from "../../store/noteStore";

import { useNavigation } from "../shared/useNavigation";
import { SidebarNavBranch } from "./navItem/SidebarNavBranch";
import { NoteIcon } from "../shared/NoteIcon";
import { useConst } from "../shared/useConst";
import { MenuItem } from "./navItem/domain/MenuItem";

type Props = {
  note: Note;
};

export const SidebarNavLink = memo(function ({ note }: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const menuOptions = useConst<MenuItem[]>(() => [
    {
      label: "Rename...",
      onClick: () => {
        const name = window.prompt("Rename", note.name) as NoteName;
        if (name) {
          dispatch(noteStoreActions.updateNoteName({ patch: { id: note.id, name, folderId: note.folderId } }));
        }
      },
      iconClassName: "fa-solid fa-i-cursor",
      dataTestId: "rename-note"
    },
    {
      label: "Delete...",
      onClick: () => {
        const isConfirmed = window.confirm(`Delete file ${note.name}?`);
        if (isConfirmed) {
          const folderId = note.folderId; // root file will have this as undefined
          const fileId = note.id;
          dispatch(noteStoreActions.deleteNote({ navigation, id: fileId, folderId }));
        }
      },
      iconClassName: "fa-solid fa-xmark",
      dataTestId: "delete-note"
    }
  ]);

  const to = `/note/${note.id}`;
  const isActive = navigation.isActive(to);

  return (
    <SidebarNavBranch
      to={to}
      isActive={isActive}
      icon={<NoteIcon contentTypeName={note.type} />}
      label={note.name}
      menu={menuOptions}
    />
  );
});
