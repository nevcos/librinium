import {ImageDescriptor} from "../../../domain/image/Image";
import {CodeFragment} from "../../domain/ContentTypePlugin";

/**
 * Formats image to `![A cat](https://goo.gl/cat.png)`
 */
export function markdownImageCodeFragmentBuilder(image: ImageDescriptor): CodeFragment {
  const imageDescription = image.alt || "image_description";
  const imageSrc = image.src;
  const code = `![${imageDescription}](${imageSrc})`;
  const selectionColumnStart = 2;
  const selectionColumnEnd = 2 + imageDescription.length;
  return {
    code,
    selectionColumnStart,
    selectionColumnEnd
  };
}
