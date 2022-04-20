import { Gist } from "./Gist";
import { GistFileMapPatch } from "./GistFileMapPatch";

export type GistPatch = Omit<Partial<Gist>, "files"> & { files: GistFileMapPatch };
