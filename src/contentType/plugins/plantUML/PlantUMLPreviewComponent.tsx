import {memo} from "react";
import styled from "styled-components";

import { buildPlantUmlUrl } from "../../../service/plantUml";
import { RenderingCounter } from "../../../ui/shared/RenderingCounter";
import {Note} from "../../../domain/note/Note";

const PlantUmlPreviewDiv = styled.div`
  text-align: center;
`;

export const PlantUMLPreviewComponent = memo(function ({note}: {note: Note}): JSX.Element {
  const src = note ? buildPlantUmlUrl(note.code) : "";

  return (
    <>
      <RenderingCounter />
      <PlantUmlPreviewDiv>
        <img src={src} alt="PlantUML note" />
      </PlantUmlPreviewDiv>
    </>
  );
});
