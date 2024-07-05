# Utilisation d'une librairie de composants
## Introduction
Il existe de nombreuses librairies de composants React qui permettent de rendre plus facile et plus rapide la création de UI.

## Material UI
Toute la documentation de cette librairie est disponible : https://mui.com/material-ui/ 

Commencez par installer les librairies de bases : 
```sh
npm install @mui/material @emotion/react @emotion/styled @fontsource/roboto @mui/icons-material
```

## Utilisation de Material UI
Par défaut, Material UI utilise le font `Roboto` qu'il faut installer. Pour utiliser un font, il faut ensuite faire un `import`, par exemple dans votre script d'entrée de votre application `/src/main.tsx` :
```tsx
import "@fontsource/roboto/700.css";
```

### Reset global du CSS
Il est de bonne pratique de normaliser tous les composants HTML en faisant appel à `CssBaseline`. Ici nous repartons du tutoriel précédent `medium-state` à l'aide d'un copier/coller et créons un nouveau projet nommé `ui-library`. 

Après avoir installé les packages nécessaires à l'utilisation de `Material UI` ou `MUI`, veuillez mettre à jour `/src/main.tsx` ainsi :
```tsx
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./components/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline /> {/* Global CSS reset from Material-UI */}
    <App />
  </React.StrictMode>
);
```

### Principe général de fonctionnement de MUI

`MUI` met à disposition beaucoup de composants qui permettent de créer des UI en utilisant les règles de `Material Design` comme référence.

Tous les composants peuvent être découverts ici : https://mui.com/material-ui/all-components/ 

Les composants peuvent être taillés sur mesure selon différentes stratégies. En voici les principales :
- Customiser un seul élément d'un composant `MUI` via la prop `sx` (les valeurs sont un superset de CSS) ou via la prop `className` (pour utiliser des classes CSS personnelles);
- Créer un composant réutilisable à partir d'un composant `MUI` et de l'utilitaire `styled` ;
- Faire une surchage d'un composant `MUI` via un `theme` ;
- Faire une surchage globale du CSS de certains éléments HTML en utilisant le compposant `GlobalStyles`.

Dans ce cours, nous allons explorer la première option uniquement à l'aide de `sx`. N'hésitez pas à en découvrir plus par vous-même via : https://mui.com/material-ui/customization/how-to-customize/ 

Il existe des composants de layout qui permettent d'agencer d'autres composants horizontalement ou verticalement, principalement : 
- `Box` : Un composant qui sert de conteneur flexible pour appliquer des marges, des paddings, des alignements et d'autres styles CSS aux enfants.
- `Container` : Un composant qui centre et limite la largeur du contenu à une taille prédéfinie pour maintenir des marges cohérentes et une mise en page réactive.
- `Grid` : Un composant puissant pour créer des mises en page en grille réactives, permettant de définir des rangées et des colonnes avec des espacements et des alignements configurables.
- `Stack` : Un composant qui simplifie l'agencement des enfants en les empilant verticalement ou horizontalement avec des espacements uniformes.

Le système de breakpoints de Material UI permet de créer des mises en page réactives en ajustant le rendu des composants en fonction de la taille de l'écran. Material UI propose plusieurs breakpoints par défaut qui correspondent à des largeurs d'écran courantes.

Les breakpoints par défaut de Material UI sont définis comme suit :
- `xs` (extra-small): 0px et plus
- `sm` (small): 600px et plus
- `md` (medium): 900px et plus
- `lg` (large): 1200px et plus
- `xl` (extra-large): 1536px et plus

Par exemple, le composant Grid utilise ces breakpoints pour définir le nombre de colonnes à afficher à différentes largeurs d'écran :
```tsx
<Grid container spacing={2}>
  <Grid xs={12} md={6}>
    <Item>xs=6 md=8</Item>
  </Grid>
  <Grid xs={12} md={6}>
    <Item>xs=6 md=4</Item>
  </Grid>
  <Grid xs={12} md={6}>
    <Item>xs=6 md=4</Item>
  </Grid>
  <Grid xs={12} md={6}>
    <Item>xs=6 md=8</Item>
  </Grid>
</Grid>
```

Ce `Grid` permet à un composant d'occcuper 6 colonnes sur 12 du viewport quand la largeur du viewport est de 600 et plus pixel. Pour les viewport plus petits, le composant remplit les 12 colonnes disponibles.

