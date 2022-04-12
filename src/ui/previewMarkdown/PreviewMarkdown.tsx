import { useEffect, useRef } from "react";
import styled from "styled-components";
import { marked } from "marked";

import {useActiveGist} from "../shared/useActiveGist";

const Container = styled.div`
`;

export function PreviewMarkdown() {
  const {gist} = useActiveGist();
  const code = gist?.code || "";
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = marked.parse(code);
  }, [code]);

  return <Container ref={container} />;
}
