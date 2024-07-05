# Destructuring et l'état
## Destructuring 

Un premier exemple de "destructing assignment" a déjà été présenté dans ce cours : [apprentissage de JS](https://e-vinci.github.io/web2/part0/js-language/#le_destructuring_assignment).

Nous souhaitons améliorer la lisibilité de notre code et ne plus avoir à taper `props.nomDeLaProps` au sein de nos composants React.

Pour ce tutoriel, veuillez créer une copie du tutoriel `collections` et l'appeler `start-state`. Changez le nom du projet dans `package.json` en `start-state`.

Par exemple, nous pourrions simplifier ce composant `Header` :
```tsx
const Header = (props: HeaderProps) => {
  return (
    <header>
      <h1 className="animate__animated animate__bounce">{props.title}</h1>
      <h4>Version: {props.version}</h4>
    </header>
  );
};
```

Une première étape, en utilisant le destructuring assignment, serait :
```tsx
const Header = (props: HeaderProps) => {
  const { title, version } = props;
  return (
    <header>
      <h1 className="animate__animated animate__bounce">{title}</h1>
      <h4>Version: {version}</h4>
    </header>
  );
};
```

Mais nous pouvons faire le destructuring assignment directement dans le paramètre de la fonction `Header` : 
```tsx
const Header = ({ title, version }: HeaderProps) => {
  return (
    <header>
      <h1 className="animate__animated animate__bounce">{title}</h1>
      <h4>Version: {version}</h4>
    </header>
  );
};
```

Ainsi, nous avons un code plus concis et plus clair : on sait directement quelles props le composant attend et utilise.  
👍 Dans la suite de ce cours, nous vous recommandons de tout le temps d'utiliser le destructuring assignment pour passer vos props.

En plus de mettre à jour `Header`, veuillez mettre à jour `DrinkMenu` :
```tsx
const DrinkMenu = ({ title, children }: DrinkMenuProps) => {
  return (
    <div className="drink-menu">
      <h4>{title}</h4>
      <div className="drink-items">{children}</div>
    </div>
  );
};
```

Veuillez aussi mettre à jour `DrinkCard` :
```tsx
const DrinkCard = ({ title, image, children }: DrinkCardProps) => {
  return (
    <div className="drink-card">
      <img src={image} alt={title} className="drink-image" width="50" />
      <h2>{title}</h2>
      <div className="drink-details">{children}</div>
    </div>
  );
};
```

## Gestion de l'état

### Comment gérer l'affichage de nouvelles informations ?
Actuellement, toutes les UI que nous avons développées ne changent pas d'apparence après le premier rendu.

Néanmoins, il y a plein de cas où nous souhaiterions avoir une UI qui se "re-render", se "ré-affiche", après un événement, tel qu'une action des utilisateurs ou un événement temporel. 

Par exemple, nous souhaiterions que dans notre application, lorsqu'on clique sur le `Header`, nous affichions un message au sein de ce `Header`.

Si nous faisions de la programmation "old school", que l'on appelle programmation "impérative", nous devrions nous même :
- attacher des fonctions à notre UI qui permettent de gérer les événements. Lors d'un clic par exemple, on devrait récupérer une référence vers la représentation mémoire du `<header>`
- mettre à jour le contenu HTML de cette représentation, généralement via la propriété `.innerHTML` de `<header>` en lui passant le message à afficher (soit sous forme de string, soit en attachant un nouvel élément mémoire correspondant au message).
Le browser se charge ensuite de réafficher la page une fois la structure mémoire de la page mise à jour par le JS/TS.

Ici, comme nous utilisons React, nous faison de la programmation "déclarative". Nous déclarons des UI (via des composants React), et si nous souhaitons rafraichir les pages, nous devons :
- déclarer un état associé à notre UI. L'état de notre application, c'est toutes les variables qui vont pouvoir amener à un changement de notre UI.
- attacher notre UI à des variables d'état.
- attacher des fonctions à notre UI qui permettent de gérer les événements. Lors d'un event, ces fonctions doivent informer React qu'il y a eu un changement d'état.
- laisser la magie de l'outil (React ici) mettre à jour toutes les parties de l'UI qui sont impactées par le changement d'état : on parle de "re-rendering".
Ce mécanisme permet de bien simplifier et optimiser le rendering d'UI.

Voyons ce que ça donne dans la pratique !

### Composant stateful
Un composant "stateful" est un composant qui a un état, c'est à dire au moins une variable qui va permettre de rafraichir l'UI.

Pour notre tutoriel, nous allons créer la variable d'état `messagePrinted` qui sera un booléan permettant de savoir si l'on affiche ou pas le message caché du `Header`. Nous allons aussi avoir une fonction `setMessagePrinted` pour changer la valeur du booléen.

Mettons à jour le composant `Header` (qui se trouve dans `/src/components/Main/index.tsx`) :
```tsx
import { useState } from "react";
import "./Header.css";

interface HeaderProps {
  title: string;
  version: number;
}

const Header = ({ title, version }: HeaderProps) => {
  const [menuPrinted, setMenuPrinted] = useState(false);

  return (
    <header onClick={() => setMenuPrinted(!menuPrinted)}>
      <h1 className="animate__animated animate__bounce">
        {menuPrinted ? `${title}... and rarely do we hate it!` : title}
      </h1>
      <h4>Version: {version}</h4>
    </header>
  );
};

export default Header;
```

D'abord, nous avons importé le hook `useState` de React, qui permet aux composants fonctionnels de gérer leur état interne.

`useState(false)` initialise une variable d'état `menuPrinted` avec une valeur initiale de `false`.
`setMenuPrinted` est une fonction qui permet de mettre à jour l'état `menuPrinted`. Elle est conventionnellement nommée avec `set` suivi du nom de la variable d'état (`MenuPrinted` dans ce cas).

Ce code : 
```tsx
<header onClick={() => setMenuPrinted(!menuPrinted)}>
```

Cela attache un gestionnaire d'événements `onClick` à l'élément `<header>`.
`onClick` s'attend à recevoir une fonction ! Ici on lui a passé une 'function arrow' qui ne prend aucun paramètre.
Lorsqu'il est cliqué, la fonction bascule l'état `menuPrinted` en appelant `setMenuPrinted(!menuPrinted)`. Si menuPrinted est false, il le définit à true, et vice versa.

Le fait d'avoir utilisé la fonction `setMenuPrinted` qui permet de changer l'état va informer React qu'il y a eu un changement d'état ! Et donc React va opérer un re-render.

Lorsqu'un composant React subit un re-render, seule la fonction de rendu (c'est-à-dire la fonction qui contient le `return` et définit l'interface utilisateur du composant) est réévaluée.

Finalement, lors du rerender, nous allons assurer un rendu conditionnel sur base de la variable d'état :
```tsx
{menuPrinted ? `${title}... and rarely do we hate it!` : title}
```

Notons que nous avons utilisé ici l'opérateur ternaire :  
`condition ? valeurSiVraie : valeurSiFausse`

Cette opérateur permet d'avoir du code plus concis. Si nous ne l'avions pas utilisé, nous aurions du écrire qqch du style :
```tsx
const Header = ({ title, version }: HeaderProps) => {
  const [menuPrinted, setMenuPrinted] = useState(false);

  if (!menuPrinted) {
    return (
      <header onClick={() => setMenuPrinted(!menuPrinted)}>
        <h1 className="animate__animated animate__bounce">{title}</h1>
        <h4>Version: {version}</h4>
      </header>
    );
  }

  return (
    <header onClick={() => setMenuPrinted(!menuPrinted)}>
      <h1 className="animate__animated animate__bounce">
        {`${title}... and rarely do we hate it!`}
      </h1>
      <h4>Version: {version}</h4>
    </header>
  );
};
```



## Gestionnaire d'événements

Un gestionnaire d'événement est une fonction.

```tsx
const Header = ({ title, version }: HeaderProps) => {
  const [menuPrinted, setMenuPrinted] = useState(false);

  return (
    <header onClick={() => setMenuPrinted(!menuPrinted)}>
      <h1 className="animate__animated animate__bounce">
        {menuPrinted ? `${title}... and rarely do we hate it!` : title}
      </h1>
      <h4>Version: {version}</h4>
    </header>
  );
};
```

Nous pouvons définir cette fonction comme "function arrow" (comme fait ci-dessus),
mais aussi comme fonction anonyme ou fonction nommée.

Lorsqu'une fonction commence à avoir plusieurs instructions, il est recommandé de créer une fonction nommée.  
En voici un exemple à reprendre dans votre tutoriel dans le composant `Header` :

```tsx
const Header = ({ title, version }: HeaderProps) => {
  const [menuPrinted, setMenuPrinted] = useState(false);

  const handleClick = () => {
    console.log(`value of menuPrinted before click: ${menuPrinted}`);
    setMenuPrinted(!menuPrinted);
  }

  return (
    <header onClick={handleClick}>
      <h1 className="animate__animated animate__bounce">
        {menuPrinted ? `${title}... and rarely do we hate it!` : title}
      </h1>
      <h4>Version: {version}</h4>
    </header>
  );
};
```

👍 Il est recommandé que vos fonctions de gestion d'événements recoivent un unique paramètre et portent un nom qui commence par "handle" afin de les identifier facilement.


⚡️ Attention, un gestionnaire d'événement doit recevoir une fonction en valeur !  
Une erreur classique est de lui passer l'appel d'une fonction, comme par exemple : 
```tsx
<header onClick={handleClick()}>
```

Ici ça veut dire que dès que le composant est build, on va automatiquement faire l'appel à `handleClick`, bien qu'il n'y ait pas eu de clic...

Allez-y, veuillez tester pour voir ce que cette erreur classique provoque...
`Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.` 😱.

💭 Veuillez prendre un moment, au niveau de la compréhension de React, pour voir si vous savez expliquer pourquoi on va vers une boucle infinie.

Exercice : destructing & composant stateful

Veuillez créer un nouveau projet en utilisant les technos Vite + React + TS + SWC nommé `/exercises/XY` dans votre git repo.

Par défaut, le projet de base vous offre déjà un compteur de clic.

Commencez par comprendre ce code et externaliser le compteur de clics dans un composant stateful nommé `ClickCounter`. 

Une fois tout fonctionel et le code compris, veuillez faire un commit avec le message suivant : "new:exXY".

Mettez à jour ce composant pour afficher :
- un titre qu'il reçoit en props. 
- un message sous le nombre de clics à afficher seulement à partir de 10 clics. Ce message doit être passé en props. Vous passerez cette valeur pour votre application : "You are a master in the art of clicking !".


Veuillez utiliser le destructing (assignement) comme vu dans le cours.

Une fois tout fonctionel, veuillez faire un commit avec le message suivant : "new:exXY".

Veuillez reprendre votre projet précédent et ajouter deux gestionnaires d'événements qui permettront : 
- lors du passage de la souris sur le compteur, d'afficher un message au dessus du comptage de clics. Notez que ce message doit aussi être passé en props à `ClickCounter`.  
Vous passerez cette valeur pour votre application : "Please click on me now !".
- lorsque la souris quitte le compteur, ce message doit être enlevé.

Une fois tout fonctionel, veuillez faire un commit avec le message suivant : "new:exXY".

🤝 Tips :
- Vous allez devoir gérer une nouvelle variable d'état pour savoir si la souris est sur le compteur ou si la souris a quitté le compteur.
- Quels gestionnaires d'événements ? Commencer à taper `on` en propriétés de l'élément sur lequel vous voulez écouter les passages de souris et vous verrez la liste de tous les événements. 
- Vous ne voyez toujours pas ? `onMouseEnter`, `onMouseLeave` ; )
- N'hésitez pas à utiliser tout ce qui existe déjà dans `index.css` concernant le button pour vous aider à gérer l'aspect visuel du compteur.

