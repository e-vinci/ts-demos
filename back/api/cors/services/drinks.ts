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

function readAllDrinks(budgetMax: number): Drink[] {
  const drinks = parse(jsonDbPath, defaultDrinks);
  if (!budgetMax) {
    return drinks;
  }

  const budgetMaxNumber = Number(budgetMax);

  const filteredDrinks = drinks.filter((drink) => {
    return drink.price <= budgetMaxNumber;
  });
  return filteredDrinks;
}

function readOneDrink(id: number): Drink | undefined {
  const drinks = parse(jsonDbPath, defaultDrinks);
  const drink = drinks.find((drink) => drink.id === id);
  if (!drink) {
    return undefined;
  }
  return drink;
}

function createOneDrink(newDrink: NewDrink): Drink {
  const drinks = parse(jsonDbPath, defaultDrinks);

  const nextId =
    drinks.reduce((maxId, drink) => (drink.id > maxId ? drink.id : maxId), 0) +
    1;

  const createdDrink = {
    id: nextId,
    ...newDrink,
  };

  drinks.push(createdDrink);
  serialize(jsonDbPath, drinks);

  return createdDrink;
}

function deleteOneDrink(drinkId: number): Drink | undefined {
  const drinks = parse(jsonDbPath, defaultDrinks);
  const index = drinks.findIndex((drink) => drink.id === drinkId);
  if (index === -1) {
    return undefined;
  }

  const deletedElements = drinks.splice(index, 1);
  serialize(jsonDbPath, drinks);
  return deletedElements[0];
}

function updateOneDrink(
  drinkId: number,
  newDrink: Partial<NewDrink>
): Drink | undefined {
  const drinks = parse(jsonDbPath, defaultDrinks);
  const drink = drinks.find((drink) => drink.id === drinkId);
  if (!drink) {
    return undefined;
  }

  if (newDrink.title !== undefined) {
    drink.title = newDrink.title!; // the router already checks for the presence of title
  }
  if (newDrink.image !== undefined) {
    drink.image = newDrink.image!;
  }
  if (newDrink.volume !== undefined) {
    drink.volume = newDrink.volume!;
  }
  if (newDrink.price !== undefined) {
    drink.price = newDrink.price!;
  }

  serialize(jsonDbPath, drinks);
  return drink;
}

export {
  readAllDrinks,
  readOneDrink,
  createOneDrink,
  deleteOneDrink,
  updateOneDrink,
};
