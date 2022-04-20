import { GistFile } from "./GistFile";

export type GistFileMapPatch = {
  [key: string]: Partial<GistFile>;
};
