import styled from "styled-components";

import { buildPlantUmlUrl } from "../../service/plantUml";
import { RenderingCounter } from "../shared/RenderingCounter";
import {useActiveNote} from "../shared/useActiveNote";

const PlantUmlPreviewDiv = styled.div`
  text-align: center;
`;

export function PreviewPlantUml(): JSX.Element {
  const {note} = useActiveNote();
  const src = note ? buildPlantUmlUrl(note.code) : "";

  return (
    <>
      <RenderingCounter />
      <PlantUmlPreviewDiv>
        <img src={src} alt="PlantUML note" />
      </PlantUmlPreviewDiv>
    </>
  );
}