## Exemple d'utilisation de base des composants `MUI`

Pour ce tutoriel, nous avons été observer les composants `MUI` et avons utilisés ceux qui semblaient applicables à nos différents composants React de l'application pour la pizzeria.

Nous vous proposons de mettre à jour les scripts de votre projet sans aucune gestion du style : nous allons donc enlever toutes les références au CSS, et nous n'allons pas encore utiliser le système de `MUI` pour styler les éléments de notre applications.

Nous avons déjà mis à jour `/src/main.tsx`. Continuons donc par la mise à jour de `Main` (dans `/src/components/App/index.tsx`) :
```tsx
import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";
import { useState } from "react";
import { Box } from "@mui/material";

function App() {
  const [actionToBePerformed, setActionToBePerformed] = useState(false);

  const handleHeaderClick = () => {
    setActionToBePerformed(true);
  };

  const clearActionToBePerformed = () => {
    setActionToBePerformed(false);
  };

  return (
    <Box>
      <Header
        title="We love Pizza"
        version={0 + 1}
        handleHeaderClick={handleHeaderClick}
      />
      <Main
        actionToBePerformed={actionToBePerformed}
        clearActionToBePerformed={clearActionToBePerformed}
      />

      <Footer />
    </Box>
  );
}

export default App;
```

Nous avons juste utilisé `Box` pour prendre la place d'une `div` et nous n'utilisons plus `App.css`.

Veuillez ensuite mettre à jour le `Header` (dans `/src/components/Header/index.tsx`) :
```tsx
import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";

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
    <Box
      component="header"
      onClick={handleClick}
    >
      <Container maxWidth="sm">
        <Typography variant="h1">
          {menuPrinted ? `${title}... and rarely do we hate it!` : title}
        </Typography>
      </Container>
    </Box>
  );
};

export default Header;
```

Là nous utilisons :
- `Box` : pour créer notre future élément `<header>`
- `Container` : pour créer un container qui centre ses éléments et dont la largeur vaut maximum `sm` (600px et plus)
- `Typography` : pour gérer le texte (qui deviendra un élément `<h1>`)

Nous n'utilisons plus `Header.css`.

Veuillez ensuite mettre à jour le `Main` (dans `/src/components/Main/index.tsx`). Notons que nous souhaitons faire un refactor de l'application afin que le menu des boissons soit affiché sur base d'une collection de données :
```tsx
import { useState } from "react";
import sound from "../../assets/sounds/Infecticide-11-Pizza-Spinoza.mp3";
import DrinkMenu from "./DrinkMenu";
import PizzaMenu from "./PizzaMenu";
import { NewPizza, Pizza, Drink} from "../../types";
import AddPizza from "./AddPizza";
import AudioPlayer from "./AudioPlayer";
import { Container, Typography } from "@mui/material";

const defaultPizzas: Pizza[] = [
  {
    id: 1,
    title: "4 fromages",
    content: "Gruyère, Sérac, Appenzel, Gorgonzola, Tomates",
  },
  {
    id: 2,
    title: "Vegan",
    content: "Tomates, Courgettes, Oignons, Aubergines, Poivrons",
  },
  {
    id: 3,
    title: "Vegetarian",
    content: "Mozarella, Tomates, Oignons, Poivrons, Champignons, Olives",
  },
  {
    id: 4,
    title: "Alpage",
    content: "Gruyère, Mozarella, Lardons, Tomates",
  },
  {
    id: 5,
    title: "Diable",
    content: "Tomates, Mozarella, Chorizo piquant, Jalapenos",
  },
];

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

interface MainProps {
  actionToBePerformed: boolean;
  clearActionToBePerformed: () => void;
}

const Main = ({ actionToBePerformed, clearActionToBePerformed }: MainProps) => {
  const [pizzas, setPizzas] = useState(defaultPizzas);

  const addPizza = (newPizza: NewPizza) => {
    const pizzaAdded = { ...newPizza, id: nextPizzaId(pizzas) };
    setPizzas([...pizzas, pizzaAdded]);
  };

  return (
    <Container component="main" sx={{ mt: 8, mb: 2, flex: "1" }} maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        My HomePage
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Because we love JS, you can also click on the header to stop / start the
        music ; )
      </Typography>
      <AudioPlayer
        sound={sound}
        actionToBePerformed={actionToBePerformed}
        clearActionToBePerformed={clearActionToBePerformed}
      />

      <PizzaMenu pizzas={pizzas} />

      <br/>

      <AddPizza addPizza={addPizza} />

      <br/>

      <DrinkMenu title="Notre Menu de Boissons" drinks={drinks} />
    </Container>
  );
};

const nextPizzaId = (pizzas: Pizza[]) => {
  return pizzas.reduce((maxId, pizza) => Math.max(maxId, pizza.id), 0) + 1;
};

export default Main;
```

