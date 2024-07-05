import { Request, Router } from "express";
import { AuthenticatedUser, PotentialUser } from "../types";
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

  createCookieSessionData(req, authenticatedUser);

  return res.json({ username: authenticatedUser.username });
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

  createCookieSessionData(req, authenticatedUser);

  return res.json({ username: authenticatedUser.username });
});

/* Logout a user */
router.get("/logout", (req, res) => {
  req.session = null;
  return res.sendStatus(200);
});

function createCookieSessionData(
  req: Request,
  authenticatedUser: AuthenticatedUser
) {
  if (!req.session) {
    return;
  }
  req.session.username = authenticatedUser.username;
  req.session.token = authenticatedUser.token;
}

export default router;
