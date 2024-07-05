# Routing
# <InternalPageTitle> Introduction </InternalPageTitle>

Lorsqu'on parle d'une IHM, nous souhaitons généralement afficher différents écrans en réagissant aux actions des utilisateurs.

Le routage (ou routing en anglais) est ce qui rend possible l'affichage de différents écrans.

Dans les applications "old school" de type Multi-Page-Application (MPA), pour changer de page, il faudrait :
- Faire un clic sur un élément qui permet de faire une requête HTTP au serveur pour demander un page.
- Le browser fait la requête HTTP de type GET au serveur.
- L'application serveur (le backend) s'occupe du render de l'HTML et le renvoie au browser (le client).
- Le browser affiche cette page.

Dans les applications que nous allons développer dans ce cours, l'architecture est complètement différente. Nous développons des Single-Page-Application (SPA), pour changer de page, il faut simplement :
- De cliquer sur un élément de la page permettant la navigation.
- Le JS exécuté dans le browser s'occupe de créer l'illusion que l'on change de page en faisant lui-même le render de la nouvelle page.
- Si des données sont nécessaires pour afficher la page, le JS exécuté dans le browser s'occupera de faire un "fetch" de celle-ci au format JSON (RESTful API) et générera dynamiquement l'HTML nécessaire.

Ainsi, dans une SPA, une seule page est chargée la toute première fois que l'on accède au serveur : c'est `index.html` et tous les asssets associés (scripts JS, les images, CSS, sons...). Par la suite, on va utiliser un router (qui se trouvera dans un script JS) qui s'occupera de faire du "Client Side Rendering" (rendu côté client de l'HTML).  
Dans nos applications `Vite + React + TS`, c'est le code transpilé du TS vers le JS qui s'occupera :
- d'accéder à un container présent dans la représentation mémoire des éléments HTML de la page (par exemple la `div#root`).
- de mettre à jour la représentation mémoire de ce container avec les éléments HTML attendu pour la page demandé.  
Ensuite, le browser n'aura plus qu'à redessiner la page sur base de la nouvelle représentation mémoire des éléments HTML de la page.

Notons que dans une MPA, on parle de "Server Side Rendering", car c'est le backend qui est responsable de la génération de l'HTML ; cela se fait souvent à l'aide d'un moteur de templating pour générer des views (par exemple via `Handlebars` qui permet de générer des views dans une application `Node.js`).

## Navigation basique entre pages

A notre stade actuel de connaissances, nous pourrions très facilement organiser la navigation entre plusieurs page, simplement à l'aide d'une variable d'état.

Pour ce tutoriel, nous allons partir d'une base de code minimaliste. Veuillez donc créer un nouveau projet `Vite + React + TS` nommé `routing`.

Veuillez remplacer le code de `App` :
```tsx
import { useState } from "react";

const HomePage = () => <div>Home Page</div>;
const AboutPage = () => <div>About Page</div>;
const ContactPage = () => <div>Contact Page</div>;

const App = () => {
  const [currentPage, setCurrentPage] = useState("Home");

  const navigateTo = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return <HomePage />;
      case "About":
        return <AboutPage />;
      case "Contact":
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => navigateTo("Home")}>Home</button>
        <button onClick={() => navigateTo("About")}>About</button>
        <button onClick={() => navigateTo("Contact")}>Contact</button>
      </nav>
      {renderPage()}
    </div>
  );
};

export default App;
export { HomePage, AboutPage, ContactPage };
```

Nous avons donc ici défini 3 composants React qui représentent 3 pages, et une fonction qui permet, lors d'un clic, d'afficher la page associée au bouton.

Veuillez exécuter l'application.

Tout fonctionne bien !

💭 Mais qu'est-ce qui nous manque ?

Voici ce qui fait défaut :
- Si nous faisons un refresh de la page, nous perdons la page en cours. Par exemple, si nous sommes sur `ContactPage`, nous serons redirigé vers `HomePage`.
- Nous n'avons pas d'historique des pages visitées, nous ne pouvons pas revenir en arrière et en avant dans le temps.
- Nous n'avons pas une URL spécifique pour chaque écran.

