import {RefObject, useCallback, useEffect, useState} from "react";

let pos3 = 0;
let pos4 = 0;

export function useDraggable(container: RefObject<HTMLDivElement | null>, element: RefObject<HTMLDivElement | null>) {
  const [isDragging, setDragging] = useState(false);

  const onMouseDown = useCallback((event) => {
    event.preventDefault();
    setDragging(true);
    pos3 = event.clientX;
    pos4 = event.clientY;
    window.addEventListener("mouseup", onMouseUp, { once: true });
    window.addEventListener("mousemove", onMouseMove);
  }, []);

  const onMouseUp = useCallback((event) => {
    event.preventDefault();
    setDragging(false);
    window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const onMouseMove = useCallback((event) => {
    console.log("onPreviewMouseMove");
    event.preventDefault();
    if (!element.current) return;

    // calculate the new cursor position:
    const pos1 = pos3 - event.clientX;
    const pos2 = pos4 - event.clientY;
    pos3 = event.clientX;
    pos4 = event.clientY;
    element.current.style.top = (element.current.offsetTop - pos2) + "px";
    element.current.style.left = (element.current.offsetLeft - pos1) + "px";
  }, []);

  useEffect(() => {
    container.current?.addEventListener("mousedown", onMouseDown);
    () => container.current?.removeEventListener("mousedown", onMouseDown);
  }, [onMouseDown])

  return [isDragging];
}
