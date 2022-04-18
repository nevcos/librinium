import {keyBy} from "lodash";

import {ContentTypePlugin} from "./domain/ContentTypePlugin";

import markdownPlugin from "./plugins/markdown";
import plantUMLPlugin from "./plugins/plantUML";
import remarkJSPlugin from "./plugins/remarkJS";
import textPlugin from "./plugins/text";
import {ContentTypeName} from "./domain/ContentTypeName";
import {NoteName} from "../domain/note/NoteName";

export const contentTypes: ContentTypePlugin[] = [
  markdownPlugin,
  plantUMLPlugin,
  remarkJSPlugin,
  textPlugin
];

const defaultContentType = textPlugin;

const contentTypesByName = keyBy(contentTypes, ct => ct.name);
export function getContentTypePluginByName(name: ContentTypeName | undefined): ContentTypePlugin | undefined {
  if (!name) return undefined;
  return contentTypesByName[name];
}

const contentTypesByCodeMirrorMode = keyBy(contentTypes, ct => ct.codeMirrorMode);
export function getContentTypePluginByCodeMirrorMode(codeMirrorMode: string): ContentTypePlugin | undefined {
  if (!codeMirrorMode) return undefined;
  return contentTypesByCodeMirrorMode[codeMirrorMode];
}

export function getContentTypePluginByNoteName(noteName: NoteName | undefined): ContentTypePlugin | undefined {
  if (!noteName) return undefined;
  return contentTypes.find(ct => {
    return !! ct.fileExtensions.find(ext => noteName.endsWith(`.${ext}`));
  });
}

export function determineContentTypeName(noteName: NoteName): ContentTypeName {
  const compatibleContentType = getContentTypePluginByNoteName(noteName);
  return compatibleContentType?.name || defaultContentType.name;
}
