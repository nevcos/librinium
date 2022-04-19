import { memo } from "react";

import { ContentTypeName } from "../../contentType/domain/ContentTypeName";
import { getContentTypePluginByName } from "../../contentType/ContentTypeService";
import { Icon } from "./Icon";

const UNKNOWN_TYPE_ICON_CLASS = "file-circle-question";
const UNKNOWN_TYPE_TITLE = "Unknown type";

interface Props {
  contentTypeName: ContentTypeName;
}

export const NoteIcon = memo(function ({ contentTypeName }: Props) {
  const contentType = getContentTypePluginByName(contentTypeName);
  const props = {
    className: contentType?.iconClassName || UNKNOWN_TYPE_ICON_CLASS,
    title: contentType?.name || UNKNOWN_TYPE_TITLE,
  }
  return <Icon {...props} />;
});
