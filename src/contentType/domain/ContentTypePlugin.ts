import React from "react";
import {ImageDescriptor} from "../../domain/image/Image";
import {Note} from "../../domain/note/Note";
import {ContentTypeName} from "./ContentTypeName";
import {NoteContent} from "../../domain/note/NoteContent";

export interface CodeFragment {
  code: string,
  selectionColumnStart: number,
  selectionColumnEnd: number
}

export interface ContentTypePlugin {
  isDefault?: boolean;
  name: ContentTypeName,
  description?: string;
  iconClassName?: string;
  docsUrl?: string;
  fileExtensions: string[];
  codeMirrorMode: string;
  imageCodeFragmentBuilder(image: ImageDescriptor): CodeFragment;
  previewComponent?: React.ComponentType<{note: Note}>;
  emptyTemplate?: () => NoteContent;
}
