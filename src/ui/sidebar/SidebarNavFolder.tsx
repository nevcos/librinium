import { memo, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Folder } from "../../domain/folder/Folder";
import { NoteName } from "../../domain/note/NoteName";
import { useGistSelector } from "../../hook/useGistSelector";
import { noteStoreActions, noteStoreSelectors } from "../../store/noteStore";
import {useConst} from "../shared/useConst";
import { useNavigation } from "../shared/useNavigation";

import { SidebarNavLink } from "./SidebarNavLink";
import { SidebarNavBranch } from "./navItem/SidebarNavBranch";
import {MenuItem} from "./navItem/domain/MenuItem";
import { Icon } from "../shared/Icon";

type Props = {
  folder: Folder;
};

export const SidebarNavFolder = memo(function ({ folder }: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const files = useGistSelector((state) => noteStoreSelectors.getNotesByFolder(state, folder.id));

  const menuOptions = useConst<MenuItem[]>(() => [
    {
      label: "Create Note...",
      onClick: () => {
        const filename = prompt("Please enter the filename, including extension.\nExample: README.md") as NoteName;
        if (filename) {
          dispatch(noteStoreActions.createNote({ navigation, filename, folderId: folder.id }));
        }
      },
      iconClassName: "fa-solid fa-plus",
      dataTestId: "create-folder-note",
    },
    {
      label: "Delete Folder...",
      onClick: (event: MouseEvent) => {
        const message = `Delete folder ${folder.name}? It will delete all files inside.`;
        const isConfirmationBypassed = event.ctrlKey && event.shiftKey;
        const isConfirmed = isConfirmationBypassed || window.confirm(message);
        if (isConfirmed) {
          dispatch(noteStoreActions.deleteFolder({ navigation, id: folder.id }));
        }
      },
      iconClassName: "fa-solid fa-xmark",
      dataTestId: "delete-folder",
    }
  ]);

  return files.length ? (
    <SidebarNavBranch
      icon={<Icon className="fa-solid fa-folder" title="Folder" />}
      label={folder.name}
      menu={menuOptions}
      key={folder.id}
      data-testid="folder"
      children={files.map((note) => (
        <SidebarNavLink note={note} key={note.id} />
      ))}
    />
  ) : null;
});
