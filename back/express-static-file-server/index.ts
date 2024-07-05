import express from "express";

const app = express();

app.use(express.static("public"));

const PORT: number = 7777;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
