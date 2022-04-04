/**
 * window.prompt is not supported
 */
// @ts-ignore
document.prompt = () => {
    return "dummy";
}
