import { Routes, Route, Navigate } from "react-router-dom";
import { useGithub } from "../hook/useGitHub";

import { LoginPage } from "./pages/LoginPage";
import { AboutPage } from "./pages/AboutPage";
import { EditorPage } from "./pages/EditorPage";
import { ContentWithMergedPreview } from "./content/ContentWithMergedPreview";
import { ContentWithSidePreview } from "./content/ContentWithSidePreview";

export function App(): JSX.Element {
  useGithub();

  return (
    <Routes>
      <Route path="" element={<Navigate to="/note/" />} />
      <Route path="note2" element={<EditorPage />}>
        <Route path=":noteId" element={<ContentWithMergedPreview />} />
      </Route>
      <Route path="note" element={<EditorPage />}>
        <Route path=":noteId" element={<ContentWithSidePreview />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="about" element={<AboutPage />} />
    </Routes>
  );
}
