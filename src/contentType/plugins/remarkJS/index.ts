import { NoteContent } from "../../../domain/note/NoteContent";
import { ContentTypeName } from "../../domain/ContentTypeName";
import { registerContentTypePlugin } from "../../ContentTypeService";
import { markdownImageCodeFragmentBuilder } from "../markdown/markdownImageCodeFragmentBuilder";
import { RemarkJSPreviewComponent } from "./RemarkJSPreviewComponent";
import { PreviewMode } from "../../domain/ContentTypePlugin";

export const RemarkContentTypeName = "RemarkJS" as ContentTypeName;

registerContentTypePlugin({
  name: RemarkContentTypeName,
  iconClassName: "fa-solid fa-chalkboard",
  docsUrl: "https://github.com/gnab/remark/wiki/Markdown",
  fileExtensions: ["rmd"],
  codeMirrorMode: "markdown",
  previewComponent: RemarkJSPreviewComponent,
  previewModes: [PreviewMode.MIXED, PreviewMode.SPLIT],
  imageCodeFragmentBuilder: markdownImageCodeFragmentBuilder,
  emptyTemplate: () => `# Slide 1\n* Veni\n* Vidi\* Vici\n---\n# Slide 2` as NoteContent
});
