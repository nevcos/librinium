import { memo } from "react";
import styled from "styled-components";

import { NoteContentType } from "../../domain/note/NoteContentType";

const iconByType = {
  [NoteContentType.PLANT_UML]: { title: "PlantUML diagram", className: "icon fa-solid fa-diagram-project" },
  [NoteContentType.REMARK]: { title: "Remark presentation", className: "icon fa-solid fa-chalkboard" },
  [NoteContentType.MARKDOWN]: { title: "Markdown note", className: "icon fa-solid fa-file-lines" }
};

const defaultIcon = { title: "Note", className: "icon fa-solid fa-file" };

interface Props {
  type: NoteContentType;
}

const Styled_Icon = styled.span`
  font-size: var(--icon-size);
  width: 15px;
  text-align: center;
`;

export const NoteIcon = memo(function ({ type }: Props) {
  const { title, className } = iconByType[type] || defaultIcon;
  return <Styled_Icon className={className} title={title} aria-hidden="true" />;
});
