import { GistFile } from "./GistFile";

export interface GistFileMap {
  [key: string]: Partial<GistFile>;
}
