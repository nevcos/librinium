const SCALE_STEP = .001;
const SCALE_MIN = .2;
const SCALE_MAX = 5;

export function useZoomable() {
  let destroy: () => unknown;

  function initZoomable(container: HTMLElement) {
    let scale = 1;
    const element = container.children[0] as HTMLElement;

    function onPreviewWheel(event: WheelEvent) {
      if (!event.ctrlKey || !element) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      scale += - event.deltaY * SCALE_STEP;
      scale = Math.min(Math.max(SCALE_MIN, scale), SCALE_MAX);
      element.style.transform = `scale(${scale})`;
    }

    destroy?.();
    // By default react `wheel` event is passive, which doesn't allow to prevent or stop propagation, so it's required
    // to set the listener this way
    // @see https://stackoverflow.com/a/67258046/198787
    container.addEventListener("wheel", onPreviewWheel, {passive: false, capture: true});
    destroy = () => container.removeEventListener("wheel", onPreviewWheel);
  }

  return {initZoomable};
}
