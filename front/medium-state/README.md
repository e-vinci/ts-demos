# Gestion de l'état plus avancée
## Gestion de l'état associé à un formulaire  
### Introduction 
Il y a beaucoup d'applications web où nous allons souhaiter gérer un formulaire.

En React, pour afficher ce qui est visible dans un formulaire, nous allons devoir jouer avec l'état de l'application.

Pour ce tutoriel, veuillez créer une copie du tutoriel `start-state` et l'appeler `medium-state`. Changez le nom du projet dans `package.json` en `medium-state`.

### Formulaire non contrôllé par React
Dans le composant `Main` (`/src/components/Main/index.tsx`), à la suite de PizzaMenu,
nous allons ajouter un formulaire :

```tsx
onst Main = () => {
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    console.log("submit:", form.pizza.value, form.description.value);
  };

  return (
    <main>
      <p>My HomePage</p>
      <p>
        Because we love JS, you can also click on the header to stop / start the
        music ; )
      </p>
      <audio id="audioPlayer" controls autoPlay>
        <source src={sound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <PizzaMenu />

      <div>
        <br />
        <form onSubmit={handleSubmit}>
          <label htmlFor="pizza">Pizza</label>
          <input type="text" id="pizza" name="pizza" />
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" />
          <button type="submit">Ajouter</button>
        </form>
      </div>
```

### Event object

L'objet **`event`** a été nommé **`e`** ci-dessus, mais nous aurions pu lui donner le nom que l'on souhaitait.

👍 Pour éviter la confusion, il est recommandé de l'appeler **`e`** (ou éventuellement **`event`**).

L'objet **`event`** est automatiquement passé à la callback d'un gestionnaire d'événements.

Il est très utile, pour deux raisons principalement :

- Stopper l'action par défaut suite à un événement.
- Lorsqu'on attache une même callback à une multitude d'éléments, pour retrouver la cible de l'événement.

**`e.target`** est l'élément HTML qui lance la propagation de l'événement dans l'arbre des composants.

Parfois on préfère utiliser **`e.currentTarget`** qui est l'élément HTML sur lequel est attaché le gestionnaire d'événements.

Dans le code ci-dessus, on utilise l'objet **`event`** pour stopper l'action par défaut d'un formulaire qui est d'envoyer les données au serveur (indiqué par la propriété **`action`** du formulaire) et de recharger la page.

Veuillez faire ces tests :
- Exécutez l'application et vérifiez que tout fonctionne.
- Veuillez maintenant commenter :
```ts
 const handleSubmit = (e: SyntheticEvent) => {
    // e.preventDefault();
    const form = e.target as HTMLFormElement;
    console.log("submit:", form.pizza.value, form.description.value);
  };
```

Qu'est-ce qui se passe ?  
Il y a un rechargement de page qui est interdit dans le type d'application que nous développons. Nous reviendrons plus tard sur pourquoi il n'est pas acceptable de recharger la page...

### Formulaire controllé par React

Actuellement, ce formulaire n'est pas controllé par React. Nous avons accès à la valeur des inputs, néanmoins, ça n'est pas une pratique recommandée.

Il est recommandé d'utiliser des composants controllés par React. Les valeurs des inputs doivent être contrôlées par React à travers un état, et les changements seront gérés via les gestionnaires d'événements (`onChange` pour les inputs).

Comme nous avons deux formulaires ici, nous allons créer deux variables d'états et les mettre à jour dans leur gestionnaire d'événements associé :
```tsx
const Main = () => {
  const [pizza, setPizza] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("submit:", pizza, description);
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
    <main>
      <p>My HomePage</p>
      <p>
        Because we love JS, you can also click on the header to stop / start the
        music ; )
      </p>
      <audio id="audioPlayer" controls autoPlay>
        <source src={sound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <PizzaMenu />
      <div>
        <br />
        <form onSubmit={handleSubmit}>
          <label htmlFor="pizza">Pizza</label>
          <input
            value={pizza}
            type="text"
            id="pizza"
            name="pizza"
            onChange={handlePizzaChange}
            required
          />
          <label htmlFor="description">Description</label>
          <input
            value={description}
            type="text"
            id="description"
            name="description"
            onChange={handleDescriptionChange}
            required
          />
          <button type="submit">Ajouter</button>
        </form>
      </div>
```