Nous allons donc mettre en place en routeur afin de bénéficier de ces fonctions manquantes.

## Utilisation de React Router
### Introduciton
`React Router` est une librairie qui fournit une belle solution pour gérer la navigation dans une application React.

Sa documentation est disponible ici : https://reactrouter.com/en/main

### Installation de la librairie

Dans un premier temps, il faut donc installer la librairie : 
```sh
npm i react-router-dom
```

### Mise en place de routes basiques

Dans un premier temps, nous allons voir comment créer la configuration la plus simple d'un router. Veuillez mettre à jour `/src/main.tsx` :
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { AboutPage, ContactPage, HomePage } from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>  
  </React.StrictMode>
);
```

Ici, nous avons donc `createBrowserRouter` qui crèe une configuration pour nos 3 routes, et chaque route va afficher une page.

Ensuite, nous utilisons le `RouterProvider` pour fournir la configuration du routeur à l'ensemble de l'application et pour permettre aux composants de l'application à accéder au contexte du router.

Pour cette première utilisation du router, nous n'allons pas tenter d'optimiser la navigation. Nous allons donc intégrer à chaque page une NavBar.  
Chaque élément de navigation va utiliser `<Link>` comme composant pour faire le lien avec les routes que nous avons configurées.

Veuillez mettre à jour le composant `App` :
```tsx
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/contact">Contact</Link>
   Contact</button>
  </nav>
);

const HomePage = () => (
  <div>
    <NavBar />
    <p>Home Page</p>
  </div>
);
const AboutPage = () => (
  <div>
    <NavBar />
    <p>About Page</p>
  </div>
);
const ContactPage = () => (
  <div>
    <NavBar />
    <p>Contact Page</p>
  </div>
);

const App = () => {
  return <div></div>;
};

export default App;
export { HomePage, AboutPage, ContactPage };
```

Veuillez lancer votre application et vérifier que tout fonctionne. Lorsque vous cliquez sur un lien, le router détecte qu'il y a eu un changement d'état, et `element` dans la configuration du router est réappelé pour la route associée, amenant au render du composant.

## Utilisation de `useNavigation`

Si l'on souhaite se rapporcher du design initial, nous pouvons utiliser le hook `useNavigation` qui offre une fonction pour naviguer vers une nouvelle route.

Veuillez mettre `App` à jour :
```tsx
import { useNavigate } from "react-router-dom";

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

const HomePage = () => (
  <div>
    <NavBar />
    <p>Home Page</p>
  </div>
);
const AboutPage = () => (
  <div>
    <NavBar />
    <p>About Page</p>
  </div>
);
const ContactPage = () => (
  <div>
    <NavBar />
    <p>Contact Page</p>
  </div>
);

const App = () => {
  return <div></div>;
};

export default App;
export { HomePage, AboutPage, ContactPage };
```

Voila, nous avons un design qui ressemble au design initial.  
N'hésitez pas à tester le router : 
- Faites un reload quand vous êtes dans la `ContactPage` pour voir que vous y rester bien.
- Naviguer sur plusieurs pages, puis utiliser les fonctionnalités "Back" and "Forward" pour voyager dans l'historique de votre Browser.
- Vérifiez bien que l'URL dans le browser correspond bien à la page demandée.

💭 Est-ce qu'il n'y a pas quelque chose qui vous dérange dans la solution actuelle du layout de nos pages ?

Actuellement, nous intégrons une `NavBar` dans chaque page. Cela signifie qu'à chaque navigation d'une page à une autre, c'est l'entièreté de la page qui doit être rendue !

Il serait intéressant de pouvoir définir un layout de tout ce qui devrait être rendu qu'une seule fois dans notre page, comme par exemple une barre de navigation.

Pour ce faire, nous allons voir les "nested routes".

## Nested routes

Il est possible de définir une route parent, ça sera la racine ici, pour afficher le squelette de nos pages.

Ensuite, nous afficherons des routes "enfants" au sein de la route "parent". Pour indiquer où les routes "enfant" devront s'afficher chez le "parent", nous utiliserons un `<Outler>`.  Voici comment définir la route `/` pour le squelette de l'application qui se trouvera dans `App`, puis les 3 routes "enfant" pour les 3 pages (veuillez mettre à jour le router au sein de `App`) :
```tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
]);
```

Il ne nous reste plus qu'à mettre à jour `App` pour intégrer le `Outlet` et pour enlever l'appel de chaque page à la `NavBar` : 
```tsx
import { Outlet, useNavigate } from "react-router-dom";

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
const AboutPage = () => <p>About Page</p>;
const ContactPage = () => <p>Contact Page</p>;

