import { useEffect, useRef } from "react";
import styled from "styled-components";

import type { DocumentContent } from "../../domain/document/DocumentContent";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const remark: any;

const Container = styled.div`
  position: relative !important;
  width: 100%;
  height: 100%;
`;

interface Props {
  code: DocumentContent;
}

export function PreviewPresentation({ code }: Props) {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    remark.create({ container: container.current, source: code });
    return () => {
      if (container.current) container.current.innerHTML = "";
    };
  }, [code]);

  return <Container ref={container}></Container>;
}
