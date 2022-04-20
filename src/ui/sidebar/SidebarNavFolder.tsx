import { memo, MouseEvent, useCallback } from "react";
import { useDispatch } from "react-redux";

import { Folder } from "../../domain/folder/Folder";
import { NoteName } from "../../domain/note/NoteName";
import { useGistSelector } from "../../hook/useGistSelector";
import { noteStoreActions, noteStoreSelectors } from "../../store/noteStore";
import { useNavigation } from "../shared/useNavigation";

import { SidebarNavLink } from "./SidebarNavLink";
import styled from "styled-components";
import { SidebarNavBranch } from "./navItem/SidebarNavBranch";
import { Icon } from "../shared/Icon";

type Props = {
  folder: Folder;
};

export const Styled_FolderTitle = styled.div`
  display: flex;
  align-items: center;

  > .icon {
    font-size: var(--icon-size);
  }

  > .label {
    flex-grow: 1;
    margin-left: var(--sidebar-padding);

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const Styled_FolderLi = styled.li`
  scroll-snap-align: start;

  display: flex;
  flex-direction: column;

  padding: var(--input-padding);
  padding-right: 0;
  padding-top: 0;

  &:last-child {
    padding-bottom: 0;
  }
`;

export const SidebarNavFolder = memo(function ({ folder }: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const files = useGistSelector((state) => noteStoreSelectors.getNotesByFolder(state, folder.id));

  const onClickDeleteFolder = useCallback(
    (event: MouseEvent) => {
      const message = `Delete folder ${folder.name}? It will delete all files inside.`;
      const isConfirmationBypassed = event.ctrlKey && event.shiftKey;
      const isConfirmed = isConfirmationBypassed || window.confirm(message);
      if (isConfirmed) {
        dispatch(noteStoreActions.deleteFolder({ navigation, id: folder.id }));
      }
    },
    [folder]
  );

  const onClickCreateNote = useCallback(() => {
    const filename = prompt("Please enter the filename, including extension.\nExample: README.md") as NoteName;
    if (filename) {
      dispatch(noteStoreActions.createNote({ navigation, filename, folderId: folder.id }));
    }
  }, [folder]);

  return files.length ? (
    <SidebarNavBranch
      icon={<Icon className="fa-solid fa-folder" title="Folder" />}
      label={folder.name}
      menu={[
        { label: "Create Note...", onClick: onClickCreateNote, iconClassName: "fa-solid fa-plus" },
        { label: "Delete Folder...", onClick: onClickDeleteFolder, iconClassName: "fa-solid fa-xmark" }
      ]}
      key={folder.id}
      data-testid="folder"
      children={files.map((note) => (
        <SidebarNavLink note={note} key={note.id} />
      ))}
    />
  ) : null;
});
