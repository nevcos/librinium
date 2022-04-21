import { useActiveNote } from "../shared/useActiveNote";
import { getContentTypePluginByName } from "../../contentType/ContentTypeService";
import { PreviewMode } from "../../contentType/domain/ContentTypePlugin";
import { ContentMixedPreview } from "./ContentMixedPreview";
import { ContentSplitPreview } from "./ContentSplitPreview";
import {CodeEditor} from "../codeEditor/CodeEditor";

export function Content(): JSX.Element {
  const { note } = useActiveNote();
  if (!note) return <></>;

  const contentTypePlugin = getContentTypePluginByName(note.type);
  const preview = contentTypePlugin?.previewModes ? contentTypePlugin.previewModes[0] : PreviewMode.NONE;

  switch (preview) {
    case PreviewMode.MIXED:
      return <ContentMixedPreview />;
    case PreviewMode.SPLIT:
      return <ContentSplitPreview />;
    case PreviewMode.NONE:
    default:
      return <CodeEditor />;
  }
}
