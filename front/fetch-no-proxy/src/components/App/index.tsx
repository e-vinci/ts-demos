import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "../Footer";
import Header from "../Header";
import { Drink, NewPizza, Pizza, PizzeriaContext } from "../../types";
import NavBar from "../Navbar";

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

const App = () => {
  const [actionToBePerformed, setActionToBePerformed] = useState(false);
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/pizzas")
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `fetch error : ${response.status} : ${response.statusText}`
          );
        return response.json();
      })
      .then((pizzas) => setPizzas(pizzas))
      .catch((err) => {
        console.error("HomePage::error: ", err);
      });
  }, []);

  const addPizza = (newPizza: NewPizza) => {
    const pizzaAdded = { ...newPizza, id: nextPizzaId(pizzas) };
    setPizzas([...pizzas, pizzaAdded]);
  };

  const handleHeaderClick = () => {
    setActionToBePerformed(true);
  };

  const clearActionToBePerformed = () => {
    setActionToBePerformed(false);
  };

  const fullPizzaContext: PizzeriaContext = {
    addPizza,
    pizzas,
    setPizzas,
    actionToBePerformed,
    setActionToBePerformed,
    clearActionToBePerformed,
    drinks,
  };

  return (
    <div className="page">
      <Header
        title="We love Pizza"
        version={0 + 1}
        handleHeaderClick={handleHeaderClick}
      />
      <main>
        <NavBar />
        <Outlet context={fullPizzaContext} />
      </main>
      <Footer />
    </div>
  );
};

const nextPizzaId = (pizzas: Pizza[]) => {
  const ids = pizzas.map((pizza) => pizza.id);
  return Math.max(...ids) + 1;
};

export default App;
