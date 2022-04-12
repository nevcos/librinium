import {RefObject, useCallback, useEffect, useRef} from "react";

export function useZoomable(element: RefObject<HTMLDivElement | null>) {
  const scale = useRef<number>(1);

  const onPreviewWheel = useCallback((event) => {
    if (!event.ctrlKey || !element.current) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    scale.current += event.deltaY * -0.001;
    scale.current = Math.min(Math.max(.2, scale.current), 5);
    element.current.style.transform = `scale(${scale.current})`;
  }, []);

  useEffect(() => {
    // By default react `wheel` event is passive, which doesn't allow to prevent or stop propagation, so it's required
    // to set the listener this way
    // @see https://stackoverflow.com/a/67258046/198787
    element.current?.addEventListener("wheel", onPreviewWheel, {passive: false, capture: true});
    return () => element.current?.removeEventListener("wheel", onPreviewWheel);
  }, [element, onPreviewWheel]);

}
