/**
 * ViteJS SVG imports return the URL, but Jest just processes SVG files as JS
 * This module returns a static string to match ViteJS behavior
 * @see https://stackoverflow.com/a/46810154/198787
 */
export default {
    process() {
      return "module.exports = {};";
    },
    getCacheKey() {
      return "string";
    }
  };
