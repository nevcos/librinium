const SCALE_STEP = .001;
const SCALE_MIN = .2;
const SCALE_MAX = .2;

export function useZoomable() {
  let destroy: () => unknown;

  function initZoomable(element: HTMLElement) {
    let scale = 1;

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
    element.addEventListener("wheel", onPreviewWheel, {passive: false, capture: true});
    destroy = () => element.removeEventListener("wheel", onPreviewWheel);
  }

  return {initZoomable};
}
