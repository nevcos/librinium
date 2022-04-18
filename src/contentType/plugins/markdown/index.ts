import {ContentTypePlugin} from "../../domain/ContentTypePlugin";
import {MarkdownPreviewComponent} from "./MarkdownPreviewComponent";
import {markdownImageCodeFragmentBuilder} from "./markdownImageCodeFragmentBuilder";
import {ContentTypeName} from "../../domain/ContentTypeName";

import "codemirror/mode/markdown/markdown";
import {NoteContent} from "../../../domain/note/NoteContent";

export default <ContentTypePlugin> {
  name: "Markdown" as ContentTypeName,
  iconClassName: "fa-solid fa-file-lines",
  docsUrl: "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet",
  fileExtensions: ["md", "markdown"],
  codeMirrorMode: "markdown",
  previewComponent: MarkdownPreviewComponent,
  imageCodeFragmentBuilder: markdownImageCodeFragmentBuilder,
  emptyTemplate: () => "# New document\n\nVeni, vidi, vici" as NoteContent
}
