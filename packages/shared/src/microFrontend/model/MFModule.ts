import {MFEvent} from "./MFEvent";

export interface MFModule extends HTMLElement {
  connectedCallback(): void;
  disconnectedCallback(): void;
  dispatchEvent(event: MFEvent<unknown>): boolean;
  onEvent?(event: MFEvent<unknown>): void;
}
