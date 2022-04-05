import { useEffect, useRef } from "react";
import styled from "styled-components";

import { useSelector } from 'react-redux';
import { documentStoreSelectors } from '../../store/documentStore';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const remark: any;

const Container = styled.div`
  position: relative !important;
  width: 100%;
  height: 100%;

  // Override
  &.remark-container {
    background: transparent;

    .remark-slide-scaler {
      box-shadow: none;
    }

    .remark-slide-content {
      background-color: #eee;
    }
  }
`;

export function PreviewPresentation() {
  const code = useSelector(documentStoreSelectors.getSelectedDocument)?.code;
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    remark.create({ container: container.current, source: code });
    return () => {
      if (container.current) container.current.innerHTML = "";
    };
  }, [code]);

  return <Container ref={container}></Container>;
}
