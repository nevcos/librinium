import styled from "styled-components";

import { buildPlantUmlUrl } from "../../service/plantUml";
import { RenderingCounter } from "../shared/RenderingCounter";
import { documentStoreSelectors } from '../../store/documentStore';
import { useGistSelector } from '../../hook/useGistSelector';

const PlantUmlPreviewDiv = styled.div`
  text-align: center;
`;

export function PreviewPlantUml(): JSX.Element {
  const code = useGistSelector(documentStoreSelectors.getSelectedDocument)?.code;
  const src = buildPlantUmlUrl(code);

  return (
    <>
      <RenderingCounter />
      <PlantUmlPreviewDiv>
        <img src={src} alt="PlantUML document" />
      </PlantUmlPreviewDiv>
    </>
  );
}
