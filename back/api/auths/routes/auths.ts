import { Router } from "express";
import { PotentialUser } from "../types";
import { login, register } from "../services/users";
const router = Router();

/* Register a user */
router.post("/register", async (req, res) => {
  const { username, password } = req.body as PotentialUser;
  if (!username || !password || !username.trim() || !password.trim()) {
    return res.sendStatus(400);
  }

  const authenticatedUser = await register(username, password);

  if (!authenticatedUser) {
    return res.sendStatus(409);
  }

  return res.json(authenticatedUser);
});

/* Login a user */
router.post("/login", async (req, res) => {
  const { username, password } = req.body as PotentialUser;
  if (!username || !password || !username.trim() || !password.trim()) {
    return res.sendStatus(400);
  }

  const authenticatedUser = await login(username, password);

  if (!authenticatedUser) {
    return res.sendStatus(401);
  }

  return res.json(authenticatedUser);
});

export default router;
