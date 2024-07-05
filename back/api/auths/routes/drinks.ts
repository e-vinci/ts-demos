import { Router } from "express";
import { NewDrink } from "../types";
import {
  createOneDrink,
  deleteOneDrink,
  readAllDrinks,
  readOneDrink,
  updateOneDrink,
} from "../services/drinks";
import { authorize, isAdmin } from "../utils/auths";

const router = Router();

router.get("/", (req, res) => {
  const budgetMax = Number(req.query["budget-max"]);
  const drinks = readAllDrinks(budgetMax);
  return res.json(drinks);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const drink = readOneDrink(id);
  if (!drink) {
    return res.sendStatus(404);
  }
  return res.json(drink);
});

router.post("/", authorize, isAdmin, (req, res) => {
  const { title, image, volume, price } = req.body as NewDrink;

  if (
    !title ||
    !image ||
    !volume ||
    !price ||
    typeof title !== "string" ||
    typeof image !== "string" ||
    typeof volume !== "number" ||
    typeof price !== "number" ||
    !title.trim() ||
    !image.trim() ||
    volume <= 0 ||
    price <= 0
  ) {
    return res.sendStatus(400);
  }

  const newDrink = createOneDrink({ title, image, volume, price });
  return res.json(newDrink);
});

router.delete("/:id", authorize, isAdmin, (req, res) => {
  const id = Number(req.params.id);
  const deletedDrink = deleteOneDrink(id);
  if (!deletedDrink) {
    return res.sendStatus(404);
  }
  return res.json(deletedDrink);
});

router.patch("/:id", authorize, isAdmin, (req, res) => {
  const id = Number(req.params.id);

  const { title, image, volume, price } = req.body as Partial<NewDrink>;

  if (
    (title !== undefined && (typeof title !== "string" || !title.trim())) ||
    (image !== undefined && (typeof image !== "string" || !image.trim())) ||
    (volume !== undefined && (typeof volume !== "number" || volume <= 0)) ||
    (price !== undefined && (typeof price !== "number" || price <= 0))
  ) {
    return res.sendStatus(400);
  }

  const updatedDrink = updateOneDrink(id, { title, image, volume, price });

  if (!updatedDrink) {
    return res.sendStatus(404);
  }

  return res.json(updatedDrink);
});

export default router;
