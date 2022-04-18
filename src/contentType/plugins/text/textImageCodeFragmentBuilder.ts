import {ImageDescriptor} from "../../../domain/image/Image";
import {CodeFragment} from "../../domain/ContentTypePlugin";

/**
 * Formats image to `https://goo.gl/cat.png`
 */
export function textImageCodeFragmentBuilder(image: ImageDescriptor): CodeFragment {
  const code = image.src;
  return {
    code,
    selectionColumnStart: 0,
    selectionColumnEnd: code.length
  };
}
