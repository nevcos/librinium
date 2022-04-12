import {RefObject, useCallback, useEffect} from "react";

let scale = 1;

export function useZoomable(element: RefObject<HTMLDivElement | null>) {

  const onPreviewWheel = useCallback((event) => {
    if (!event.ctrlKey || !element.current) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    scale += event.deltaY * -0.001;
    scale = Math.min(Math.max(.125, scale), 4);
    element.current.style.transform = `scale(${scale})`;
  }, []);

  useEffect(() => {
    // By default react `wheel` event is passive, which doesn't allow to prevent or stop propagation, so it's required
    // to set the listener this way
    // @see https://stackoverflow.com/a/67258046/198787
    element.current?.addEventListener("wheel", onPreviewWheel, {passive: false, capture: true});
    return () => element.current?.removeEventListener("wheel", onPreviewWheel);
  }, [element, onPreviewWheel]);

}
