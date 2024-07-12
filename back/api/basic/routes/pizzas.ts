import { Router } from "express";

import path from "node:path";
import { NewPizza, Pizza, PizzaToUpdate } from "../types";
import { serialize, parse } from "../utils/json";

const router = Router();

const jsonDbPath = path.join(__dirname, "/../data/pizzas.json");

const defaultPizzas: Pizza[] = [
  {
    id: 1,
    title: "4 fromages",
    content: "Gruyère, Sérac, Appenzel, Gorgonzola, Tomates",
  },
  {
    id: 2,
    title: "Vegan",
    content: "Tomates, Courgettes, Oignons, Aubergines, Poivrons",
  },
  {
    id: 3,
    title: "Vegetarian",
    content: "Mozarella, Tomates, Oignons, Poivrons, Champignons, Olives",
  },
  {
    id: 4,
    title: "Alpage",
    content: "Gruyère, Mozarella, Lardons, Tomates",
  },
  {
    id: 5,
    title: "Diable",
    content: "Tomates, Mozarella, Chorizo piquant, Jalapenos",
  },
];

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

  const orderByTitle =
    typeof req.query.order === "string" && req.query.order.includes("title")
      ? req.query.order
      : undefined;
  let orderedMenu: Pizza[] = [];
  const pizzas = parse(jsonDbPath, defaultPizzas);
  if (orderByTitle)
    orderedMenu = [...pizzas].sort((a, b) => a.title.localeCompare(b.title));

  if (orderByTitle === "-title") orderedMenu = orderedMenu.reverse();

  return res.json(orderedMenu.length === 0 ? pizzas : orderedMenu);
});

// Read the pizza identified by an id in the menu
router.get("/:id", (req, res) => {
  const pizzas = parse(jsonDbPath, defaultPizzas);
  const idInRequest = parseInt(req.params.id, 10);
  const indexOfPizzaFound = pizzas.findIndex(
    (pizza: Pizza) => pizza.id === idInRequest
  );

  if (indexOfPizzaFound < 0) return res.sendStatus(404);

  return res.json(pizzas[indexOfPizzaFound]);
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

  const pizzas = parse(jsonDbPath, defaultPizzas);
  // Use reduce() to find the highest id in the pizzas array
  const nextId =
    pizzas.reduce((maxId, pizza) => (pizza.id > maxId ? pizza.id : maxId), 0) +
    1; // 0 is the initial value of maxId

  const addedPizza: Pizza = {
    id: nextId,
    title,
    content,
  };

  pizzas.push(addedPizza);

  serialize(jsonDbPath, pizzas);

  return res.json(addedPizza);
});

// Delete a pizza from the menu based on its id
router.delete("/:id", (req, res) => {
  const pizzas = parse(jsonDbPath, defaultPizzas);
  console.log("delete operation requested on ", pizzas);
  const idInRequest = parseInt(req.params.id, 10);
  const foundIndex = pizzas.findIndex((pizza) => pizza.id === idInRequest);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromMenu = pizzas.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];

  serialize(jsonDbPath, pizzas);

  return res.json(itemRemoved);
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

  const pizzas = parse(jsonDbPath, defaultPizzas);
  const idInRequest = parseInt(req.params.id, 10);
  const foundIndex = pizzas.findIndex((pizza) => pizza.id === idInRequest);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedPizza: Pizza = { ...pizzas[foundIndex], ...pizzaToUpdate };

  pizzas[foundIndex] = updatedPizza;

  serialize(jsonDbPath, pizzas);

  return res.json(updatedPizza);
});

export default router;