Nous voyons maintenant que :
- chaque valeur d'une input est controllée par une variable d'état qui est mise à jour à chaque changement opéré (dans l'input)
- que grâce à l'event objet, nous avons accès à la valeur de chaque input via `e.target.value`. Néanmoins, comme TS est typé, nous devons d'abord "caster" `e.target` vers un `HTMLInputElement` afin d'avoir accès à `value`.

Veuillez executez l'application, ouvrir la console, et observer ce qui se passe quand vous écrivez dans les inputs, ainsi que lorsque vous cliquez sur le bouton submit.

Ca y est, nous avons appris comment maîtriser les formulaires en Flutter. 

Il nous reste maintenant à voir comment utiliser les données du formulaire au sein d'une collection de données qui va permettre de mettre à jour nos écrans.

## Gérer une collection comme état de l'application

Très souvent, c'est une collection de données qui sera utilisée comme état de l'application.

Par exemple, dans notre tutoriel, nous souhaiterions qu'une collection de pizzas permette :
- d'afficher toutes les pizzas du menu ;
- d'ajouter automatiquement une nouvelle pizzas au menu après soumission des données du formulaire.

Quand nous devons mettre en place une variable d'état, ici un array de `Pizza`, il faut toujours se poser la question : "Mais où est-ce que je dois gérer cet état ?".

Actuellement, la collection de `Pizza` est gérée dans le composant `PizzaMenu`, qui est un "sibling" (un frère ou une soeur) du formulaire. Ainsi, si nous devons y accéder dans ces différents éléments, il faut faire monter l'état vers leur ancêtre commun le plus proche, leur parent. Ici, c'est le composant `Main`.

Nous allons donc mettre à jour `PizzaMenu` pour qu'il reçoive dans ses props la collection de pizza. Voici `PizzaMenu` mis à jour :

```tsx
import { Pizza } from "../../types";
import "./PizzaMenu.css";

interface PizzaMenuProps {
  pizzas: Pizza[];
}

const PizzaMenu = ({ pizzas }: PizzaMenuProps) => {
  return (
    <table className="pizza-menu">
      <thead>
        <tr>
          <th>Pizza</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {pizzas.map((pizza) => (
          <tr key={pizza.id}>
            <td>{pizza.title}</td>
            <td>{pizza.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PizzaMenu;
```

Nous avons créé l'interface `Pizza` dans un nouveau fichier `/src/types.ts` :
```ts
interface Pizza {
  id: number;
  title: string;
  content: string;
}

export type { Pizza };
```

Pour simplifier le développement, nous vous conseillons d'enlever l'autoPlay pour l'audio... Ca fera moins de bruit ; )

Voici la mise à jour du composant `Main` afin de passer une variable d'état initialisée par les pizzas par défaut du menu :
```tsx
const defaultPizzas = [
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

const Main = () => {
  const [pizza, setPizza] = useState("");
  const [description, setDescription] = useState("");
  const [pizzas] = useState(defaultPizzas);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("submit:", pizza, description);
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
    <main>
      <p>My HomePage</p>
      <p>
        Because we love JS, you can also click on the header to stop / start the
        music ; )
      </p>
      <audio id="audioPlayer" controls >
        <source src={sound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <PizzaMenu pizzas={pizzas} />
```

L'application s'affiche comme auparavant.

Nous allons maintenant faire en sorte que lors du submit, on mette à jour la variable d'état `pizzas`.

### Mise à jour de l'état en React

En React, nous ne devons jamais mettre à jour l'état directement.
Lors du submit, nous pourrions être tenté de faire qqch du genre :
```ts
const newPizza = {
      id: nextPizzaId(pizzas),
      title: pizza,
      content: description,
    };
pizzas.push(newPizza);  
setPizzas(pizzas);
```

👎 Si vous faites cela, ça pourrait marcher, et vous pourriez vous en sortir malgré tout.  
Néanmoins, vous risquez d'avoir des soucis de debugging (vous ne pouvez pas suivre les changements d'états), d'optimisation...

👍 Retenez qu'en React, l'état est **immuable**. Si vous souhaitez le changer, vous devez chaque fois passer un nouvel objet à votre fonction mettant à jour l'état.

Par exemple, pour mettre à jour un array, vous avez deux options. Soit vous utilisez la fonction `concat` qui crée un nouvel array, ajoute l'élément, et renvoie le nouvel array :
```ts
setPizzas(pizzas.concat(newPizza));
```

Soit vous utilisez le spread operator pour créer un nouvel array contenant tous les éléments de pizzas, en y ajoutant le dernier élément :
```ts
setPizzas([...pizzas, newPizza]);
```

