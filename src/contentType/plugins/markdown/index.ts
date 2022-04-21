import { NoteContent } from "../../../domain/note/NoteContent";
import { ContentTypeName } from "../../domain/ContentTypeName";
import { registerContentTypePlugin } from "../../ContentTypeService";
import { MarkdownPreviewComponent } from "./MarkdownPreviewComponent";
import { markdownImageCodeFragmentBuilder } from "./markdownImageCodeFragmentBuilder";

import "codemirror/mode/markdown/markdown";
import { PreviewMode } from "../../domain/ContentTypePlugin";

registerContentTypePlugin({
  name: "Markdown" as ContentTypeName,
  iconClassName: "fa-solid fa-file-lines",
  docsUrl: "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet",
  fileExtensions: ["md", "markdown"],
  codeMirrorMode: "markdown",
  previewComponent: MarkdownPreviewComponent,
  previewModes: [PreviewMode.SPLIT],
  imageCodeFragmentBuilder: markdownImageCodeFragmentBuilder,
  emptyTemplate: () => "# New document\n\nVeni, vidi, vici" as NoteContent
});
