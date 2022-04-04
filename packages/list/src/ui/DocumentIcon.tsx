import { memo } from "react";

import { DocumentContentType } from "@nevcos/shared/src/document/DocumentContentType";
import styled from 'styled-components';

const iconClassNameByType = {
  [DocumentContentType.PLANT_UML]: "fa-solid fa-diagram-project",
  [DocumentContentType.REMARK]: "fa-solid fa-chalkboard",
  [DocumentContentType.MARKDOWN]: "fa-solid fa-file-lines"
};

const defaultIcon = "fa-solid fa-file";

interface Props {
  type: DocumentContentType;
}

const Styled_Icon = styled.span`
  font-size: 0.8em;
`;

export const DocumentIcon = memo(function ({ type }: Props) {
  const className = iconClassNameByType[type] || defaultIcon;
  return <Styled_Icon className={className} aria-hidden="true"></Styled_Icon>;
});
