import { useState } from "react";
import sound from "../../assets/sounds/Infecticide-11-Pizza-Spinoza.mp3";
import DrinkMenu from "./DrinkMenu";
import PizzaMenu from "./PizzaMenu";
import { NewPizza, Pizza, Drink} from "../../types";
import AddPizza from "./AddPizza";
import AudioPlayer from "./AudioPlayer";
import { Container, Typography } from "@mui/material";

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

const drinks: Drink[] = [
  {
    title: "Coca-Cola",
    image:
      "https://media.istockphoto.com/id/1289738725/fr/photo/bouteille-en-plastique-de-coke-avec-la-conception-et-le-chapeau-rouges-d%C3%A9tiquette.jpg?s=1024x1024&w=is&k=20&c=HBWfROrGDTIgD6fuvTlUq6SrwWqIC35-gceDSJ8TTP8=",
    volume: "Volume: 33cl",
    price: "2,50 €",
  },
  {
    title: "Pepsi",
    image:
      "https://media.istockphoto.com/id/185268840/fr/photo/bouteille-de-cola-sur-un-fond-blanc.jpg?s=1024x1024&w=is&k=20&c=xdsxwb4bLjzuQbkT_XvVLyBZyW36GD97T1PCW0MZ4vg=",
    volume: "Volume: 33cl",
    price: "2,50 €",
  },
  {
    title: "Eau Minérale",
    image:
      "https://media.istockphoto.com/id/1397515626/fr/photo/verre-deau-gazeuse-%C3%A0-boire-isol%C3%A9.jpg?s=1024x1024&w=is&k=20&c=iEjq6OL86Li4eDG5YGO59d1O3Ga1iMVc_Kj5oeIfAqk=",
    volume: "Volume: 50cl",
    price: "1,50 €",
  },
];

interface MainProps {
  actionToBePerformed: boolean;
  clearActionToBePerformed: () => void;
}

const Main = ({ actionToBePerformed, clearActionToBePerformed }: MainProps) => {
  const [pizzas, setPizzas] = useState(defaultPizzas);

  const addPizza = (newPizza: NewPizza) => {
    const pizzaAdded = { ...newPizza, id: nextPizzaId(pizzas) };
    setPizzas([...pizzas, pizzaAdded]);
  };

  return (
    <Container component="main" sx={{ mt: 8, mb: 2, flex: "1" }} maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        My HomePage
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Because we love JS, you can also click on the header to stop / start the
        music ; )
      </Typography>
      <AudioPlayer
        sound={sound}
        actionToBePerformed={actionToBePerformed}
        clearActionToBePerformed={clearActionToBePerformed}
      />

      <PizzaMenu pizzas={pizzas} />

      <AddPizza addPizza={addPizza} />

      <DrinkMenu title="Notre Menu de Boissons" drinks={drinks} />
    </Container>
  );
};

const nextPizzaId = (pizzas: Pizza[]) => {
  return pizzas.reduce((maxId, pizza) => Math.max(maxId, pizza.id), 0) + 1;
};

export default Main;