const App = () => (
  <div>
    <NavBar />
    <Outlet />
  </div>
);

export default App;
export { HomePage, AboutPage, ContactPage };
```

Nous avons là un code bien propre, et une navigation parfaitement fonctionnelle !  
Il est à noter que le code serait encore plus simple si nous utilisions le composant `Link` de la librairie (il suffirait de le styler pour qu'il ressemble à un bouton).

## URL dynamiques

Parfois, il est intéressant qu'une même composant soit appelé sur toute une famille de routes. 

Par exemple, dans le composant `AboutPage`, nous souhaitons afficher une liste d'utilisateurs.  Lorsque nous cliquons sur une utilisatrice ou un utilisateur, nous souhaitons faire appel à un nouveau composant `UserPage` qui permettra d'afficher sa page associée avec comme url : `/users/:userId`.

Veuillez mettre à jour le composant `App` pour créer la `UserPage` et mettre à jour `AboutPage` : 
```tsx
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

export default App;
export { HomePage, AboutPage, ContactPage, UserPage };
```

Le composant `AboutPage` contient des `Link` qui pointent vers des URL qui sont `/users/1` pour le premier user, `/users/2` pour le user qui a l'id `2`...

Pour récupérer cette id dans la page des utilisateurs (le composant `UserPage`), nous utilisons le hook `useMatch("/users/:userId")` pour indiquer le segment dynamique de l'URL par une variable qui sera accessible via `match.params.userId`.

Pour que tout cela fonctionne, il ne reste plus qu'à configurer le router pour cette route dynamique. Veuillez mettre à jour la configuration du router dans `/src/main.tsx` : 
```tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "users/:userId",
        element: <UserPage />,
      }
    ],
  },
]);
```

Veuillez vérifier que tout fonctionne bien, que vous pouvez afficher la page de `James Brown`.

💭 Il est à noter que si nous n'avions pas voulu créer une nouvelle page mais plutôt afficher le détail d'un utilisateur dans le composant `AboutPage`, nous aurions pour créer une route "enfant" de `/about` (en utilisant un `Outlet` dans `AboutPage`).

# Exercice : React Router de base (ex11)
Dans vos exercices précédents, vous avez créer une page pour afficher les films des cinémas UGC (`/exercises/XY`). Vous avez aussi créé une page pour afficher vos films préférés dans un autres exercice (`/exercises/XY`).

Nous vous proposons ici de créer une nouvelle application `iMovies` qui s'occupera d'intégrer ces contenus et de mettre en place la navigation.

Veuillez partir d'une copie de l'exercice (`/exercises/XY`) et y intégrer le code de l'exercice (`/exercises/XY`) pour afficher :
- Un header & un footer pour chaque page
- Une navbar (à vous de choisir où la mettre)
- Une nouvelle `HomePage` qui donne quelques explications sur l'application `iMovies` (pas besoin de la peauffiner, l'idée est juste de travailler la mise en place de la navigation).
- Une `CinemaPage` qui reprend simplement le contenu de l'exercice (`/exercises/XY`).
- Une `MovieListPage` qui reprend la liste de vos films selon le design de l'exercise (`/exercises/XY`).

Une fois tout fonctionel, veuillez faire un commit avec le message suivant : "new:exXY".

