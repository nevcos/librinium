import {ContentTypePlugin} from "../../domain/ContentTypePlugin";
import {textImageCodeFragmentBuilder} from "./textImageCodeFragmentBuilder";
import {ContentTypeName} from "../../domain/ContentTypeName";
import {NoteContent} from "../../../domain/note/NoteContent";

export default <ContentTypePlugin> {
  name: "Text" as ContentTypeName,
  iconClassName: "fa-solid fa-file",
  // "" matches everything
  fileExtensions: ["txt"],
  codeMirrorMode: "null",
  imageCodeFragmentBuilder: textImageCodeFragmentBuilder,
  emptyTemplate: () => "New text" as NoteContent
}
