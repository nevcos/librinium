import type CodeMirror from "codemirror";

import { ImageDescriptor } from "../domain/image/Image";

let codeMirror: CodeMirror.Editor;

export function registerCodeMirrorInstance(cm: CodeMirror.Editor) {
  codeMirror = cm;
}

export function insertImageInEditor(image: ImageDescriptor) {
  if (!codeMirror) throw new Error("No CodeMirror instance");

  const imageDescription = image.alt || "image_description";
  const imageSrc = image.src;
  const imageMarkdown = `![${imageDescription}](${imageSrc})`;

  const selection = codeMirror.getSelection();

  if (selection.length > 0) {
    codeMirror.replaceSelection(imageMarkdown);
  } else {
    const doc = codeMirror.getDoc();
    const cursor = doc.getCursor();

    doc.replaceRange(imageMarkdown, {
      line: cursor.line,
      ch: cursor.ch
    });
  }

  // Select image description
  const cursorPosition = codeMirror.getCursor();
  const lineText = codeMirror.getLine(cursorPosition.line);
  const startCol = lineText.search(imageMarkdown);
  const line = cursorPosition.line;
  const chStart = startCol + 3;
  const chEnd = chStart + imageDescription.length;
  codeMirror.setSelection({line, ch: chStart}, {line, ch: chEnd});

  codeMirror.focus();
}
