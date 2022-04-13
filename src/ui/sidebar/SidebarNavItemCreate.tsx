import { memo, useCallback } from "react";
import { useDispatch } from 'react-redux';

import { NoteContentType, labelNoteContentTypeMap } from "../../domain/note/NoteContentType";
import { noteStoreActions } from "../../store/noteStore";

import {useNavigation} from "../shared/useNavigation";
import * as Styled from "./Sidebar.style";
import { NoteIcon } from "./NoteIcon";

type Props = {
  type: NoteContentType;
};

export const SidebarNavItemCreate = memo(function ({ type }: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onClickCreate = useCallback(() => {
    dispatch(noteStoreActions.createNewNote({navigation, type}));
  }, [type]);
  return (
    <Styled.OptionLi>
      <Styled.NewButton onClick={onClickCreate} data-testid={`create-${type}`}>
        <NoteIcon type={type} />
        <span className="label">new {labelNoteContentTypeMap[type]} ...</span>
      </Styled.NewButton>
    </Styled.OptionLi>
  );
});
