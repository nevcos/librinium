import {ContentTypePlugin} from "../../domain/ContentTypePlugin";
import {RemarkJSPreviewComponent} from "./RemarkJSPreviewComponent";
import {markdownImageCodeFragmentBuilder} from "../markdown/markdownImageCodeFragmentBuilder";
import {ContentTypeName} from "../../domain/ContentTypeName";
import {NoteContent} from "../../../domain/note/NoteContent";

export const RemarkContentTypeName = "RemarkJS" as ContentTypeName;

export default <ContentTypePlugin> {
  name: RemarkContentTypeName,
  iconClassName: "fa-solid fa-chalkboard",
  docsUrl: "https://github.com/gnab/remark/wiki/Markdown",
  fileExtensions: ["rmd"],
  codeMirrorMode: "markdown",
  previewComponent: RemarkJSPreviewComponent,
  imageCodeFragmentBuilder: markdownImageCodeFragmentBuilder,
  emptyTemplate: () => `# Slide 1\n* Veni\n* Vidi\* Vici\n---\n# Slide 2` as NoteContent,
}
