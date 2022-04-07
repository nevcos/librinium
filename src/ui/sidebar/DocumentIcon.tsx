import { memo } from "react";
import styled from 'styled-components';

import { DocumentContentType } from "../../domain/document/DocumentContentType";

const iconByType = {
  [DocumentContentType.PLANT_UML]: {title: "PlantUML diagram", className: "icon fa-solid fa-diagram-project"},
  [DocumentContentType.REMARK]: {title: "Remark presentation", className: "icon fa-solid fa-chalkboard"},
  [DocumentContentType.MARKDOWN]: {title: "Markdown document", className: "icon fa-solid fa-file-lines"},
};

const defaultIcon = {title: "Document", className: "icon fa-solid fa-file"};

interface Props {
  type: DocumentContentType;
}

const Styled_Icon = styled.span`
  font-size: var(--icon-size);
`;

export const DocumentIcon = memo(function ({ type }: Props) {
  const {title, className} = iconByType[type] || defaultIcon;
  return <Styled_Icon className={className} title={title} aria-hidden="true" />;
});
