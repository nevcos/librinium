import styled from "styled-components";
import { buildPlantUmlUrl } from "../service/plantUml";
import {DiagramCode} from "../types";

const PlantUmlPreviewDiv = styled.div`
  text-align: center;
`;

interface PlantUmlPreviewProps {
    code: DiagramCode;
}

export function PlantUmlPreview({ code }: PlantUmlPreviewProps): JSX.Element {
  const src = buildPlantUmlUrl(code);

  return (
    <PlantUmlPreviewDiv>
      <img src={src} alt="PlantUML diagram" />
    </PlantUmlPreviewDiv>
  );
}
