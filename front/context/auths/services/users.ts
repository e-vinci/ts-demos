import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import path from "node:path";
import { parse, serialize } from "../utils/json";
import { AuthenticatedUser, User } from "../types";

const jwtSecret = "ilovemypizza!";
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

const jsonDbPath = path.join(__dirname, "/../data/users.json");

const defaultUsers: User[] = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("admin", saltRounds),
  },
];

async function login(
  username: string,
  password: string
): Promise<AuthenticatedUser | undefined> {
  const userFound = readOneUserFromUsername(username);
  if (!userFound) return undefined;
  const passwordMatch = await bcrypt.compare(password, userFound.password);
  if (!passwordMatch) return undefined;

  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt } // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser: AuthenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

async function register(
  username: string,
  password: string
): Promise<AuthenticatedUser | undefined> {
  const userFound = readOneUserFromUsername(username);
  if (userFound) return undefined;

  await createOneUser(username, password);

  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt } // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser: AuthenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

function readOneUserFromUsername(username: string) {
  const users = parse(jsonDbPath, defaultUsers);
  const userFound = users.find((user) => user.username === username);
  if (!userFound) return undefined;

  return userFound;
}

async function createOneUser(username: string, password: string) {
  const users = parse(jsonDbPath, defaultUsers);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const nextId =
    users.reduce((acc, user) => (user.id > acc ? user.id : acc), 0) + 1;

  const createdUser: User = {
    id: nextId,
    username,
    password: hashedPassword,
  };

  users.push(createdUser);

  serialize(jsonDbPath, users);

  return createdUser;
}

export { login, register, readOneUserFromUsername };
