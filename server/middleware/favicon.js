import path from "path";
import favicon from "serve-favicon";

export const faviconMiddleware = favicon(path.join(__dirname, "../../public", "favicon.ico"));
