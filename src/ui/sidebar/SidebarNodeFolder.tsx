import { memo, MouseEvent } from "react";
import { useDispatch } from "react-redux";

import { NoteName } from "../../domain/note/NoteName";
import { noteStoreActions } from "../../store/noteStore";
import { useConst } from "../shared/useConst";
import { useNavigation } from "../shared/useNavigation";

import { SidebarNavBranch } from "./navItem/SidebarNavBranch";
import { MenuItem } from "./navItem/domain/MenuItem";
import { Icon } from "../shared/Icon";
import { FilesNode, isFolder } from "../../domain/noteStoreState/FilesNode";
import { Folder } from "../../domain/folder/Folder";
import { SidebarNodeNote } from "./SidebarNodeNote";

type Props = {
  folder: Folder;
  children: FilesNode[];
};

export const SidebarNodeFolder = memo(function ({ folder, children }: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
      dataTestId: "create-folder-note"
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
      dataTestId: "delete-folder"
    }
  ]);

  return children.length ? (
    <SidebarNavBranch
      icon={<Icon className="fa-solid fa-folder" title="Folder" />}
      label={folder.name}
      menu={menuOptions}
      key={folder.id}
      data-testid="folder"
      children={children.map((child) => {
        return isFolder(child.value) ? (
          <SidebarNodeFolder folder={child.value} children={child.children} key={child.value.id} />
        ) : (
          <SidebarNodeNote note={child.value} key={child.value.id} />
        );
      })}
    />
  ) : null;
});
