import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useOutlet } from "react-router-dom";
import styled from "styled-components";

import { documentStoreActions } from "../../store/documentStore";

import { Sidebar } from "../sidebar/Sidebar";
import { EmptyState } from '../content/EmptyState';

const Styled_Grid = styled.div`
  background-color: white;
  height: 100%;
  display: grid;
  grid-template-areas: "sidebar content";
  grid-template-columns: fit-content(100%) auto;
`;

const Styled_Sidebar = styled.aside`
  grid-area: sidebar;
  height: 100%;

  overflow: hidden;
  width: var(--sidebar-width);
  max-width: var(--sidebar-max-width);
  min-width: var(--sidebar-min-width);
  resize: var(--sidebar-resize);
`;

const Styled_Content = styled.div`
  grid-area: content;
  height: 100%;

  overflow: hidden;
`;

const Styled_EmptyState = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  text-align: center;
  color: #ccc;
`;

export function EditorPage() {
  const dispatch = useDispatch();
  const outlet = useOutlet();

  useEffect(() => {
    dispatch(documentStoreActions.fetchDocuments());
  }, []);

  return (
    <Styled_Grid>
      <Styled_Sidebar>
        <Sidebar />
      </Styled_Sidebar>
      <Styled_Content>
        {outlet ? (
          outlet
        ) : (
          <Styled_EmptyState>
            <EmptyState />
          </Styled_EmptyState>
        )}
      </Styled_Content>
    </Styled_Grid>
  );
}
