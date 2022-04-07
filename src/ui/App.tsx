import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { documentStoreActions } from '../store/documentStore';
import { Sidebar } from "./sidebar/Sidebar";
import { Content } from './content/Content';
import { useGithub } from "../hook/useGitHub";

const Styled_Grid = styled.div`
  background-color: white;
  height: 100%;
  display: grid;
  grid-template-areas: "sidebar content";
  grid-template-columns: fit-content(100%) auto;
  grid-gap: 0.6rem;
`;

const Styled_Sidebar = styled.aside`
  grid-area: sidebar;
  height: 100%;
  
  overflow: hidden;
  width: 250px;
  min-width: 200px;
  max-width: 500px;
  resize: horizontal;
`;

const Styled_Content = styled.div`
  grid-area: content;
  height: 100%;

  overflow: hidden;
`;

export function App(): JSX.Element {
  const dispatch = useDispatch();

  useGithub();

  useEffect(() => {
    dispatch(documentStoreActions.fetchDocuments());
  }, []);

  return (
    <Styled_Grid>
      <Styled_Sidebar>
        <Sidebar />
      </Styled_Sidebar>
      <Styled_Content>
        <Content />
      </Styled_Content>
    </Styled_Grid>
  );
}
