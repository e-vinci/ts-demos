import { Router } from "express";
import path from "node:path";
import { Drink, NewDrink } from "../types";
import { parse, serialize } from "../utils/json";
const jsonDbPath = path.join(__dirname, "/../data/drinks.json");

const defaultDrinks: Drink[] = [
  {
    id: 1,
    title: "Coca-Cola",
    image:
      "https://media.istockphoto.com/id/1289738725/fr/photo/bouteille-en-plastique-de-coke-avec-la-conception-et-le-chapeau-rouges-d%C3%A9tiquette.jpg?s=1024x1024&w=is&k=20&c=HBWfROrGDTIgD6fuvTlUq6SrwWqIC35-gceDSJ8TTP8=",
    volume: 0.33,
    price: 2.5,
  },
  {
    id: 2,
    title: "Pepsi",
    image:
      "https://media.istockphoto.com/id/185268840/fr/photo/bouteille-de-cola-sur-un-fond-blanc.jpg?s=1024x1024&w=is&k=20&c=xdsxwb4bLjzuQbkT_XvVLyBZyW36GD97T1PCW0MZ4vg=",
    volume: 0.33,
    price: 2.5,
  },
  {
    id: 3,
    title: "Eau Minérale",
    image:
      "https://media.istockphoto.com/id/1397515626/fr/photo/verre-deau-gazeuse-%C3%A0-boire-isol%C3%A9.jpg?s=1024x1024&w=is&k=20&c=iEjq6OL86Li4eDG5YGO59d1O3Ga1iMVc_Kj5oeIfAqk=",
    volume: 0.5,
    price: 1.5,
  },
  {
    id: 4,
    title: "Jus d'Orange",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    volume: 0.25,
    price: 4.5,
  },
  {
    id: 5,
    title: "Limonade",
    image:
      "https://images.unsplash.com/photo-1583064313642-a7c149480c7e?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    volume: 0.33,
    price: 5,
  },
];

const router = Router();

router.get("/", (req, res) => {
  const drinks = parse(jsonDbPath, defaultDrinks);
  if (!req.query["budget-max"]) {
    // Cannot call req.query.budget-max as "-" is an operator
    return res.json(drinks);
  }
  const budgetMax = Number(req.query["budget-max"]);
  const filteredDrinks = drinks.filter((drink) => {
    return drink.price <= budgetMax;
  });
  return res.json(filteredDrinks);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const drinks = parse(jsonDbPath, defaultDrinks);
  const drink = drinks.find((drink) => drink.id === id);
  if (!drink) {
    return res.sendStatus(404);
  }
  return res.json(drink);
});

router.post("/", (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("image" in body) ||
    !("volume" in body) ||
    !("price" in body) ||
    typeof body.title !== "string" ||
    typeof body.image !== "string" ||
    typeof body.volume !== "number" ||
    typeof body.price !== "number" ||
    !body.title.trim() ||
    !body.image.trim() ||
    body.volume <= 0 ||
    body.price <= 0
  ) {
    return res.sendStatus(400);
  }

  const { title, image, volume, price } = body as NewDrink;

  const drinks = parse(jsonDbPath, defaultDrinks);

  const nextId =
    drinks.reduce((maxId, drink) => (drink.id > maxId ? drink.id : maxId), 0) +
    1;

  const newDrink: Drink = {
    id: nextId,
    title,
    image,
    volume,
    price,
  };

  drinks.push(newDrink);
  serialize(jsonDbPath, drinks);
  return res.json(newDrink);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const drinks = parse(jsonDbPath, defaultDrinks);
  const index = drinks.findIndex((drink) => drink.id === id);
  if (index === -1) {
    return res.sendStatus(404);
  }
  const deletedElements = drinks.splice(index, 1); // splice() returns an array of the deleted elements
  serialize(jsonDbPath, drinks);
  return res.json(deletedElements[0]);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const drinks = parse(jsonDbPath, defaultDrinks);
  const drink = drinks.find((drink) => drink.id === id);
  if (!drink) {
    return res.sendStatus(404);
  }

  const body: unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    ("title" in body &&
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("image" in body &&
      (typeof body.image !== "string" || !body.image.trim())) ||
    ("volume" in body &&
      (typeof body.volume !== "number" || body.volume <= 0)) ||
    ("price" in body && (typeof body.price !== "number" || body.price <= 0))
  ) {
    return res.sendStatus(400);
  }

  const { title, image, volume, price }: Partial<NewDrink> = body;

  if (title) {
    drink.title = title;
  }
  if (image) {
    drink.image = image;
  }
  if (volume) {
    drink.volume = volume;
  }
  if (price) {
    drink.price = price;
  }

  serialize(jsonDbPath, drinks);

  return res.json(drink);
});

export default router;
