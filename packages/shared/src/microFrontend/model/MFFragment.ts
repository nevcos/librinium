import {MFEvent} from "./MFEvent";

export interface MFFragment extends HTMLElement {
  connectedCallback(): void;
  disconnectedCallback(): void;
  dispatchEvent(event: MFEvent<unknown>): boolean;
  onEvent?(event: MFEvent<unknown>): void;
}
