import path from "path";

export const staticFiles = [
  express.static(path.join(__dirname, "../../public")),
  express.static(path.join(__dirname, "../../client/build"))
];