Voici le code final du  `Main` dans lequel nous avons ajouté une fonction toute à la fin permettant de générer un identifiant :
```tsx
import {  SyntheticEvent, useState } from "react";
import sound from "../../assets/sounds/Infecticide-11-Pizza-Spinoza.mp3";
import DrinkCard from "./DrinkCard";
import DrinkMenu from "./DrinkMenu";
import "./Main.css";
import PizzaMenu from "./PizzaMenu";
import { Pizza } from "../../types";


const defaultPizzas = [
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
] ;

const Main = () => {
  const [pizza, setPizza] = useState("");
  const [description, setDescription] = useState("");
  const [pizzas, setPizzas] = useState(defaultPizzas);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("submit:", pizza, description);
    const newPizza = {
      id: nextPizzaId(pizzas),
      title: pizza,
      content: description,
    };
    
    setPizzas([...pizzas, newPizza]);
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
    <main>
      <p>My HomePage</p>
      <p>
        Because we love JS, you can also click on the header to stop / start the
        music ; )
      </p>
      <audio id="audioPlayer" controls >
        <source src={sound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <PizzaMenu pizzas={pizzas} />

      <div>
        <br />
        <form onSubmit={handleSubmit}>
          <label htmlFor="pizza">Pizza</label>
          <input
            value={pizza}
            type="text"
            id="pizza"
            name="pizza"
            onChange={handlePizzaChange}
            required
          />
          <label htmlFor="description">Description</label>
          <input
            value={description}
            type="text"
            id="description"
            name="description"
            onChange={handleDescriptionChange}
            required
          />
          <button type="submit">Ajouter</button>
        </form>
      </div>

      <DrinkMenu title="Notre Menu de Boissons">
        <DrinkCard
          title="Coca-Cola"
          image="https://media.istockphoto.com/id/1289738725/fr/photo/bouteille-en-plastique-de-coke-avec-la-conception-et-le-chapeau-rouges-d%C3%A9tiquette.jpg?s=1024x1024&w=is&k=20&c=HBWfROrGDTIgD6fuvTlUq6SrwWqIC35-gceDSJ8TTP8="
        >
          <p>Volume: 33cl</p>
          <p>Prix: 2,50 €</p>
        </DrinkCard>
        <DrinkCard
          title="Pepsi"
          image="https://media.istockphoto.com/id/185268840/fr/photo/bouteille-de-cola-sur-un-fond-blanc.jpg?s=1024x1024&w=is&k=20&c=xdsxwb4bLjzuQbkT_XvVLyBZyW36GD97T1PCW0MZ4vg="
        >
          <p>Volume: 33cl</p>
          <p>Prix: 2,50 €</p>
        </DrinkCard>
        <DrinkCard
          title="Eau Minérale"
          image="https://media.istockphoto.com/id/1397515626/fr/photo/verre-deau-gazeuse-%C3%A0-boire-isol%C3%A9.jpg?s=1024x1024&w=is&k=20&c=iEjq6OL86Li4eDG5YGO59d1O3Ga1iMVc_Kj5oeIfAqk="
        >
          <p>Volume: 50cl</p>
          <p>Prix: 1,50 €</p>
        </DrinkCard>
      </DrinkMenu>
    </main>
  );
};

const nextPizzaId = (pizzas: Pizza[]) => {
  return pizzas.reduce((maxId, pizza) => Math.max(maxId, pizza.id), 0) + 1;
};

export default Main;
```

Notons que la fonction `reduce` est très intéressante : 
- c'est de la programmation fonctionnelle, `reduce` reçoit une fonction en paramètre (on appelle ça une callback)
- elle permet d'itérer sur tous les éléments d'une collection, en appelant la callback sur chaque élément de la collection ; chaque élément est reçu dans le deuxième argument de la callback appelé `pizza` ici ;
- à chaque appel de la callback, le résultat de l'itération prédédente est récupéré dans le 1er argument de la callback appelé `maxId` ici ; 
- à la 1ère itération, on considère la valeur `0` comme valeur précédente ; c'est d'ailleurs la valeur `0` qui serait renvoyée s'il n'y a pas d'éléments dans la collection.

## Exercice : Gestion d'une collection pour l'état (ex8)

Veuillez créer un nouveau projet en utilisant les technos Vite + React + TS + SWC nommé `/exercises/XY` dans votre git repo.

Veuillez créer une nouvelle application qui vous permette, dans la même page :
- d'afficher 5 de vos films préférés.
- d'ajouter un film via un formulaire.

Un film devra avoir :
- un titre 
- un director
- une durée en minutes

Un film pourra avoir :
- un lien vers une image
- une description
- un budget (en million).

Une fois tout fonctionel, veuillez faire un commit avec le message suivant : "new:exXY"

