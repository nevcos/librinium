import {NoteContent} from "../../../domain/note/NoteContent";
import {registerContentTypePlugin} from "../../ContentTypeService";
import {PlantUMLPreviewComponent} from "./PlantUMLPreviewComponent";
import {plantUMLImageCodeFragmentCodeBuilder} from "./plantUMLImageCodeFragmentCodeBuilder";
import {ContentTypeName} from "../../domain/ContentTypeName";

import "./plantUMLCodeMirrorMode";

export const PlantUMLContentTypeName = "PlantUML" as ContentTypeName;

registerContentTypePlugin({
  name: PlantUMLContentTypeName,
  iconClassName: "fa-solid fa-diagram-project",
  docsUrl: "https://plantuml.com/sitemap-language-specification",
  fileExtensions: ["pu"],
  codeMirrorMode: "plantuml",
  previewComponent: PlantUMLPreviewComponent,
  imageCodeFragmentBuilder: plantUMLImageCodeFragmentCodeBuilder,
  emptyTemplate: () => "New->Diagram" as NoteContent
});
