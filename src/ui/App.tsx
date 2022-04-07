import { Routes, Route } from "react-router-dom";

import { EditorPage } from "./pages/EditorPage";

export function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<EditorPage />} />
      <Route path="/login" element={<div>Login</div>} />
    </Routes>
  );
}
