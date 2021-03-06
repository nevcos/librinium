import { Routes, Route, Navigate } from "react-router-dom";
import { useGithub } from "../hook/useGitHub";

import { LoginPage } from "./pages/LoginPage";
import { AboutPage } from "./pages/AboutPage";
import { EditorPage } from "./pages/EditorPage";
import { Content } from "./content/Content";

export function App(): JSX.Element {
  useGithub();

  return (
    <Routes>
      <Route path="" element={<Navigate to="/note/" />} />
      <Route path="note" element={<EditorPage />}>
        <Route path=":noteId" element={<Content />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="about" element={<AboutPage />} />
    </Routes>
  );
}
