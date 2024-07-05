import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/add-pizza")}>Ajouter une pizza</button>
    </nav>
  );
};

export default NavBar;
