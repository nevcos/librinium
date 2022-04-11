import { memo, MouseEvent, useCallback } from "react";
import { useDispatch } from 'react-redux';

import type { Document } from "../../domain/document/Document";
import { DocumentName } from "../../domain/document/DocumentName";
import { documentStoreActions } from "../../store/documentStore";

import {useNavigation} from "../shared/useNavigation";
import { DocumentIcon } from "./DocumentIcon";
import * as Styled from "./Sidebar.style";

type Props = {
  document: Document;
};

export const SidebarNavItemLink = memo(function ({ document }: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const to = `/gists/${document.id}`;
  const isActive = navigation.isActive(to);

  const onDoubleClickRename = useCallback(() => {
    const newName = window.prompt("Rename", document.name);
    if (newName) {
      const id = document.id;
      const name = newName as DocumentName;
      dispatch(documentStoreActions.updateDocumentName({ id, name }));
    }
  }, [document]);
  const onClickDeleteDocument = useCallback(
    (event: MouseEvent) => {
      const isConfirmationBypassed = event.ctrlKey && event.shiftKey;
      const isConfirmed = isConfirmationBypassed || window.confirm(`Delete ${document.name}?`);
      if (isConfirmed) {
        const id = document.id;
        dispatch(documentStoreActions.deleteDocument({navigation, id}));
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
