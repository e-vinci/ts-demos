# Introduction aux modules et aux collections 
## Les modules
En TypeScript, les modules sont définis en utilisant des fichiers séparés. Chaque fichier `.ts` ou `.tsx` est considéré comme un module. Vous pouvez exporter et importer des fonctionnalités (fonctions, classes, variables, interfaces, etc.) entre ces fichiers.

Conventions pour le cours : 
- A partir de maintenant, nous allons créer un fichier pour chaque composant React.
Cela permet de mieux structurer le code de nos applications, de rendre le code plus maintenable.
- De plus, nous allons créer un dossier par famille de composants.

Nous placerons chaque composant créé dans son propre fichiers : `src/components/[ComponentName].jsx`

Si un composant est lié à une famille de composant, nous le placerons dans :
- pour le composant "racine" : `src/components/[ComponentName]/index.jsx`
- pour les composants liés au composant "racine" : `src/components/[ComponentName]/[ComponentName].jsx`

### Exporter et Importer par Défaut
#### Exporter par Défaut
Vous pouvez avoir un seul export par défaut par fichier. L'export par défaut peut être une fonction, une classe, une variable, etc.

```ts
// math.ts
const multiply = (a: number, b: number): number => {
  return a * b;
};

export default multiply;
```

#### Importer un Export par Défaut
Lorsqu'un objet a été exporté via un "default export", on l'importe en lui donnant le nom que l'on souhaite à l'import et en indiquant le chemin vers le module à utiliser.

👍 Néanmoins, afin de ne pas créer la confusion, nous recommandons d'utiliser le même nom que celui utilisé lors de l'export.

```ts
import multiply from './math';

console.log(multiply(2, 3)); // 6
```

👍 Il est recommandé, lorsqu'on indique le chemin du module que l'on importe, de ne pas indiquer l'extension du nom de fichier (`.ts` ou `.tsx`). Cela rend le code plus lisible. D'ailleurs, votre linter va vous forcer à ne pas indiquer les extensions de vos modules.

🤝 Il est possible d'utiliser l'autocompletion pour générer le chemin vers un "default export module". Il suffit de taper ici `import multiply` et d'appuyer sur `Enter` et VS Code générera automatiquement le chemin (path) du module.

Notons qu'ici nous aurions pu donner n'importe quel nom à la fonction `multiply` lors de l'import, par exemple :
```ts
import times from './math';

console.log(times(2, 3)); // 6
```

Lorsque l'on importe le composant "racine" d'une famille de composants se trouvant dans un dossier, ce composant doit se trouver dans un module `index.tsx`. Ainsi, l'import se fera avec `import Footer from './Footer'` (et pas `import Footer from './Footer/index'`);

Il est aussi possible d'importer des objets de packages offerts par la communauté via votre gestionnaire de package.
Pour ce faire, il est juste nécessaire d'indiquer le nom du package lors de l'import.

Pour un "default import", il faut trouver un package qui met à disposition un seul objet, ce qui est peu commun.

En voici un exemple, l'import d'une librairie permettant de réaliser des animations :
```ts
import anime from 'animejs/lib/anime.es.js';
```

Bien sûr, avant d'importer un objet d'un package, il faut l'avoir préalablement installé 😉.

### Exporter et Importer via des noms
#### Exporter par Défaut
Lorsque l'on souhaite exporter plusieurs objets (fonctions, constantes, objets, classes, interfaces...), nous allons généralement le faire via une "named export", à la fin du script.

```ts
// ... some code to define three functions

export { setPageTitle, setHeaderTitle, setFooterTitle };
```

Il est aussi possible de faire des "named export" à la volée en utilisant export à différents endroits d'un script :
```ts
export function setPageTitle(title:string){
  // Definition of function
}

export function setHeaderTitle(title:string){
  // Definition of function
}

export function setFooterTitle(title:string){
  // Definition of function
}
```

👎 Bien que cette façon se retrouve régulièrement dans des exemples sur le web, nous déconseillons les exports à la volée. 

👍 En effet, il est bien plus clair de trouver tous les exports à la fin d'un script. Ainsi, nous ne perdons pas de temps à les chercher dans le corps du script.

#### Importer un named export
Lorsqu'un objet a été exporté via un "Named export", on l'importe en utilisant des accolades et en indiquant le chemin vers le module à utiliser.

