import {MFWebComponentModule} from "./model/MicroFrontendWebComponentModule";

const microFrontendShellModeEnabled = "___microFrontendShellModeEnabled";

export function isMFShellModeEnabled(): boolean {
  // @ts-ignore
  return !! window[microFrontendShellModeEnabled];
}

export function enableMicroFrontendShellMode(): void {
  // @ts-ignore
  window[microFrontendShellModeEnabled] = true;
}

export function mountMFModule(container: HTMLElement, name: string, MFWebComponentModuleType: Type<MFWebComponentModule>): void {
  customElements.define(name, MFWebComponentModuleType);
  const instance = new MFWebComponentModuleType();
  container.append(instance);
}
