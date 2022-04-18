import {memo, useEffect, useRef} from "react";
import styled from "styled-components";
import { marked } from "marked";

import {Note} from "../../../domain/note/Note";

const Container = styled.div`
`;

export const MarkdownPreviewComponent = memo(function ({note}: {note: Note}) {
  const code = note?.code || "";
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = marked.parse(code);
  }, [code]);

  return <Container ref={container} />;
});
