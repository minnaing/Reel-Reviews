import path from "path";

export const fallback = (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
};
