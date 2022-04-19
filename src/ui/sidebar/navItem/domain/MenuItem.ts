import {MouseEvent} from "react";

export interface MenuItem {
  iconClassName?: string;
  iconTitle?: string;
  label: string;
  onClick: (event: MouseEvent) => unknown;
  disabled?: boolean;
}
