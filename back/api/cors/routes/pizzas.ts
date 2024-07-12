import { Router } from "express";

import { NewPizza, PizzaToUpdate } from "../types";
import {
  createPizza,
  deletePizza,
  readAllPizzas,
  readPizzaById,
  updatePizza,
} from "../services/pizzas";

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
  if (req.query.order && typeof req.query.order !== "string") {
    return res.sendStatus(400);
  }

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
router.post("/", (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("content" in body) ||
    typeof body.title !== "string" ||
    typeof body.content !== "string" ||
    !body.title.trim() ||
    !body.content.trim()
  ) {
    return res.sendStatus(400);
  }

  const { title, content } = body as NewPizza;

  const addedPizza = createPizza({ title, content });

  return res.json(addedPizza);
});

// Delete a pizza from the menu based on its id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const deletedPizza = deletePizza(id);
  if (!deletedPizza) return res.sendStatus(404);

  return res.json(deletedPizza);
});

// Update a pizza based on its id and new values for its parameters
router.patch("/:id", (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    ("title" in body &&
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("content" in body &&
      (typeof body.content !== "string" || !body.content.trim()))
  ) {
    return res.sendStatus(400);
  }

  const pizzaToUpdate: PizzaToUpdate = body;

  const id = Number(req.params.id);
  const updatedPizza = updatePizza(id, pizzaToUpdate);
  if (!updatedPizza) return res.sendStatus(404);

  return res.json(updatedPizza);
});

export default router;
