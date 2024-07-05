import { Router } from "express";

import { NewPizza, PizzaToUpdate } from "../types";
import { isString } from "../utils/type-guards";
import {
  createPizza,
  deletePizza,
  readAllPizzas,
  readPizzaById,
  updatePizza,
} from "../services/pizzas";
import { authorize, isAdmin } from "../utils/auths";

const router = Router();

router.get("/error", (_req, _res, _next) => {
  throw new Error("This is an error");
  // equivalent of next(new Error("This is an error"));
});

/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get("/", (req, res) => {
  if (req.query.order && !isString(req.query.order)) return res.sendStatus(400);

  const pizzas = readAllPizzas(req.query.order);
  return res.json(pizzas);
});

// Read the pizza identified by an id in the menu
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const pizza = readPizzaById(id);
  if (!pizza) return res.sendStatus(404);
  return res.json(pizza);
});

// Create a pizza to be added to the menu.
router.post("/", authorize, isAdmin, (req, res) => {
  const { title, content } = req.body as NewPizza;

  if (
    !title ||
    !content ||
    !isString(title) ||
    !isString(content) ||
    !title.trim() ||
    !content.trim()
  ) {
    return res.sendStatus(400);
  }

  const addedPizza = createPizza({ title, content });

  return res.json(addedPizza);
});

// Delete a pizza from the menu based on its id
router.delete("/:id", authorize, isAdmin, (req, res) => {
  const id = Number(req.params.id);
  const deletedPizza = deletePizza(id);
  if (!deletedPizza) return res.sendStatus(404);

  return res.json(deletedPizza);
});

// Update a pizza based on its id and new values for its parameters
router.patch("/:id", authorize, isAdmin, (req, res) => {
  const pizzaToUpdate = req.body as PizzaToUpdate;
  const { title, content } = pizzaToUpdate;

  if (
    (!title && !content) ||
    (title !== undefined && (!isString(title) || !title.trim())) ||
    (content !== undefined && (!isString(content) || !content.trim()))
  ) {
    return res.sendStatus(400);
  }

  const id = Number(req.params.id);
  const updatedPizza = updatePizza(id, pizzaToUpdate);
  if (!updatedPizza) return res.sendStatus(404);

  return res.json(updatedPizza);
});

export default router;
