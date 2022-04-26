import { memo } from "react";
import styled from "styled-components";

const Styled_Icon = styled.span`
  font-size: var(--icon-size);
  display: inline-block;
  width: 0.8em;
  text-align: center;
`;

interface Props {
  className: string;
  title?: string;
}

export const Icon = memo(function ({ className, title }: Props) {
  return <Styled_Icon className={"icon " + className} title={title} aria-hidden="true" />;
});
