import { useState} from "react";

export function useDraggable() {
  let destroy: () => unknown;
  const [isDragging, setDragging] = useState(false);

  function initDraggable(container: HTMLElement) {
    const position = {x: 0, y: 0};
    const element = container.children[0] as HTMLElement;

    function onMouseDown(event:MouseEvent) {
      // event.preventDefault();
      setDragging(true);
      position.x = event.clientX;
      position.y = event.clientY;
      window.addEventListener("mouseup", onMouseUp, { once: true });
      window.addEventListener("mousemove", onMouseMove);
    }

    function onMouseUp(event: MouseEvent) {
      event.preventDefault();
      setDragging(false);
      window.removeEventListener("mousemove", onMouseMove);
    }

    function onMouseMove(event: MouseEvent) {
      event.preventDefault();
      if (!element) return;

      const deltaX = position.x - event.clientX;
      const deltaY = position.y - event.clientY;
      position.x = event.clientX;
      position.y = event.clientY;
      element.style.top = (element.offsetTop - deltaY) + "px";
      element.style.left = (element.offsetLeft - deltaX) + "px";
    }

    destroy?.();
    container.addEventListener("mousedown", onMouseDown);
    destroy = () => container.removeEventListener("mousedown", onMouseDown);
  }

  return {isDragging, initDraggable};
}
