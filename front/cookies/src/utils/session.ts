import { AuthenticatedUser, MaybeAuthenticatedUser } from "../types";

const storeAuthenticatedUser = (authenticatedUser: AuthenticatedUser) => {
  localStorage.setItem("authenticatedUser", JSON.stringify(authenticatedUser));
};

const getAuthenticatedUser = (): MaybeAuthenticatedUser => {
  const authenticatedUser = localStorage.getItem("authenticatedUser");

  if (!authenticatedUser) return undefined;

  return JSON.parse(authenticatedUser);
};

const clearAuthenticatedUser = () => {
  localStorage.removeItem("authenticatedUser");
};

export { storeAuthenticatedUser, getAuthenticatedUser, clearAuthenticatedUser };