Il n'y a pas de composants `MUI` non rencontrés précédemment. Il n'y a plus de CSS. Voici le nouveau type `Drink` qui doit être ajouté à `/src/types.ts` :
```ts
interface Pizza {
  id: number;
  title: string;
  content: string;
}

type NewPizza = Omit<Pizza, "id">;

interface Drink {
  title: string;
  image: string;
  volume: string;
  price: string;
}

export type { Pizza, NewPizza, Drink };
```

Le composant `AudioPlayer` ne doit pas être mis à jour. Le composant `CssBaseline` offre déjà un joli style de base.

Veuillez ensuite mettre à jour `PizzaMenu` (dans `/src/components/Main/PizzaMenu.tsx`) : 
```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { Pizza } from "../../types";

interface PizzaMenuProps {
  pizzas: Pizza[];
}
const PizzaMenu = ({ pizzas }: PizzaMenuProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pizza</TableCell>
            <TableCell>æ©escription</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pizzas.map((pizza) => (
            <TableRow key={pizza.id}>
              <TableCell>{pizza.title}</TableCell>
              <TableCell>{pizza.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PizzaMenu;
```

Pour ce composant, nous avons utilisé tous les composants `MUI` permettant de créer une table HTML : https://mui.com/material-ui/react-table/#basic-table.


Pour le menu des boissons, nous avons créé un tout nouveau design pour être basé sur des données plutôt que des composants enfants (via `children`).  
Veuillez mettre à jour `DrinkMenu` (dans `/src/components/Main/DrinkMenu.tsx`) : 
```tsx
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { Drink } from "../../types";

interface DrinkMenuProps {
  title: string;
  drinks: Drink[];
}

const DrinkMenu: React.FC<DrinkMenuProps> = ({ title, drinks }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={3}>
        {drinks.map((drink, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card>
              <CardMedia
                component="img"
                image={drink.image}
                alt={drink.title}
                style={{ objectFit: "contain", height: "200px" }} // Ensure image is fully visible
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {drink.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {drink.volume}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Prix: {drink.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DrinkMenu;
```

Nous avons utilisé le composant `Card` du `MUI` : https://mui.com/material-ui/react-card/.

Veuillez ensuite mettre à jour `AddPizza` (dans `/src/components/Main/AddPizza.tsx`) : 
```tsx
import { useState, SyntheticEvent } from "react";

import { NewPizza } from "../../types";
import { Box, Button, TextField } from "@mui/material";

interface AddPizzaProps {
  addPizza: (pizza: NewPizza) => void;
}

const AddPizza = ({ addPizza }: AddPizzaProps) => {
  const [pizza, setPizza] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    addPizza({ title: pizza, content: description });
  };

  const handlePizzaChange = (e: SyntheticEvent) => {
    const pizzaInput = e.target as HTMLInputElement;
    console.log("change in pizzaInput:", pizzaInput.value);
    setPizza(pizzaInput.value);
  };

  const handleDescriptionChange = (e: SyntheticEvent) => {
    const descriptionInput = e.target as HTMLInputElement;
    console.log("change in descriptionInput:", descriptionInput.value);
    setDescription(descriptionInput.value);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="pizza"
            name="pizza"
            label="Pizza"
            variant="outlined"
            value={pizza}
            onChange={handlePizzaChange}
            required
            color="primary"
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            value={description}
            onChange={handleDescriptionChange}
            required
            color="primary"
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Ajouter
        </Button>
      </form>
    </Box>
  );
};

export default AddPizza;
```

Nous avons utilisé `TextField` afin de gérer les 2 inputs de notre formulaire.

