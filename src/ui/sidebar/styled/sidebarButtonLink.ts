import { css } from "styled-components";
import { sidebarInput } from "./sidebarInput";

export const sidebarButtonLink = css`
  ${sidebarInput}
  vertical-align: middle;

  &:not(:disabled) {
    cursor: pointer;

    &:hover,
    &:focus,
    &[aria-expanded="true"] {
      background-color: var(--sidebar-item-hover-bg-color);
    }
  }

  > .label {
    margin-left: var(--sidebar-padding);
    display: var(--sidebar-labels-display);
  }
`;
