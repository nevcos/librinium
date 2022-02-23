import styled from "styled-components";
import { buildPlantUmlUrl } from "../service/plantUml";

const PlantUmlPreviewDiv = styled.div`
  text-align: center;
`;

export function PlantUmlPreview({ code }) {
  const src = buildPlantUmlUrl(code);

  return (
    <PlantUmlPreviewDiv>
      <img src={src} alt="PlantUML diagram" />
    </PlantUmlPreviewDiv>
  );
}
