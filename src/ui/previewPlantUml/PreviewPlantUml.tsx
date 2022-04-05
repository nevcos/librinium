import { useSelector } from 'react-redux';
import styled from "styled-components";

import { buildPlantUmlUrl } from "../../service/plantUml";
import { RenderingCounter } from "../shared/RenderingCounter";
import { documentStoreSelectors } from '../../store/documentStore';

const PlantUmlPreviewDiv = styled.div`
  text-align: center;
`;

export function PreviewPlantUml(): JSX.Element {
  const code = useSelector(documentStoreSelectors.getSelectedDocument)?.code;
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