Par exemple, pour importer les fonctions setPageTitle et setHeaderTitle définies ci-dessus, il suffit de faire :
```ts
import { setPageTitle, setHeaderTitle } from './utils/render';;
```

Si l'on souhaitait changer le nom, on pourrait le faire via le mot-clé `as` :

```ts
import { setPageTitle as renderPageTitle, setHeaderTitle as renderHeaderTitle} from './utils/render';;
```

## Tutoriel 
Pour ce tutoriel, veuillez créer une copie du tutoriel `components` et l'appeler `collections`. Changer le nom du projet dans `package.json`.

Veuillez restructurer toute l'application pour que chaque composant React se trouve dans son propre module, au sein d'un nouveau répertoire `/src/components`.

Veuillez déplacer `App.css` et `App.tsx` dans le dossier `/src/components/App` et renommer `/src/components/App/App.tsx` en `/src/components/App/index.tsx`.

Ensuite, créez trois nouveaux modules & dossiers :
- `/src/components/Header/index.tsx`: dans ce module, ajouter le code du composant `Header` qui se trouve dans le composant `App` et n'oubliez pas d'exporter `Header`.
- `/src/components/Main/index.tsx`: dans ce module, ajouter le code du composant `Main` qui se trouve dans le composant `App` et n'oubliez pas d'exporter `Main`.
- `/src/components/Footer/index.tsx`: dans ce module, ajouter le code du composant `Footer` qui se trouve dans le composant `App` et oubliez pas d'exporter `Footer`.

Maintenant, mettez à jour le composant `App` afin de supprimer la définition des composants exportés (`Header`, `Main` & `Footer`).

Veuillez vérifier que votre application fonctionne correctement.

