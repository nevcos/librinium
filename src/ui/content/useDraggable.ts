import {RefObject, useCallback, useEffect, useRef, useState} from "react";

export function useDraggable(container: RefObject<HTMLDivElement | null>, element: RefObject<HTMLDivElement | null>) {
  const position = useRef<{x: number, y: number}>({x: 0, y: 0})
  const [isDragging, setDragging] = useState(false);

  const onMouseDown = useCallback((event) => {
    event.preventDefault();
    setDragging(true);
    position.current.x = event.clientX;
    position.current.y = event.clientY;
    window.addEventListener("mouseup", onMouseUp, { once: true });
    window.addEventListener("mousemove", onMouseMove);
  }, []);

  const onMouseUp = useCallback((event) => {
    event.preventDefault();
    setDragging(false);
    window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const onMouseMove = useCallback((event) => {
    event.preventDefault();
    if (!element.current) return;

    const deltaX = position.current.x - event.clientX;
    const deltaY = position.current.y - event.clientY;
    position.current.x = event.clientX;
    position.current.y = event.clientY;
    element.current.style.top = (element.current.offsetTop - deltaY) + "px";
    element.current.style.left = (element.current.offsetLeft - deltaX) + "px";
  }, []);

  useEffect(() => {
    container.current?.addEventListener("mousedown", onMouseDown);
    () => container.current?.removeEventListener("mousedown", onMouseDown);
  }, [onMouseDown])

  return [isDragging];
}
