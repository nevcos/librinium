import {useState} from "react";

let lastSequenceId = 0;

export function useGenerateRandomId(prefix?: string): string {
  const [id] = useState<number>(() => lastSequenceId ++);
  return (prefix || "rid-") + id;
}