Il ne reste plus qu'à mettre à jour `Footer` (dans `/src/components/Footer/index.tsx`) : 
```tsx
import { Box, Container, Typography } from "@mui/material";
import logo from "../../assets/images/js-logo.png";
import { Copyright } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box component="footer" color="">
      <Container maxWidth="sm">
        <Box>
          <Typography variant="body2">But we also love JS</Typography>
          <Typography>
            <Copyright />
            myAmazingPizzeria
          </Typography>
        </Box>
        <Box>
          <img src={logo} alt="" width={50} />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
```

Nous avons utilisé l'icône `Copyright` pour le `Footer`.

Veuillez exécutez l'application !  
Le résultat est fort intéressant : l'interface est très épurée, avec un look assez professionnel. Mais ça manque de style !

## Exemple d'utilisation de la prop `sx`

Notre application possède déjà un thème par défaut, même si nous ne l'utilsons actuellment pas vraiment.

Nous allons donc maintenant styler de manière individuelle chacun des élements `MUI` à l'aide de la prop `sx`. En fait, vous allez faire du CSS très ciblé, sans devoir créer de classes.

Voici la mise à jour du composant `App` afin d'ajouter la photo de background et de s'assurer que l'application prendra au minimum une hauteur de 100% du viewport (pour avoir un footer qui sera toujours en bas de page) : 
```tsx
import pizza from "../../assets/images/pizza.jpg";
// Other imports
function App() {
  const [actionToBePerformed, setActionToBePerformed] = useState(false);

  const handleHeaderClick = () => {
    setActionToBePerformed(true);
  };

  const clearActionToBePerformed = () => {
    setActionToBePerformed(false);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundImage: `url(${pizza})`,
      backgroundSize: 'cover',
    }}>
      
      

      <Header
        title="We love Pizza"
        version={0 + 1}
        handleHeaderClick={handleHeaderClick}
      />
      <Main
        actionToBePerformed={actionToBePerformed}
        clearActionToBePerformed={clearActionToBePerformed}
      />
      
      <Footer />
    </Box>
  );
}
```

Voici la mise à jour du composant `Header` afin d'obtenir la couleur du thème :
```tsx
import { Box, Container, Typography, useTheme } from "@mui/material";
import { useState } from "react";

interface HeaderProps {
  title: string;
  version: number;
  handleHeaderClick: () => void;
}

const Header = ({ title, handleHeaderClick }: HeaderProps) => {
  const theme = useTheme();
  const [menuPrinted, setMenuPrinted] = useState(false);

  const handleClick = () => {
    console.log(`value of menuPrinted before click: ${menuPrinted}`);
    setMenuPrinted(!menuPrinted);
    handleHeaderClick();
  };

  return (
    <Box
      component="header"
      sx={{
        px: 2,
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.primary.light
            : theme.palette.primary.dark,
        color: (theme) => theme.palette.primary.contrastText,
      }}
      onClick={handleClick}
    >
      <Container maxWidth="sm">
        <Typography variant="h1">
          {menuPrinted ? `${title}... and rarely do we hate it!` : title}
        </Typography>
      </Container>
    </Box>
  );
};

export default Header;
```

Il y a différents moyens d'obtenir le thème, mais nous trouvons que le hook `useTheme` est le plus simple. Ici, le thème par défaut de `MUI` sera utilisé pour la couleur `primary` (une sorte de bleu).

