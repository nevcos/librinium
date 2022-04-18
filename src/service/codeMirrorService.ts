import type CodeMirror from "codemirror";

import { ImageDescriptor } from "../domain/image/Image";
import {
  getContentTypePluginByCodeMirrorMode
} from "../contentType/ContentTypeService";

let codeMirror: CodeMirror.Editor;

export function registerCodeMirrorInstance(cm: CodeMirror.Editor) {
  codeMirror = cm;
}

export function insertImageInEditor(image: ImageDescriptor): void {
  if (!codeMirror) throw new Error("No CodeMirror instance");
  const doc = codeMirror.getDoc();
  const codeMirrorMode = doc.getMode()?.name || "null";

  const contentTypePlugin = getContentTypePluginByCodeMirrorMode(codeMirrorMode);
  if (!contentTypePlugin?.imageCodeFragmentBuilder) return;

  const fragment = contentTypePlugin.imageCodeFragmentBuilder?.(image);
  const selection = doc.getSelection();
  const startCursor = doc.getCursor();

  if (selection.length > 0) {
    codeMirror.replaceSelection(fragment.code);
  } else {
    doc.replaceRange(fragment.code, {
      line: startCursor.line,
      ch: startCursor.ch
    });
  }

  // Select image description
  const line = startCursor.line;
  const chStart = startCursor.ch + fragment.selectionColumnStart;
  const chEnd = startCursor.ch + fragment.selectionColumnEnd;
  doc.setSelection({line, ch: chStart}, {line, ch: chEnd});

  codeMirror.focus();
}
