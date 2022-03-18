import { memo } from "react";
import styled from "styled-components";
import { buildPlantUmlUrl } from "../service/plantUml";
import { DiagramCode } from "@nevcos/shared/src/diagram/DiagramCode";
import { RenderingCounter } from "@nevcos/shared//src/ui/renderingCounter/RenderingCounter";

const PlantUmlPreviewDiv = styled.div`
  text-align: center;
`;

interface Props {
  code: DiagramCode | undefined;
}

export const PlantUmlPreview = memo(function ({ code }: Props): JSX.Element {
  const src = buildPlantUmlUrl(code);

  return (
    <>
      <RenderingCounter />
      <PlantUmlPreviewDiv>
        <img src={src} alt="PlantUML diagram" />
      </PlantUmlPreviewDiv>
    </>
  );
});

export default PlantUmlPreview;
