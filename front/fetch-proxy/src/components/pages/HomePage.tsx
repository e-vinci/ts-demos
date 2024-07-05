import sound from "../../assets/sounds/Infecticide-11-Pizza-Spinoza.mp3";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import PizzaMenu from "../PizzaMenu";
import DrinkMenu from "../DrinkMenu";
import { useOutletContext } from "react-router-dom";
import { PizzeriaContext } from "../../types";

const HomePage = () => {
  const {
    actionToBePerformed,
    clearActionToBePerformed,
    pizzas,
    drinks,
  }: PizzeriaContext = useOutletContext();

  return (
    <>
      <h1>Ma Pizzeria</h1>
      <p>
        Parce que nous aimons le JS/TS, vous pouvez cliquer sur le header pour
        démarrer / stopper la musique ; )
      </p>
      <AudioPlayer
        sound={sound}
        actionToBePerformed={actionToBePerformed}
        clearActionToBePerformed={clearActionToBePerformed}
      />

      <PizzaMenu pizzas={pizzas} />

      <DrinkMenu title="Nos boissons" drinks={drinks} />
    </>
  );
};

export default HomePage;