## Gestion d'un état partagé par plusieurs composants
Quand un état est partagé par plusieurs composants, la gestion se complique parfois un peu.

Pour notre tutoriel, afin de bien structurer notre code, nous allons créer un nouveau composant `AddPizza` dans `/src/components/Main/AddPizza.tsx` :
```tsx
import { useState, SyntheticEvent } from "react";

import { NewPizza } from "../../types";

interface AddPizzaProps {
  addPizza: (pizza: NewPizza) => void;
}

const AddPizza = ({ addPizza }: AddPizzaProps) => {
  const [pizza, setPizza] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("submitting pizza:", pizza, description);
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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pizza">Pizza</label>
        <input
          value={pizza}
          type="text"
          id="pizza"
          name="pizza"
          onChange={handlePizzaChange}
          required
        />
        <label htmlFor="description">Description</label>
        <input
          value={description}
          type="text"
          id="description"
          name="description"
          onChange={handleDescriptionChange}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddPizza;
```

Nous avons créé un nouveau type `NewPizza` qui est quasi identique au type `Pizza`, à la différence qu'il ne contient pas d'id :
```ts
interface Pizza {
  id: number;
  title: string;
  content: string;
}

type NewPizza = Omit<Pizza, "id">;

export type { Pizza, NewPizza };
```

Le composant `AddPizza` reçoit de son parent la callback qui permet de mettre à jour l'état géré par le parent ! 

💭 Nous pouvons maintenant bien assimiler comment un composant "enfant" peut renvoyer de l'information à son parent. C'est via la callback que l'enfant reçoit, lorsqu'il l'appelle, qu'il passera en paramètre ses données. Ici, l'enfant passe comme info au parent une nouvelle pizza : `addPizza({ title: pizza, content: description });`

Il est à noter que comme l'enfant n'a pas accès à tous les identifiants de pizza, c'est le parent qui devra générer un identifiant.

Ainsi, le composant `Main` est simplifié en faisant appel à `AddPizza` :
```tsx
import {  useState } from "react";
import sound from "../../assets/sounds/Infecticide-11-Pizza-Spinoza.mp3";
import DrinkCard from "./DrinkCard";
import DrinkMenu from "./DrinkMenu";
import "./Main.css";
import PizzaMenu from "./PizzaMenu";
import { NewPizza, Pizza } from "../../types";
import AddPizza from "./AddPizza";


const defaultPizzas = [
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
] ;

const Main = () => {

  const [pizzas, setPizzas] = useState(defaultPizzas);


  const addPizza = (newPizza:NewPizza) => {   
    const pizzaAdded = { ...newPizza, id: nextPizzaId(pizzas) };
    setPizzas([...pizzas, pizzaAdded]);
  };


  return (
    <main>
      <p>My HomePage</p>
      <p>
        Because we love JS, you can also click on the header to stop / start the
        music ; )
      </p>
      <audio id="audioPlayer" controls >
        <source src={sound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <PizzaMenu pizzas={pizzas} />

      <div>
        <br />
        <AddPizza addPizza={addPizza} />
      </div>

      <DrinkMenu title="Notre Menu de Boissons">
        <DrinkCard
          title="Coca-Cola"
          image="https://media.istockphoto.com/id/1289738725/fr/photo/bouteille-en-plastique-de-coke-avec-la-conception-et-le-chapeau-rouges-d%C3%A9tiquette.jpg?s=1024x1024&w=is&k=20&c=HBWfROrGDTIgD6fuvTlUq6SrwWqIC35-gceDSJ8TTP8="
        >
          <p>Volume: 33cl</p>
          <p>Prix: 2,50 €</p>
        </DrinkCard>
        <DrinkCard
          title="Pepsi"
          image="https://media.istockphoto.com/id/185268840/fr/photo/bouteille-de-cola-sur-un-fond-blanc.jpg?s=1024x1024&w=is&k=20&c=xdsxwb4bLjzuQbkT_XvVLyBZyW36GD97T1PCW0MZ4vg="
        >
          <p>Volume: 33cl</p>
          <p>Prix: 2,50 €</p>
        </DrinkCard>
        <DrinkCard
          title="Eau Minérale"
          image="https://media.istockphoto.com/id/1397515626/fr/photo/verre-deau-gazeuse-%C3%A0-boire-isol%C3%A9.jpg?s=1024x1024&w=is&k=20&c=iEjq6OL86Li4eDG5YGO59d1O3Ga1iMVc_Kj5oeIfAqk="
        >
          <p>Volume: 50cl</p>
          <p>Prix: 1,50 €</p>
        </DrinkCard>
      </DrinkMenu>
    </main>
  );
};

const nextPizzaId = (pizzas: Pizza[]) => {
  return pizzas.reduce((maxId, pizza) => Math.max(maxId, pizza.id), 0) + 1;
};

export default Main;
```