A ce stade-ci, nous remarquons que le CSS pour nos nouveaux composants se trouve toujours dans `App.css`. Cela fonctionne ainsi, car le CSS appliqué à un composant parent s'applique à ses enfants.  
Néanmoins, si nous souhaitons réellement avoir des composants entièrement réutilisables, alors il est intéressant de créer un fichier `.css` pour chaque nouveau composant :
- `/src/components/Header/Header.css` : veuillez y ajouter le code CSS associé qui se trouve dans `App.css` (et l'effacer de `App.css`). Dans `/src/components/Header/index.tsx`, veuillez importer la nouvelle feuille de style associée : `import "./Header.css";`
- `/src/components/Main/Main.css` : veuillez y ajouter le code CSS associé qui se trouve dans `App.css` (et l'effacer de `App.css`). Dans `/src/components/Main/index.tsx`, veuillez importer la nouvelle feuille de style associée : `import "./Main.css";`
- `/src/components/Footer/Footer.css` : veuillez y ajouter le code CSS associé qui se trouve dans `App.css` (et l'effacer de `App.css`). Dans `/src/components/Footer/index.tsx`, veuillez importer la nouvelle feuille de style associée : `import "./Footer.css";`

Ainsi, si je veux réutiliser le composant Header dans un futur projet, je n'aurai qu'à copier l'entièreté du dossier `/src/components/ComponentName` dans ce projet.

## Les collections
Très souvent nous allons vouloir générer des UI à partir de collections de données.

Par exemple, à cette étape-ci, si nous souhaitions afficher un menu de pizzas dans notre interface, nous allons souhaiter le faire sur base d'un tableau d'objets représentant des pizzas.

Voici à quoi ressemble actuellement le composant `App` : 
```tsx
import "./App.css";
import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";

function App() {
  return (
    <div className="page">
      <Header title="We love Pizza" version={0 + 1} />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
```

Ici, nous décidons que dans la famille de composants `Main`, nous souhaitons ajouter un composant `PizzaMenu` qui devra afficher toutes les pizzas de la pizzeria sur base d'un array d'objets.

Voici le code du nouveau composant `src/components/Main/PizzaMenu.tsx` :
```tsx
const pizzas = [
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

const PizzaMenu = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Pizza</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {pizzas.map((pizza) => (
          <tr>
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

`pizzas` contient un tableau d'objets représentant des pizzas.  
La fonction `map` permet d'itérer sur chacun des objets de `pizzas` et de générer un nouvel array d'éléments React qui seront rendus par React le moment venu.  Ici la fonction `map` génére un array de `<tr>`, les lignes au sein de la future `table` HTML qui sera rendue par React dans le browser.

Comme le code qui génère les `<tr>` est du TS/JS, il doit se trouver entre accolades.

Voici le code du composant `Main` (dans `/src/components/Main/index.tsx` mis à jour pour utiliser `PizzaMenu` : 
```tsx
const Main = () => {
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
    </main>
  );
};
```

N'oubliez pas d'importer le module `PizzaMenu` dans `Main`.

Il est temps de voir le résultat visuel. Wow, nous avons généré dynamiquement un tableau HTML sur base d'une collection de données !

Il nous reste plus qu'à améliorer le design du menu. Pour ce faire, nous pouvons le faire à l'aide d'un nouveau fichier `/src/components/Main/PizzaMenu.css` dans lequel nous allons créer une classe :
```css
.pizza-menu {
  margin: 0 auto;
  padding: 5px;
  border: 1px solid black;
  background-color: red;
}
```

Cette classe devrait nous permettre de centrer le tableau, d'ajouter une bordure et d'avoir un background rouge.

Pour appliquer cette classe, il faut mettre à jour le composant `PizzaMenu` en important `PizzaMenu.css` et en ajoutant la classe à `<table>` :
```tsx
import "./PizzaMenu.css";

// Definition of pizzas ...

const PizzaMenu = () => {
  return (
    <table className="pizza-menu">
    //...
```

Veuillez constater le résultat visuel du site de la pizzeria !  C'est pas mal !

⚡️ Veuillez jeter un oeil à la console de votre browser... Il y a un sérieux message d'avertissement : "Each child in a list should have a unique "key" prop.".

## L'attribut "key"

React utilise l'attribut `key` d'elements React qui se trouve dans un array afin de déterminer comment mettre à jour la vue générée par un composant quand il est re-render.

Il est donc important d'ajouter une clé. Mettons à jour le code de `PizzaMenu` :
```tsx
{pizzas.map((pizza) => (
          <tr key={pizza.id}>
            <td>{pizza.title}</td>
            <td>{pizza.content}</td>
          </tr>
        ))}
```

Notre application ne contient plus de messages d'avertissement.

### Exercice : modules & collection
Nous allons continuer le projet de votre exercice précédent qui se trouve dans le dossier `/exercises/XY` dans votre git repo.

Notre client nous a donné une nouvelle version des données d'entrée du composant `App`,ainsi qu'une idée du résultat du composant `App` :
```tsx
const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";

  const moviesCinema1 = [
  {
    title: "HAIKYU-THE DUMPSTER BATTLE",
    director: "Susumu Mitsunaka",
  },
  {
    title: "GOODBYE JULIA",
    director: "Mohamed Kordofani",
  },
  {
    title: "INCEPTION",
    director: "Christopher Nolan",
  },
  {
    title: "PARASITE",
    director: "Bong Joon-ho",
  },
];

const cinema2Name = "UGC Toison d'Or";

const moviesCinema2 = [
  {
    title: "THE WATCHERS",
    director: "Ishana Night Shyamalan",
  },
  {
    title: "BAD BOYS: RIDE OR DIE",
    director: "Adil El Arbi, Bilall Fallah",
  },
  {
    title: "TENET",
    director: "Christopher Nolan",
  },
  {
    title: "THE IRISHMAN",
    director: "Martin Scorsese",
  },
]; 

  
  return (
    <div>
      <PageTitle title={pageTitle} />

      <Cinema name={cinema1Name} movies= {moviesCinema1} />

      <Cinema name={cinema2Name} movies={moviesCinema2} />
    </div>
  );
};
```

Veuillez mettre à jour le composant `Cinema` pour prendre en compte ces nouvelles props.  

De plus, vous devez appliquer les conventions vues dans le cours : chaque composant React doit se trouver dans son propre module.

🤝 Tips :
- Pour définir comme type un array d'un certain type en TS, il suffit d'ajouter des crochets `[]` à la suite du type. Par exemple, pour un array de `Movie` : `movies: Movie[];`

Une fois tout fonctionel, veuillez faire un commit avec le message suivant : "new:exXY"


# Passer du TSX comme enfant : props.children

Parfois nous souhaitons créer un composant à partir d'autres composants.  
Mais comment faire qqch de ce style là ?

```tsx
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
```

Nous allons créer un composant `DrinkCard` qui encapsule du contenu (JSX) via `props.children`. Dans `/src/components/Main/DrinkCard.tsx`, veuillez ajouter :
```tsx
interface DrinkCardProps {
  title: string;
  image: string;
  children: React.ReactNode;
}

const DrinkCard = (props: DrinkCardProps) => {
  return (
    <div className="drink-card">
      <img src={props.image} alt={props.title} className="drink-image" width="50"/>
      <h2>{props.title}</h2>
      <div className="drink-details">{props.children}</div>
    </div>
  );
};

export default DrinkCard;
```

`props.children` permet d'encapsuler des détails spécifiques sur chaque boisson (volume, prix, etc.).  Nous utilisons `React.ReactNode` comme type pour `children` car ça peut être tout type d'élément React.

Nous allons maintenant créer un composant `DrinkMenu` qui encapsule aussi du contenu (JSX) via `props.children`. Dans `/src/components/Main/DrinkMenu.tsx`, veuillez ajouter :
```tsx
interface DrinkMenuProps {
  title: string;
  children: React.ReactNode;
}

const DrinkMenu = (props: DrinkMenuProps) => {
  return (
    <div className="drink-menu">
      <h4>{props.title}</h4>
      <div className="drink-items">{props.children}</div>
    </div>
  );
};

export default DrinkMenu;
```

`props.children` va permettre d'encapsuler plusieurs composants `DrinkCard`. 

💭 Attention qu'ici, comme les children sont n'importe quel type d'élément React (`React.ReactNode`), il serait possible d'ajouter n'importe quoi... 
Comme nous codons en TS, nous pourrions tenter d'utiliser sa force de pouvoir typer de manière stricte, et n'autoriser :
- que les `children` de type `DrinkCard` s'il n'y a qu'un élément passé à `DrinkMenu`
- que les `children` de type array de `DrinkCard`

Voila comment on mettrait à jour `DrinkMenuProps` :
```tsx
import { ReactElement } from "react";
import DrinkCard from "./DrinkCard";

interface DrinkMenuProps {
  title: string;
  children: ReactElement<typeof DrinkCard> | ReactElement<typeof DrinkCard>[];
}
```

Néamoins, en TS, tous les éléments JSX ont le type JSX.Element. Il n'est donc pas possible de simplement utiliser le typage stricte pour impose le type des éléments de `props.children`.

Nous allons maintenant utiliser les composants DrinkMenu et DrinkCard pour afficher un menu de boissons. Dans le composant `Main` (`src/components/Main/index.tsx`), veuillez ajouter :
```tsx
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
```

Veuillez vous assurer que visuellement tout fonctionne.  
Ca n'est pas des plus beaux, mais nous n'irons pas plus loin pour ce tutoriel-ci.

# Exercice : utilisation de props.children & css
Nous allons continuer le projet de votre exercice précédent qui se trouve dans le dossier `/exercises/XY` dans votre git repo.

Veuillez créer deux nouveaux composants : `Header` & `Footer`. 
Il doit être possible :
- d'ajouter n'importe quel type de contenu dans ces deux composants en tant qu'enfants.
- d'afficher un logo (une image) dont l'URL est à passer en propriété. 

Veuillez utiliser vos nouveaux composants pour améliorer votre application web et afficher un header et un footer.

N'oubliez pas d'appliquer les conventions vues dans le cours : chaque composant React doit se trouver dans son propre module,...

Une fois tout fonctionel, veuillez faire un commit avec le message suivant : "new:exXY".

🤝 Tips :
- Pour vos images, n'hésitez pas à aller sur le site https://unsplash.com/ ou https://www.istockphoto.com/.  
Une fois une image trouvée, vous pouvez cliquer dessus, puis clic droit pour récupérer l'adresse du lien et l'utiliser dans votre code ; )

🍬 Exercice optionnel : peauffinage du layout de la page
S'il vous reste du temps, n'hésitez pas à peauffiner le layout de votre page et de vos composants à l'aide de CSS.

Une fois tout fonctionel, veuillez faire un commit avec le message suivant : "new:exXY".


# Resources
- photo de : https://unsplash.com/ (Sahand Hoseini)
- musique de : https://freemusicarchive.org/music/Infecticide : Infecticide - Chansons Tristes - 11. Infecticide - Pizza Spinoza