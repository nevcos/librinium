import {MFModule} from "./model/MFModule";

const microFrontendShellModeEnabled = "___microFrontendShellModeEnabled";

export function isMFShellModeEnabled(): boolean {
  // @ts-ignore
  return !! window[microFrontendShellModeEnabled];
}

export function enableMicroFrontendShellMode(): void {
  // @ts-ignore
  window[microFrontendShellModeEnabled] = true;
}

export function mountMFModule(container: HTMLElement, name: string, MFModuleType: Type<MFModule>): void {
  customElements.define(name, MFModuleType);
  const instance = new MFModuleType();
  container.append(instance);
}
