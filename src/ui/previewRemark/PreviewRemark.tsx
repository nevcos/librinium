import { useEffect, useRef } from "react";
import styled from "styled-components";

import {useActiveGist} from "../shared/useActiveGist";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const remark: any;

interface RemarkSlide {
    getSlideIndex(): number;
    notes: string;
    properties: Map<string, string>;
    content: string;
}

const Container = styled.div`
  position: relative !important;
  width: 100%;
  height: 100%;

  // Override
  &.remark-container {
    background: transparent;

    &:focus {
      outline: none;

      .remark-slide {
        outline: 1px solid var(--color-gray-dark);
      }
    }

    .remark-slide-scaler {
      box-shadow: none;
    }

    .remark-slide-content {
      background-color: #eee;
    }
  }
`;

export function PreviewPresentation() {
  const {gist} = useActiveGist();
  const code = gist?.code || "";
  const container = useRef<HTMLDivElement | null>(null);
  const currentSlide = useRef<number>();

  useEffect(() => {
    const slideshow = remark.create({ container: container.current, source: code });
    slideshow.on("showSlide", (slide: RemarkSlide) => {
      currentSlide.current = slide.getSlideIndex() + 1;
    });
    if (currentSlide.current) {
      slideshow.gotoSlide(currentSlide.current);
    }
    return () => {
      if (container.current) container.current.innerHTML = "";
    };
  }, [code]);

  return <Container ref={container} />;
}
