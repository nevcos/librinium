import {useRef} from "react";
import styled from "styled-components";

const RenderingCounterContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const RenderingCounterDiv = styled.div`
  position: absolute;

  font-size: 10px;
  background-color: lightyellow;
  top: 2px;
  right: 2px;
  border: 1px solid black;
  padding: 2px;
`;

export function RenderingCounter(): JSX.Element {
  const counter = useRef(0);
  counter.current ++;
  return <RenderingCounterContainer>
    <RenderingCounterDiv>{counter.current}</RenderingCounterDiv>
  </RenderingCounterContainer>
}
