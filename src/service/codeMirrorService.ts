import type CodeMirror from "codemirror";

import { ImageDescriptor } from "../domain/image/Image";
import {marked} from "marked";

type CodeFragment = {code: string, selectionColumnStart: number, selectionColumnEnd: number};

let codeMirror: CodeMirror.Editor;

export function registerCodeMirrorInstance(cm: CodeMirror.Editor) {
  codeMirror = cm;
}

export function insertImageInEditor(image: ImageDescriptor): void {
  if (!codeMirror) throw new Error("No CodeMirror instance");
  const doc = codeMirror.getDoc();

  const fragment = buildImageCodeFragment(image);
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

function buildImageCodeFragment(image: ImageDescriptor): CodeFragment {
  const name = codeMirror.getMode().name;
  switch (name) {
    case "markdown":
      return buildMarkdownImageCodeFragment(image);
    case "plantuml":
      return buildPlantUMLImageCodeFragment(image);
    default:
      return buildDefaultImageCodeFragment(image);
  }
}

/**
 * Build markdown image code, example:
 *   ![A cat](https://goo.gl/cat.png)
 */
function buildMarkdownImageCodeFragment(image: ImageDescriptor): CodeFragment {
  const imageDescription = image.alt || "image_description";
  const imageSrc = image.src;
  const code = `![${imageDescription}](${imageSrc})`;
  const selectionColumnStart = 2;
  const selectionColumnEnd = 2 + imageDescription.length;
  return {
    code,
    selectionColumnStart,
    selectionColumnEnd
  };
}

/**
 * Build PlantUML image code, example:
 *   <img:https://goo.gl/cat.png{scale=0.5}>
 */
function buildPlantUMLImageCodeFragment(image: ImageDescriptor): {code: string, selectionColumnStart: number, selectionColumnEnd: number} {
  const code = `<img:${image.src}{scale=1}>`;
  return {
    code,
    selectionColumnStart: 0,
    selectionColumnEnd: code.length
  };
}

function buildDefaultImageCodeFragment(image: ImageDescriptor) {
  const code = image.src;
  return {
    code,
    selectionColumnStart: 0,
    selectionColumnEnd: code.length
  };
}
