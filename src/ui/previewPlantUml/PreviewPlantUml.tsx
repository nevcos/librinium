import styled from "styled-components";

import { buildPlantUmlUrl } from "../../service/plantUml";
import { RenderingCounter } from "../shared/RenderingCounter";
import {useActiveGist} from "../shared/useActiveGist";

const PlantUmlPreviewDiv = styled.div`
  text-align: center;
`;

export function PreviewPlantUml(): JSX.Element {
  const {gist} = useActiveGist();
  const src = gist ? buildPlantUmlUrl(gist.code) : "";

  return (
    <>
      <RenderingCounter />
      <PlantUmlPreviewDiv>
        <img src={src} alt="PlantUML document" />
      </PlantUmlPreviewDiv>
    </>
  );
}
