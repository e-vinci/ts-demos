import express from "express";

const router = express.Router();

/* GET users listing. */
router.get("/", (_req, res) => {
  res.json({ users: [{ name: "e-baron" }] });
});

export default router;
