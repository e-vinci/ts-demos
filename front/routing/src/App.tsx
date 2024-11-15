import { Link, Outlet, useMatch, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/about")}>About</button>
      <button onClick={() => navigate("/contact")}> Contact</button>
    </nav>
  );
};

const HomePage = () => <p>Home Page</p>;
const AboutPage = () => (
  <div>
    <h1>About Page</h1>
    <h2>Authors:</h2>
    {users.map((user) => (
      <Link key={user.id} to={`/users/${user.id}`} style={{ display: "block" }}>
        {user.name}
      </Link>
    ))}
  </div>
);
const ContactPage = () => <p>Contact Page</p>;

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "234-567-8901",
  },
  {
    id: 3,
    name: "James Brown",
    email: "james.brown@example.com",
    phone: "345-678-9012",
  },
];

const UserPage = () => {
  const match = useMatch("/users/:userId");
  const userId = match?.params.userId;
  if (!userId) return <p>User not found</p>;

  const user = users.find((user) => user.id.toString() === userId);
  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
};

const App = () => (
  <div>
    <NavBar />
    <Outlet />
  </div>
);

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default App;
export { HomePage, AboutPage, ContactPage, UserPage };
