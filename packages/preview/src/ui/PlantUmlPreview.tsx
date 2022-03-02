import styled from "styled-components";
import { buildPlantUmlUrl } from "../service/plantUml";
import {DiagramCode} from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramCode";

const PlantUmlPreviewDiv = styled.div`
  text-align: center;
`;

interface Props {
  code: DiagramCode | undefined;
}

export function PlantUmlPreview({ code }: Props): JSX.Element {
  const src = buildPlantUmlUrl(code);

  return (
    <PlantUmlPreviewDiv>
      <img src={src} alt="PlantUML diagram" />
    </PlantUmlPreviewDiv>
  );
}

export default PlantUmlPreview;
