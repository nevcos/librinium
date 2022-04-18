import {NoteContent} from "../../../domain/note/NoteContent";
import {ContentTypeName} from "../../domain/ContentTypeName";
import {registerContentTypePlugin} from "../../ContentTypeService";
import {textImageCodeFragmentBuilder} from "./textImageCodeFragmentBuilder";

registerContentTypePlugin({
  isDefault: true,
  name: "Text" as ContentTypeName,
  iconClassName: "fa-solid fa-file",
  // "" matches everything
  fileExtensions: ["txt"],
  codeMirrorMode: "null",
  imageCodeFragmentBuilder: textImageCodeFragmentBuilder,
  emptyTemplate: () => "New text" as NoteContent
});
