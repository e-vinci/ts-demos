import { useState } from "react";
import "./Header.css";

interface HeaderProps {
  title: string;
  version: number;
  handleHeaderClick: () => void;
}

const Header = ({ title, handleHeaderClick }: HeaderProps) => {
  const [menuPrinted, setMenuPrinted] = useState(false);

  const handleClick = () => {
    console.log(`value of menuPrinted before click: ${menuPrinted}`);
    setMenuPrinted(!menuPrinted);
    handleHeaderClick();
  };

  return (
    <header onClick={handleClick}>
      <h1 className="animate__animated animate__bounce">
        {menuPrinted ? `${title}... and rarely do we hate it!` : title}
      </h1>
    </header>
  );
};

export default Header;
