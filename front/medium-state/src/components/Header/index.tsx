import { useState } from "react";
import "./Header.css";

interface HeaderProps {
  title: string;
  version: number;
}

const Header = ({ title, version }: HeaderProps) => {
  const [menuPrinted, setMenuPrinted] = useState(false);

  const handleClick = () => {
    console.log(`value of menuPrinted before click: ${menuPrinted}`);
    setMenuPrinted(!menuPrinted);
  };

  return (
    <header onClick={handleClick}>
      <h1 className="animate__animated animate__bounce">
        {menuPrinted ? `${title}... and rarely do we hate it!` : title}
      </h1>
      <h4>Version: {version}</h4>
    </header>
  );
};

export default Header;
