import {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import styled, {css} from "styled-components";

import {getContentTypePluginByName} from "../../contentType/ContentTypeService";
import {noteStoreActions} from "../../store/noteStore";
import {useActiveNote} from "../shared/useActiveNote";

const Styled_Container = styled.div`
  position: fixed;
  bottom: 2em;
  right: 2em;
  z-index: 10;
`;

const Styled_List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;

  background-color: var(--color-gray-lightest);
`;

export const toolbarInput = css`
  display: block;
  border: none;
  border-radius: var(--input-border-radius);
  background-color: transparent;
  text-align: left;
  padding: var(--input-padding);
  color: inherit;
  opacity: .5;

  &:not(:disabled):not(.--disabled):not(a:not([href])) {
    opacity: 1;
    cursor: pointer;

    &:hover {
      background-color: var(--color-gray-light);
    }
  }
`;

const Styled_Item = styled.li`
  > * {
    ${toolbarInput}
  }
`;

export function Toolbar(): JSX.Element {
  const dispatch = useDispatch()
  const {noteId, note} = useActiveNote();

  const onSelectedFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(noteStoreActions.insertImage({noteId, file}));
    }
  }, []);

  const isDisabled = !note;
  const disabledClassName = isDisabled ? "--disabled" : "";
  const contentTypePlugin = getContentTypePluginByName(note?.type);
  const documentationLinkHref = contentTypePlugin?.docsUrl;
  const documentationLinkTitle = contentTypePlugin ? `${contentTypePlugin.name} documentation` : "";

  return <Styled_Container>
    <Styled_List>
      <Styled_Item>
        <label tabIndex={0} title="Insert image" aria-label="Insert image" className={disabledClassName}>
          <input type="file" onChange={onSelectedFile} accept="image/*" hidden disabled={isDisabled} />
          <span className="icon fa-solid fa-image" aria-hidden="true" />
        </label>
      </Styled_Item>
      <Styled_Item>
        <a href={documentationLinkHref} target="_blank" title={documentationLinkTitle}>
          <span className="icon fa-solid fa-circle-question" aria-hidden="true" />
        </a>
      </Styled_Item>
    </Styled_List>
  </Styled_Container>;
}
