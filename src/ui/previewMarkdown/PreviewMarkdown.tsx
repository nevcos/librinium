import { useEffect, useRef } from "react";
import styled from "styled-components";
import { marked } from "marked";

import {useActiveNote} from "../shared/useActiveNote";

const Container = styled.div`
`;

export function PreviewMarkdown() {
  const {note} = useActiveNote();
  const code = note?.code || "";
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = marked.parse(code);
  }, [code]);

  return <Container ref={container} />;
}
