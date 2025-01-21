import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { UserContextType } from '../../types';

const NavBar = () => {
  const { authenticatedUser, clearUser } =
    useContext<UserContextType>(UserContext);
  const navigate = useNavigate();

  if (authenticatedUser) {
    return (
      <nav>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/add-pizza')}>
          Ajouter une pizza
        </button>
        <button onClick={() => clearUser()}>Se déconnecter</button>
        <p>Hello dear {authenticatedUser.username}</p>
      </nav>
    );
  }

  return (
    <nav>
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate('/register')}>
        Créer un utilisateur
      </button>
      <button onClick={() => navigate('/login')}>Se connecter</button>
    </nav>
  );
};

export default NavBar;
