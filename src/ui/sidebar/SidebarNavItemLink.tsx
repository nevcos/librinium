import { memo, MouseEvent, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { useResolvedPath, useMatch } from "react-router-dom";

import type { Document } from "../../domain/document/Document";
import { DocumentName } from "../../domain/document/DocumentName";
import { documentStoreActions } from "../../store/documentStore";
import { DocumentIcon } from "./DocumentIcon";
import * as Styled from "./Sidebar.style";

type Props = {
  document: Document;
};

export const SidebarNavItemLink = memo(function ({ document }: Props) {
  const dispatch = useDispatch();

  const to = `/gists/${document.id}`;

  const { pathname } = useResolvedPath(to);
  const isActive = !! useMatch({ path: pathname, end: true });

  const onDoubleClickRename = useCallback(() => {
    const newName = window.prompt("Rename", document.name);
    if (newName) {
      dispatch(documentStoreActions.updateDocumentName({ id: document.id, name: newName as DocumentName }));
    }
  }, [document]);
  const onClickDeleteDocument = useCallback(
    (event: MouseEvent) => {
      const isConfirmationBypassed = event.ctrlKey && event.shiftKey;
      const isConfirmed = isConfirmationBypassed || window.confirm(`Delete ${document.name}?`);
      if (isConfirmed) {
        dispatch(documentStoreActions.deleteDocument(document.id));
      }
    },
    [document]
  );

  return (
    <Styled.OptionLi key={document.id} className={isActive ? "--active" : ""} data-testid="document">
      <Styled.NavLink to={to} onDoubleClick={onDoubleClickRename} data-testid="open">
        <DocumentIcon type={document.type} />
        <span className="label">{document.name}</span>
      </Styled.NavLink>
      <Styled.DeleteButton onClick={onClickDeleteDocument} data-testid="delete" title="Delete" aria-label="Delete">
        <span className="icon fa-solid fa-xmark" aria-hidden="true" />
      </Styled.DeleteButton>
    </Styled.OptionLi>
  );
});
