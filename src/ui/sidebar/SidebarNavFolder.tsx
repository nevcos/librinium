import { memo } from "react";

import { Folder } from "../../domain/folder/Folder";
import { useGistSelector } from "../../hook/useGistSelector";
import { documentStoreSelectors } from "../../store/documentStore";

import * as Styled from "./Sidebar.style";
import { SidebarNavItemLink } from "./SidebarNavItemLink";

type Props = {
  folder: Folder;
};

export const SidebarNavFolder = memo(function ({ folder }: Props) {
  const files = useGistSelector((state) => documentStoreSelectors.getDocumentsByFolder(state, folder.id));

  return (
    <Styled.FolderLi key={folder.name}>
      <div>{folder.name}</div>

      <Styled.ListUl className="documents-list">
        {files.map((document) => (
          <SidebarNavItemLink document={document} key={document.id} />
        ))}
      </Styled.ListUl>
    </Styled.FolderLi>
  );
});