Nous allons maintenant styler le composant `Main` afin qu'il prenne tout l'espace disponible (`flex:"1"`) pour assurer que le `Footer` soit toujours tout en bas de la page :
```tsx
import { useState } from "react";
import sound from "../../assets/sounds/Infecticide-11-Pizza-Spinoza.mp3";
import DrinkMenu from "./DrinkMenu";
// import "./Main.css";
import PizzaMenu from "./PizzaMenu";
import { NewPizza, Pizza, Drink} from "../../types";
import AddPizza from "./AddPizza";
import AudioPlayer from "./AudioPlayer";
import { Container, Typography } from "@mui/material";

const defaultPizzas: Pizza[] = [
  {
    id: 1,
    title: "4 fromages",
    content: "Gruyère, Sérac, Appenzel, Gorgonzola, Tomates",
  },
  {
    id: 2,
    title: "Vegan",
    content: "Tomates, Courgettes, Oignons, Aubergines, Poivrons",
  },
  {
    id: 3,
    title: "Vegetarian",
    content: "Mozarella, Tomates, Oignons, Poivrons, Champignons, Olives",
  },
  {
    id: 4,
    title: "Alpage",
    content: "Gruyère, Mozarella, Lardons, Tomates",
  },
  {
    id: 5,
    title: "Diable",
    content: "Tomates, Mozarella, Chorizo piquant, Jalapenos",
  },
];

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

interface MainProps {
  actionToBePerformed: boolean;
  clearActionToBePerformed: () => void;
}

const Main = ({ actionToBePerformed, clearActionToBePerformed }: MainProps) => {
  const [pizzas, setPizzas] = useState(defaultPizzas);

  const addPizza = (newPizza: NewPizza) => {
    const pizzaAdded = { ...newPizza, id: nextPizzaId(pizzas) };
    setPizzas([...pizzas, pizzaAdded]);
  };

  return (
    <Container component="main" sx={{ mt: 8, mb: 2, flex: "1" }} maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        My HomePage
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Because we love JS, you can also click on the header to stop / start the
        music ; )
      </Typography>
      <AudioPlayer
        sound={sound}
        actionToBePerformed={actionToBePerformed}
        clearActionToBePerformed={clearActionToBePerformed}
      />

      <PizzaMenu pizzas={pizzas} />

      <AddPizza addPizza={addPizza} />

      <DrinkMenu title="Notre Menu de Boissons" drinks={drinks} />
    </Container>
  );
};

const nextPizzaId = (pizzas: Pizza[]) => {
  return pizzas.reduce((maxId, pizza) => Math.max(maxId, pizza.id), 0) + 1;
};

export default Main;
```

Nous allons maintenant mettre à jour le `PizzaMenu` afin d'ajouter des couleurs de la palette du thème par défaut à la table HTML :
```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material";

import { Pizza } from "../../types";

interface PizzaMenuProps {
  pizzas: Pizza[];
}
const PizzaMenu = ({ pizzas }: PizzaMenuProps) => {
  const theme = useTheme();
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 500,
          "& .MuiTableCell-head": {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
            fontWeight: "bold",
          },
          "& .MuiTableCell-body": {
            backgroundColor: theme.palette.primary.light,
            color: "white",
          },
          "& .MuiTableCell-root": {
            border: `1px solid ${theme.palette.secondary.main} `,
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Pizza</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pizzas.map((pizza) => (
            <TableRow key={pizza.id}>
              <TableCell>{pizza.title}</TableCell>
              <TableCell>{pizza.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PizzaMenu;
```

Nous utilisons ici la notion de `&` en CSS / SASS (ou dans le cas de Material UI, en `sx`) permettant de cibler des classes ou des pseudos-classes imbriquées à l'intérieur d'un sélecteur parent spécifié. Cela facilite la création de règles CSS spécifiques à des contextes particuliers sans avoir à répéter le sélecteur parent complet.  
Si vous souhaitez en savoir plus sur cette pratique : https://mui.com/material-ui/customization/how-to-customize/#overriding-nested-component-styles 

Voici comment nous stylons le composant `DrinkMenu` : 
```tsx
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  useTheme,
} from "@mui/material";
import { Drink } from "../../types";

interface DrinkMenuProps {
  title: string;
  drinks: Drink[];
}

const DrinkMenu: React.FC<DrinkMenuProps> = ({ title, drinks }) => {
  const theme = useTheme();

  return (
    <Container>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: theme.palette.primary.contrastText,
          textAlign: "center",
          marginTop: 2,
        }}
      >
        {title}
      </Typography>
      <Grid container spacing={3}>
        {drinks.map((drink, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card>
              <CardMedia
                component="img"
                image={drink.image}
                alt={drink.title}
                style={{ objectFit: "contain", height: "200px" }} // Ensure image is fully visible
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {drink.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {drink.volume}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Prix: {drink.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DrinkMenu;
```

