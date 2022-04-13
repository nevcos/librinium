import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";

import { Folder } from "../../domain/folder/Folder";
import { useGistSelector } from "../../hook/useGistSelector";
import { documentStoreActions, documentStoreSelectors } from "../../store/documentStore";
import { useNavigation } from "../shared/useNavigation";

import * as Styled from "./Sidebar.style";
import { SidebarNavItemLink } from "./SidebarNavItemLink";

type Props = {
  folder: Folder;
};

export const SidebarNavFolder = memo(function ({ folder }: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const files = useGistSelector((state) => documentStoreSelectors.getDocumentsByFolder(state, folder.id));

  const onClickDeleteFolder = useCallback(
    (event: MouseEvent) => {
      const message = `Delete folder ${folder.name}? It will delete all files inside.`;
      const isConfirmationBypassed = event.ctrlKey && event.shiftKey;
      const isConfirmed = isConfirmationBypassed || window.confirm(message);
      if (isConfirmed) {
        dispatch(documentStoreActions.deleteFolder({ navigation, id: folder.id }));
      }
    },
    [folder]
  );

  // TODO: should we show empty folders?

  return files.length ? (
    <Styled.FolderLi key={folder.id}>
      <Styled.FolderTitle>
        <span className="label">{folder.name}</span>
        <Styled.DeleteButton onClick={onClickDeleteFolder} title="Delete" aria-label="Delete">
          <span className="icon fa-solid fa-xmark" aria-hidden="true" />
        </Styled.DeleteButton>
      </Styled.FolderTitle>
      <Styled.ListUl className="documents-list">
        {files.map((document) => (
          <SidebarNavItemLink document={document} key={document.id} />
        ))}
      </Styled.ListUl>
    </Styled.FolderLi>
  ) : null;
});
