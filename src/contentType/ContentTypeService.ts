import {keyBy} from "lodash";

import {ContentTypePlugin} from "./domain/ContentTypePlugin";

import {ContentTypeName} from "./domain/ContentTypeName";
import {NoteName} from "../domain/note/NoteName";

let contentTypes: ContentTypePlugin[] = [];
export function registerContentTypePlugin(plugin: ContentTypePlugin): void {
  contentTypes.push(plugin);
}

export function getDefaultContentTypePlugin(): ContentTypePlugin {
  return contentTypes.find(plugin => plugin.isDefault) || contentTypes[0];
}

export function getContentTypePluginByName(name: ContentTypeName | undefined): ContentTypePlugin | undefined {
  if (!name) return undefined;
  const contentTypesByName = keyBy(contentTypes, ct => ct.name);
  return contentTypesByName[name];
}

export function getContentTypePluginByCodeMirrorMode(codeMirrorMode: string): ContentTypePlugin | undefined {
  if (!codeMirrorMode) return undefined;
  const contentTypesByCodeMirrorMode = keyBy(contentTypes, ct => ct.codeMirrorMode);
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
  return compatibleContentType?.name || getDefaultContentTypePlugin().name;
}