🍬 Challenge : paramètres optionnels
Tentez de rendre les 2 messages passés en props à `ClickCounter` optionnels, tout en leur donnant une valeur par défaut.

Exercice : composant stateful

Nous allons continuer le projet d'un exercice précédent qui se trouve dans le dossier `/exercises/XY` dans votre git repo.

Notre client a rajouté dans les données des images associées aux films une courte description. Veuillez créer un nouveau composant `Movie` qui doit permettre :
- D'afficher les mêmes données de films qui sont actuellement toutes traitées dans le composant `Cinema`(`Cinema` fera donc appel à `Movie`) ;
- D'afficher la description d'un film si les utilisateurs cliquent sur le film ;
- De ne plus afficher cette description si les utilisateurs cliquent dessus.

Voici le nouveau format des données :
```ts
const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";

  const moviesCinema1 = [
    {
      title: "HAIKYU-THE DUMPSTER BATTLE",
      director: "Susumu Mitsunaka",
      description:
        "A high-energy sports anime movie focusing on the intense volleyball rivalry between Karasuno High and their fierce competitors.",
    },
    {
      title: "GOODBYE JULIA",
      director: "Mohamed Kordofani",
      description:
        "A poignant drama that explores themes of love, loss, and the complex dynamics of human relationships in a deeply emotional narrative.",
    },
    {
      title: "INCEPTION",
      director: "Christopher Nolan",
      description:
        "A mind-bending sci-fi thriller where a skilled thief, who enters people's dreams to steal secrets, is given a chance to have his criminal record erased if he can implant an idea into a target's subconscious.",
    },
    {
      title: "PARASITE",
      director: "Bong Joon-ho",
      description:
        "An Oscar-winning dark comedy thriller that examines class disparities through the story of two families — one wealthy, the other destitute — and their increasingly complicated relationship.",
    },
  ];

  const cinema2Name = "UGC Toison d'Or";

  const moviesCinema2 = [
    {
      title: "THE WATCHERS",
      director: "Ishana Night Shyamalan",
      description:
        "A suspenseful thriller that follows a group of people who are under constant surveillance, leading them to uncover dark secrets about their observers and themselves.",
    },
    {
      title: "BAD BOYS: RIDE OR DIE",
      director: "Adil El Arbi, Bilall Fallah",
      description:
        "The latest installment in the action-packed Bad Boys franchise, featuring detectives Mike Lowrey and Marcus Burnett as they take on their most dangerous case yet.",
    },
    {
      title: "TENET",
      director: "Christopher Nolan",
      description:
        "A complex and visually stunning sci-fi action film where a protagonist embarks on a time-bending mission to prevent World War III, navigating through a world of temporal inversion.",
    },
    {
      title: "THE IRISHMAN",
      director: "Martin Scorsese",
      description:
        "An epic crime drama that chronicles the life of Frank Sheeran, a mob hitman, as he reflects on his involvement with the Bufalino crime family and the mysterious disappearance of his friend, Jimmy Hoffa.",
    },
  ];
  //... the following does not change
```

Une fois tout fonctionel, veuillez faire un commit avec le message suivant : "new:exXY".
