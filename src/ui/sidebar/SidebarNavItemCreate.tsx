import { memo, useCallback } from "react";
import { useDispatch } from 'react-redux';

import { DocumentContentType, labelDocumentContentTypeMap } from "../../domain/document/DocumentContentType";
import { documentStoreActions } from "../../store/documentStore";

import {useNavigation} from "../shared/useNavigation";
import * as Styled from "./Sidebar.style";
import { DocumentIcon } from "./DocumentIcon";

type Props = {
  type: DocumentContentType;
};

export const SidebarNavItemCreate = memo(function ({ type }: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onClickCreate = useCallback(() => {
    dispatch(documentStoreActions.createNewDocument({navigation, type}));
  }, [type]);
  return (
    <Styled.OptionLi>
      <Styled.NewButton onClick={onClickCreate} data-testid="create-plantuml">
        <DocumentIcon type={type} />
        <span className="label">new {labelDocumentContentTypeMap[type]} ...</span>
      </Styled.NewButton>
    </Styled.OptionLi>
  );
});