## Résumé des choses importantes
💭 Vous devriez à présent avoir les réponses à ces questions : 
- Comment passer de l'info d'un parent vers ses enfants ?
- Comment passer de l'info d'un enfant vers un ancêtre ?
- Comment passer de l'info d'un sibling (frère ou soeur) vers un autre sibling ?


## 🍬 Challenge optionnel ? : gestion d'un état partagé (ex9)

Veuillez créer un nouveau projet en copiant le code du tutoriel nommé `medium-state` en tant que répertoire `/exercises/XY` dans votre git repo.

Vous avez remarqué que dans le composant `Main`, il est écrit : "Because we love JS, you can also click on the header to stop / start the music ; )"

Nous vous demandons de remplir cette mission. A l'aide de JS/TS, veuillez faire en sorte que l'on puisse cliquer sur le Header et que cela démarre ou stop la musique de l'élément `<audio>` présent dans le main.

🤝 Tips :
- Utilisation du Hook `useRef` pour obtenir une référence directe et persistante à l'élément `<audio>`, qui peut être mutée, ce qui permet d'interagir avec cet élément DOM de manière impérative, par exemple pour appeler la méthode `play` ou `pause`. L'avantage de cette méthode c'est qu'elle ne provoque pas de re-render du composant quand il est mis à jour (à l'inverse de si l'on faisait de la programmation old-school avec `document.getElementById` pour récupérer une référence à `<audio>`).
- Utilisation à du Hook `useEffect` pour réaliser une action à chaque fois que l'on a une action à réaliser parce qu'il y aurait eu un clic dans le Header. Dans ce cas-ci, il faudrait bien comprendre le `useEffect` pour l'associer au changement d'une variable d'état (qui représente s'il y a besoin d'une action à faire à cause d'un clic dans le header).

Une fois tout fonctionel, veuillez faire un commit avec le message suivant : "new:exXY".

# Debugging d'une application React
## Introduction
💭 Qui est votre meilleur ami ?

Il est possible qu'à ce stade-ci, vous ignorez une des bonnes réponses, car pour les développeurs, le debugger est leur meilleur ami !

Le debugger est toujours là pour vous, prêt à vous faire voyager pas à pas dans votre code, à vous donner des pistes dans les moments difficiles, sans imposer de solutions, il vous offre une liberté totale ! Et il acceptera toujours votre code tel qu'il est, sous réserve bien sûr que celui-ci compile.
C'est exactement ce que l'on attend d'un ami 😁.

## Debugging sous Chrome
Pour accéder aux outils de debugging sous Chrome :
- Soit clic droit sur votre page Web, `Inspect`
- Soit `F12`
- Clic sur le tab `Sources`
- Dans `localhost:5173` (ou un autre port en fonction du port associé à votre app, `5173` est le port par défaut d'une application executée par `Vite`), dans `src`, vous trouverez vos fichiers `.tsx`. Il y a chaque fois deux versions d'un même fichier ; celle qui vous intéresse est celle dont le nom de fichier est écrit en italique : c'est un map de vos sources contenant le code TSX / TS. 

Pour débugger un fichier `.tsx` ou `.ts` : 
- Ajout de breakpoint : clic sur le numéro de la ligne à gauche du code
- Utilisation des flèches pour exécuter et naviguer dans le code :
  - `Step over` : pour aller à la ligne de code suivante
  - `Step into` : pour entrer dans une fonction
  - `Resume` : pour aller au prochain breakpoint (souvent utilisé quand on veut avancer plus vite dans du code contenant de nombreuses lignes)

  ## Debugging dans VS code

  Veuillez ouvrir votre application dans VS Code en tant que Workspace. Pour ce faire :
  `File`, `Open Folder...` et sélectionnez le répertoire de votre application Vite + React + TS.
  
  La toute première fois, vous devez créer une configuration pour votre debugger :
  - Cliquez sur `Run and Debug.
  - Cliquez sur `create a launch.json file`.
  - Sélectionnez `Web App (Chrome)`.

  Vous obtenez une configuration dans `.vscode/launch.json`. Veuillez changer le port de l'url vers le port par défaut de `Vite` (`5173`):
```json
  {
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:5173",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

  D'abord lancez la commande `npm run dev`. Maintenant que votre application tourne, vous allez lui attacher le debugger.

  Il suffit de cliquer ensuite sur `F5` pour lancer le debugger.