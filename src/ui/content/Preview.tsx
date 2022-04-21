import {getContentTypePluginByName} from "../../contentType/ContentTypeService";
import {useActiveNote} from "../shared/useActiveNote";

export function Preview(): JSX.Element {
  const { note } = useActiveNote();

  const empty = <></>;
  if (!note) return empty;

  const contentType = getContentTypePluginByName(note.type);
  const PreviewComponent = contentType?.previewComponent;
  if (!PreviewComponent) return empty;

  return <PreviewComponent note={note} />;
}
