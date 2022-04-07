import { Routes, Route } from "react-router-dom";
import { useGithub } from "../hook/useGitHub";

import { EditorPage } from "./pages/EditorPage";

export function App(): JSX.Element {
  useGithub();

  return (
    <Routes>
      <Route path="/" element={<EditorPage />} />
      <Route path="/login" element={<div>Login</div>} />
    </Routes>
  );
}
