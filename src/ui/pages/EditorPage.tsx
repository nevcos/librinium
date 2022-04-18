import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useOutlet } from "react-router-dom";
import styled from "styled-components";

import { noteStoreActions } from "../../store/noteStore";

import { Sidebar } from "../sidebar/Sidebar";
import { EmptyState } from "../content/EmptyState";

const Styled_Grid = styled.div`
  background-color: white;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-areas: "sidebar content";
  grid-template-columns: fit-content(100%) auto;
`;

const Styled_Sidebar = styled.aside`
  grid-area: sidebar;
  height: 100%;

  overflow: hidden;
  width: var(--sidebar-width);
  max-width: var(--sidebar-width-max);
  min-width: var(--sidebar-width-min);
  resize: horizontal;
`;

const Styled_Content = styled.div`
  grid-area: content;
  height: 100%;

  overflow: hidden;
`;

export function EditorPage() {
  const dispatch = useDispatch();
  const outlet = useOutlet();

  useEffect(() => {
    dispatch(noteStoreActions.fetchNotes());
  }, []);

  return (
    <Styled_Grid>
      <Styled_Sidebar>
        <Sidebar />
      </Styled_Sidebar>
      <Styled_Content>{outlet ? outlet : <EmptyState />}</Styled_Content>
    </Styled_Grid>
  );
}
