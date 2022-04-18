import { memo } from "react";

import {ContentTypeName} from "../../contentType/domain/ContentTypeName";
import * as Styled from "./Sidebar.style";
import {getContentTypePluginByName} from "../../contentType/ContentTypeService";

const UNKNOWN_TYPE_ICON_CLASS = "file-circle-question";
const UNKNOWN_TYPE_TITLE = "Unknown type";

interface Props {
  contentTypeName: ContentTypeName;
}

export const NoteIcon = memo(function ({ contentTypeName }: Props) {
  const contentType = getContentTypePluginByName(contentTypeName);
  const iconClassName = contentType?.iconClassName || UNKNOWN_TYPE_ICON_CLASS;
  const iconTitle = contentType?.name || UNKNOWN_TYPE_TITLE;
  return <Styled.Icon className={"icon " + iconClassName} title={iconTitle} aria-hidden="true" />;
});
