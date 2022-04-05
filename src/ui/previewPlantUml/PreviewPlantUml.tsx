import { memo } from "react";
import styled from "styled-components";

import { buildPlantUmlUrl } from "../../service/plantUml";
import { DocumentContent } from "../../domain/document/DocumentContent";
import { RenderingCounter } from "../shared/RenderingCounter";

const PlantUmlPreviewDiv = styled.div`
  text-align: center;
`;

interface Props {
  code: DocumentContent | undefined;
}

export const PlantUmlPreview = memo(function ({ code }: Props): JSX.Element {
  const src = buildPlantUmlUrl(code);

  return (
    <>
      <RenderingCounter />
      <PlantUmlPreviewDiv>
        <img src={src} alt="PlantUML document" />
      </PlantUmlPreviewDiv>
    </>
  );
});
