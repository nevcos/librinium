import {ImageDescriptor} from "../../../domain/image/Image";
import {CodeFragment} from "../../domain/ContentTypePlugin";

/**
 * Formats image to `<img:https://goo.gl/cat.png{scale=0.5}>`
 */
export function plantUMLImageCodeFragmentCodeBuilder(image: ImageDescriptor): CodeFragment {
  const code = `<img:${image.src}{scale=1}>`;
  return {
    code,
    selectionColumnStart: 0,
    selectionColumnEnd: code.length
  };
}
