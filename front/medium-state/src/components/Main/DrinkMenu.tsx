import { ReactElement } from "react";
import DrinkCard from "./DrinkCard";

interface DrinkMenuProps {
  title: string;
  children: ReactElement<typeof DrinkCard> | ReactElement<typeof DrinkCard>[];
}

const DrinkMenu = ({ title, children }: DrinkMenuProps) => {
  return (
    <div className="drink-menu">
      <h4>{title}</h4>
      <div className="drink-items">{children}</div>
    </div>
  );
};

export default DrinkMenu;