Voici comment mettre à jour le style du formulaire au sein de `AddPizza` :
```tsx
import { useState, SyntheticEvent } from "react";

import { NewPizza } from "../../types";
import { Box, Button, TextField, useTheme } from "@mui/material";

interface AddPizzaProps {
  addPizza: (pizza: NewPizza) => void;
}

const AddPizza = ({ addPizza }: AddPizzaProps) => {
  const theme = useTheme();
  const [pizza, setPizza] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    addPizza({ title: pizza, content: description });
  };

  const handlePizzaChange = (e: SyntheticEvent) => {
    const pizzaInput = e.target as HTMLInputElement;
    console.log("change in pizzaInput:", pizzaInput.value);
    setPizza(pizzaInput.value);
  };

  const handleDescriptionChange = (e: SyntheticEvent) => {
    const descriptionInput = e.target as HTMLInputElement;
    console.log("change in descriptionInput:", descriptionInput.value);
    setDescription(descriptionInput.value);
  };

  return (
    <Box
      sx={{
        marginTop: 2,
        padding: 3,
        backgroundColor: "secondary.light",
        borderRadius: 4,
        boxShadow: 2,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="pizza"
            name="pizza"
            label="Pizza"
            variant="outlined"
            value={pizza}
            onChange={handlePizzaChange}
            required
            color="primary"
            sx={{
              input: { color: theme.palette.secondary.contrastText },
            }}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            value={description}
            onChange={handleDescriptionChange}
            required
            color="primary"
            sx={{
              input: { color: theme.palette.secondary.contrastText },
            }}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Ajouter
        </Button>
      </form>
    </Box>
  );
};

export default AddPizza;
```

Nous pouvons maintenant mettre à jour le `Footer` :
```tsx
import { Box, Container, Typography, useTheme } from "@mui/material";
import logo from "../../assets/images/js-logo.png";
import { Copyright } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.secondary.light
            : theme.palette.secondary.dark,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "inline-block",
            paddingRight: 2,
            color: theme.palette.secondary.contrastText,
          }}
        >
          <Typography variant="body1">But we also love JS</Typography>
          <Typography>
            <Copyright />
            myAmazingPizzeria
          </Typography>
        </Box>
        <Box sx={{ display: "inline-block" }}>
          <img src={logo} alt="" width={50} />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
```

Nous avons maintenant une application qui commence à être bien stylée !

Il y a un souci qui est visible sur toutes les applications offertes par les templates de projet de `MUI`. Il y a toujours un espace, une sorte de marge en bas de page, après notre `Footer`.  

Pour résoudre ce souci, qui n'est malheureusement pas vraiment documenté sur le Web, il vous est proposé d'ajouter une seule feuille de style à votre application, au niveau de `/src/main.tsx`, veuillez importer `/src/index.css` contenant ce code :
```css
div#root {
  width: 100%;
  display: inline-block; /* avoid margins to collapse to avoid vertical scrollbar */
}
```

Wow, nous avons quelque chose de fonctionnel !

## Création de son propre thème 

Pour ce tutoriel, nous vous proposons de créer la palette de couleurs la plus simple pour donner les couleurs primaires et secondaires que nous souhaitons pour un site d'une pizzeria.

Il existe des outils très intéressants pour créer ses thèmes et palettes de couleurs. Vous trouvez ceux-ci ici : 
- [Material palette generator](https://m2.material.io/inline-tools/color/)
- [mui-theme-creator](https://zenoo.github.io/mui-theme-creator/)
- Autres outils pour générer ou découvrir des palettes : https://mui.com/material-ui/customization/color/ 

Veuillez créer un nouveau fichier pour y ajouter la définition d'un nouveau thème dans `/src/themes.ts` :
```ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f0483b",
    },
    secondary: {
      main: "#3bf048",
    },
  },
});

export default theme;
```

Et pour utiliser ce nouveau thème, nous devons créer un provider qui va "injecter" ce thème dans l'arbre de tous les composants React. Pour ce faire, veuillez mettre à jour `/src/main.tsx` :
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./themes";

import App from "./components/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Global CSS reset from Material-UI */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

Exercice : utilisation de composants MUI (ex10)

Veuillez créer un nouveau projet sur base d'un copier/coller de l'exercice nommé `/exercises/XY` dans votre git repo.

Pour une première étape, veuillez remplacer tous les composants TSX que vous pouvez par des composants `MUI`.

Une fois tout fonctionel, veuillez faire un commit avec le message suivant : "new:exXY"

Pour la dernière étape, veuillez créer votre palette de couleur, et styler votre application à l'aide du `MUI System`.

Une fois votre application peauffinée, veuillez faire un commit avec le message suivant : "new:exXY"