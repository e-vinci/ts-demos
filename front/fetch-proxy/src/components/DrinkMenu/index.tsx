import { Drink } from "../../types";
import "./DrinkMenu.css";

interface DrinkMenuProps {
  title: string;
  drinks: Drink[];
}

const DrinkMenu = ({ title, drinks }: DrinkMenuProps) => {
  return (
    <div className="wrapper">
      <h2 className="title">{title}</h2>
      <div className="grid-container">
        {drinks.map((drink, index) => (
          <div className="grid-item" key={index}>
            <div className="card">
              <img className="card-media" src={drink.image} alt={drink.title} />
              <div className="card-content">
                <h5 className="card-title">{drink.title}</h5>
                <p className="card-text">{drink.volume}</p>
                <p className="card-text">Prix: {drink.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrinkMenu;
