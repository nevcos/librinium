import { useRef } from "react";

/**
 * Keep the same value since start, similar to FluentUI `useConst`
 */
export function useConst<T>(value: T | (() => T)): T {
  const ref = useRef<{ value: T }>();
  if (ref.current === undefined) {
    ref.current = {
      value: typeof value === "function" ? (value as Function)() : value
    };
  }
  return ref.current.value;
}
