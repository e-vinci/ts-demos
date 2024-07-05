# Introduction aux composants React

## Pizzeria classique vers React
### Création et exécution d'un projet React TypeScript & SWC

Via CLI :
```bash
npm create vite@latest
```

Veuillez choisir un nom de projet "components" et ces technos:
- React
- TypeScript + SWC (Speedy Web Compiler, Rust-based)

Pour exécutez votre projet
```bash
npm i
npm run dev
```

Il est possible de créer un projet avec une seule ligne de commande, sans passer par le mode interactif, en sélectionnant les technologies appliquées dans ce cours :
```bash
npm create vite@latest PROJECT_NAME -- --template react-swc-ts
```


### Les composants React

`App.jsx` définit un "React component" ayant le nom `App`.

Ce composant est en fait une fonction JavaScript. Elle ressemble à cela :
```js
function App() {
  return (
    // Qqch qui ressemble à de l'HTML
  )
}
export default App
```

Un **composant** React doit :
- toujours **commencer** par une **majuscule** !  Sinon React ne serait pas capable de distinguer entre de simples balises HTML et vos composants. 
- doit renvoyer un seul élément. Par exemple, cela n'est pas autorisé et ne compilerait pas :
```tsx
function App() {
  return (   
      <Header title="We love Pizza" version={0+1} />
      <Main />
      <Footer />
  );
}
```
Nous pourrions soit renvoyer tout cela dans une `div, ou utiliser un "fragment", un élément vide (`<></>`) :
```tsx
function App() {
  return (
    <>
      <Header title="We love Pizza" version={0+1} />
      <Main />
      <Footer />
    </>
  );
}
```

C'est une fonction qui doit généralement être exportée à la fin du fichier. N'oubliez jamais d'exporter vos composants React s'ils doivent être importé dans un autre script !


NB : Il y a plusieurs façons de définir des fonctions en JS : function arrows, fonctions nommées, fonctions anonymes... Nous verrons cela plus en détails plus tard.

`main.tsx` s'occupe de rendre le composant `App` dans une `div`qui a l'id `root`dans `index.html`.

Voici le code de `main.tsx` où l'on va récupére l'accès à la `div#root` (css selector pour indiquer la div qui a l'id root) via `document.getElementById('root')`: 
```js
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

Qu'est-ce que l'opérateur `!`ci-desssus ?
Il permet d'assurer au compilateur que `document.getElementById('root')` ne sera jamais nul... Cela fait partie de la "null safety"... Nous allons expliciter tout cela plus tard.

Qu'est-ce que `<React.StrictMode>` ? Le StrictMode  est conçu pour vous aider à écrire des applications robustes et évolutives tout en adoptant les meilleures pratiques recommandées par l'équipe de React : aide à la détection de problèmes comme des pratiques dépréciées, double rendu temporaire en développement pour détecter des effets secondaires lors d'opération de lecture & écriture d'états dans des composants...
⚡️ Pensée pour plus tard...  
Pensez à vous souvenir, si un jour vous ne comprenez pas pourquoi un composant est render 2x au lieu d'une 1X, que c'est probablement par que vous êtes en StrictMode...

Voici le code de `index.html` :
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### TSX
Regardez bien le fichier `App.tsx` : il semblerait que les composants React retournent des balises HTML. 
Mais ça n'est pas le cas !  
Bien que TSX ressemble à l'HTML, c'est finalement du JS qui sera compilé...


#### Compilation
1. Transpilation TypeScript vers JavaScript: Le code TSX est transpilé en JavaScript par le compilateur TypeScript (tsc). Ce processus convertit le code TypeScript en code JavaScript tout en supprimant les annotations de type.
2. Conversion JSX/TSX vers JavaScript: Le JSX/TSX est également transformé en appels `React.createElement`, qui est la forme JavaScript compréhensible par le moteur JavaScript.
Par exemple, pour ce composant TSX permettant d'afficher un message de bienvenue (nous verrons plus tard la syntaxe associée) :
```tsx
import React from 'react';

interface GreetingProps {
  name: string;
}

const Greeting = ({ name }: GreetingProps) => {
  return <h1>Hello, {name}!</h1>;
};

export default Greeting;
```

Ce composant ci-dessus serait compilé en JavaScript de la manière suivante :

```tsx
const Greeting = ({ name }) => {
  return React.createElement("h1", null, `Hello, ${name}!`);
};
```

#### Exécution
Le code résultant est du JavaScript standard. Les navigateurs et les environnements d'exécution JavaScript (comme Node.js) exécutent ce code JavaScript. Ils ne comprennent pas TypeScript directement, donc tout le code TypeScript doit être compilé en JavaScript avant l'exécution.

#### Résumé
- Écriture: Les composants sont écrits en TSX (TypeScript + JSX).
- Compilation: Le code TSX est compilé en JavaScript par le compilateur TypeScript.
- Exécution: Le code compilé est du JavaScript standard, qui est exécuté par le navigateur ou l'environnement JavaScript.

En conclusion, bien que les composants soient écrits en TypeScript (TSX) pour bénéficier de ses fonctionnalités, le code exécuté par React et le navigateur est du JavaScript.


### Prise en main d'un environnement Vite React TS
Pour rentrer dans le vif du sujet, nous allons convertir l'application associée à une pizzeria qui a été développée "old school", et l'intégrer dans notre environnement Vite React TS SWC...
Veuillez copier le code HTML dans `App.tsx` (qui provient de : https://github.com/e-vinci/js-demos/tree/main/frontend/frontend-essentials/classic-hmi) :
```tsx
import "./App.css";

function App() {
  return (
    <>
      <header>
            <h1 class="animate__animated animate__bounce">We love Pizza</h1>
          </header>

          <main>
            <p>My HomePage</p>
            <p>
              Because we love JS, you can also click on the header to stop / start the
              music ; )
            </p>

            <audio id="audioPlayer" controls autoplay>
              <source
                src="./sound/Infecticide-11-Pizza-Spinoza.mp3"
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
          </main>

          <footer>
            <h1 class="animate__animated animate__bounce animate__delay-2s">
              But we also love JS
            </h1>
            <img src="./img/js-logo.png" alt="" />
          </footer>
        </>
  );
}

export default App;
```

Pour adapter le code à React, il faut transformer : 
- `class` en `className`
- `autoplay` en `autoPlay`

Veuillez ajouter le fichier audio dans :` /src/assets/sounds/Infecticide-11-Pizza-Spinoza.mp3`


Si vous changez le chemin vers le fichier audio dans `App.ts` :
```tsx
<audio id="audioPlayer" controls autoplay>
        <source
          src="./assets/sounds/Infecticide-11-Pizza-Spinoza.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
```

Ca ne fonctionne pas !
En effet, vous utilisez Vite comme module bundler. Le fichier n'est pas servi là où vous le pensez.

### Import d'assets statiques
#### Introduction
Lors de la compilation, vos assets (fichiers statiques tels que des images, des sons, des vidéos, des scripts...) pourrons être optimisés par votre module bundler et se trouveront dans un répertoire et sous un nom que vous ne maitrisez pas.

Pour connaître donc le chemin exact de votre fichier à la compilation, vous devez le demander à votre application en faisant un `import`.

#### Import de sons
Changer `App.tsx` pour y importer le fichier son de la pizzeria : 
```tsx
import sound from "./assets/sounds/Infecticide-11-Pizza-Spinoza.mp3"

// Reste du code

 <audio id="audioPlayer" controls autoPlay>
          <source
            src={sound}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
</audio>
```

La variable `sound` contient le chemin du fichier son lors de la compilation.

#### Import d'images 
Veuillez ajouter les deux images `js-logo.png` et `pizza.jpg`et le svg pizza-svgrepo-com.svg dans `/src/assets/images`.

Dans `App.tsx`, veuillez commencer par importer les deux images :
```tsx
import logo from "./assets/img/js-logo.png";
import pizzaBackground from "./assets/img/pizza.jpg";
```

Ces deux variables peuvent être utilisées comme chemins dans nos balises `img`.

Pour le footer, il est simple de faire le lien vers le logo de JS :
```tsx
<footer>
        <h1 className="animate__animated animate__bounce animate__delay-2s">
          But we also love JS
        </h1>
        <img src={logo} alt="" />
</footer>
```

Par contre, pour avoir une image de background, ça n'est pas si évident. Pour rappel, React s'occupe d'offrir un point d'accès au fichier index.html, à une `div#id` qui se trouve dans le `body`.

Une des façons de faire, c'est que nous pourrions créer une nouvelle balise `div` comme premier élément de `App`, et changer son `style` pour avoir une `backgroundImage`:

```tsx
function App() {
  return (
    <div style={{ backgroundImage: `url(${pizzaBackground})` }}>
      <header>
        <h1 className="animate__animated animate__bounce">We love Pizza</h1>
      </header>

      <main>
        <p>My HomePage</p>
        <p>
          Because we love JS, you can also click on the header to stop / start
          the music ; )
        </p>

        <audio id="audioPlayer" controls autoPlay>
          <source src={sound} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </main>

      <footer>
        <h1 className="animate__animated animate__bounce animate__delay-2s">
          But we also love JS
        </h1>
        <img src={logo} alt="" />
      </footer>
    </div>
  );
}
```

Veuillez regarder le résultat visuel actuel dans votre browser. Cela n'est pas très beau, il y a du travail à faire au niveau du CSS.

### Gestion du CSS
#### Introduction
Nous souhaitons reprendre le style de l'application initial, tout en intégrant la philosophie proposée par React pour gérer les fichiers `.css`. 

#### Style général du layout de toutes les pages
Pour ce faire, nous voyons que `index.css` permet de gérer le style de `index.html`, pour ce qui concerne principalement le style de la balise `html` et `body`. 

Nous allons remplacer `index.css` par ce contenu afin d'ajouter une image d'une pizza en background :
```css
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

html {
  background-image: url(./assets/images/pizza.jpg);
  background-size: cover;
}
```

On peut voir ici avec `url(./assets/images/pizza.jpg)` que notre outil `Vite` va s'occuper d'importer le fichier `pizza.jpg` et de récupérer le bon chemin vers ce fichier lors du build.

#### Style des composants React
Chaque composant React devrait pouvoir être réutilisés facilement dans d'autres applications. Ainsi, il est intéressant d'attacher les feuilles de style à leur composant React.  
Si l'on considère le composant `App`, son style va être géré par un fichier nommé `App.css` qui se trouvera dans le même dossier que `App.tsx`.

Veuillez donc donner le style à votre composant `App` en remplaçant le contenu de `App.css` par celui-ci :
```css
div#root {
  height: 100%;
  display: inline-block; /* avoid margins to collapse to avoid vertical scrollbar */
  width: 100%;
}

.page {
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

header {
  text-align: center;
}

main {
  text-align: center;
  /*to easily deal with sticky footer:
   grow the main to fill the space*/
  flex: 1 0 auto;
}

footer {
  text-align: center;
}

footer img {
  height: 50px;
}

footer h1 {
  color: white;
}
```

Nous avons créé un classe `page` qui doit être appliquée à notre première balise `div` dans `App.tsx` :
```tsx
function App() {
  return (
    <div className="page">
```

Veuillez visualiser l'état de notre application : elle commence à ressembler à quelque chose !

### Création de composants React
#### Introduction
Il est intéressant de pouvoir structurer ses applications en plusieurs composants potentiellement réutilisables dans d'autres applications.

Si l'on regarde attentivement notre composant `App`, nous voyons qu'il y a 3 grandes parties : 
- Un Header qui devrait être le même sur toutes les éventuelles futures pages.
- Un Main qui reprendra le contenu intéressant associé à chaque page.
- Un Footer qui là aussi devrait être le même sur toutes les éventuelles futures pages.

Dès lors, nous pourrions créer trois composants React pour mieux structurer notre page.

#### Création de composants internes à un composant
Si nous partions de l'hypothèse que :
- nous ne souhaitons jamais réutiliser le Header, le Main et le Footer à l'extérieur de `App.tsx`, 
- le code de` App.tsx` n'est pas trop volumineux,
alors il est totatlement acceptable de considérer créer ces composants à l'intérieur du module `App`. 

Nous appelons un **module** tout script que nous pouvons importer dans notre application.

Voici comment nous pouvons créer 3 composants React et les utiliser au sein du composant `App`. Veuillez mettre à jour `App.tsx` : 
```tsx
function App() {
  return (
    <div className="page">
      <Header></Header>
      <Main />
      <Footer />
    </div>
  );
}

const Header = () => {
  return (
    <header>
      <h1 className="animate__animated animate__bounce">We love Pizza</h1>
    </header>
  );
};

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
    </main>
  );
};

const Footer = () => {
  return (
    <footer>
      <h1 className="animate__animated animate__bounce animate__delay-2s">
        But we also love JS
      </h1>
      <img src={logo} alt="" />
    </footer>
  );
};

export default App;

```

Nous voyons que chaque nouveau composant a été défini ici comme une **function arrow**.  
Ensuite, afin d'utiliser un composant, nous crééons ce que nous appelons un élément React d'un composant. Ici, `<Header />` est un élément du composant `Header`. 

Tout comme en HTML, la "balise" `<Header />` est la contraction de `<Header></Header>`.  



Notre code devient nettement plus lisible avec ces nouveaux composants. 
Il se lit comme une histoire, j'ai une `App` qui est constituée de 3 éléments... Si je veux les détails de chaque composant associé à un élement, il suffit d'aller plus bas et de lire le code associé.

### Eléments multiples

Si nous souhaitons avoir trois Headers dans notre page, il suffit de faire appel trois fois à `<Header/>` au sein de `App` :
```tsx
function App() {
  return (
    <div className="page">
      <Header/>
      <Header/>
      <Header/>
      <Main />
      <Footer />
    </div>
  );
}
```

### Exercice : création de composants intégrés
Veuillez créer un composant `MainTitle` permettant d'afficher le titre de l'application.


### Les props et la définition de type
Il est intéressant de pouvoir passer des données à ses composants. Nous le faisons à l'aide de ce que nous appelons en React, des **props**.

Cela va nous permettre de créer des composants "configurables" via leur props. C'est intéressant car ça va nous ammener à bénéficier de composants plus facilement réutilisables dans différents contextes.

Par exemple, ici, `Header` devrait pouvoir offrir une propriété permettant de définir le titre du header. Transformons `Header` ainsi :
```tsx
const Header = (props) => {
  return (
    <header>
      <h1 className="animate__animated animate__bounce">{props.title}</h1>
    </header>
  );
};
```

Si vous faites cela et que vous avez installé et activé votre Linter (plus de détails plus loin, l'extension ESLint de VS Code doit être installée), vous verrez que cette fonction JavaScript amène à cette erreur dans votre éditeur de code : `Parameter 'props' implicitly has an 'any' type`.  
Notez aussi que malgré les erreurs de lecture statique de votre code, votre code compile...  
Néanmoins, il est important d'écrire du code propre.

En TypeScript, nous devons spécifier les types des variables au minimum pour les cas où TypeScript ne peut pas "inférer" (ou déduire) le type.  

#### Définition de types
Pour définir un type, en TS, il y a deux principales façons de le faire. Soit à l'aide de `type`, soit à l'aide de `interface`.  
Dans ce cours, nous avons choisi d'utiliser `interface` car c'est ce qui est généralement utilisé dans les librairies tierces, et qui permet le plus de fexibilité (on peut étendre des types définis par d'autres).

Si vous souhaitez approfondir les différences entre `type` et `interface`: https://dev.to/reyronald/typescript-types-or-interfaces-for-react-component-props-1408

Voici comment on défini de la manière la plus claire et la plus concise un type pour les props du composant Header :
```tsx
interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
  return (
    <header>
      <h1 className="animate__animated animate__bounce">{props.title}</h1>
    </header>
  );
};
```

Le type `HeaderProps` est composé d'un `title` uniquement. Le paramètre du composant `Header` reçoit un objet de ce type (via le `props:HeaderProps`) contenant toutes les props que l'utilisateur du composant définit.

Pour le composant `Header`, TS est capable d'inférer le type de retour de la fonction React. Si l'on avait voulu, on aurait pu expliciter le type de retour en `JSX.Element` ainsi :
```tsx
const Header = (props: HeaderProps): JSX.Element => {
  return (
    <header>
      <h1 className="animate__animated animate__bounce">{props.title}</h1>
    </header>
  );
};
```

Nous estimons que dans ce cas, il n'est pas utile d'expliciter le type de retour.

Il aurait aussi été possible d'utiliser du **inline prop type annotation** pour typer `props` ainsi :
```tsx
const Header = (props: {title:string}) => {
  return (
    <header>
      <h1 className="animate__animated animate__bounce">{props.title}</h1>
    </header>
  );
};
```

Cette notation, sans utiliser les interface, est acceptable dans les cas où vous avez des composants très simples, avec peu de props, ou en phase de prototypage (pour aller vite).

En règle générale, vous devez utiliser `interface` pour définir le type de composants que vous souhaitez réutiliser, afin d'améliorer la lisibilité (cohérence entre tous les composants) et la maintenabilité de votre code.

Voici comment on définit les props : 
```tsx
function App() {
  return (
    <div className="page">
      <Header title="We love Pizza"/>
      <Main />
      <Footer />
    </div>
  );
}
```

Si l'on souhaitait ajouter une deuxième propriété qui indiquerait un numéro de version, on pourrait le faire ainsi.
```tsx
interface HeaderProps {
  title: string;
  version:number;
}

const Header = (props: HeaderProps) => {
  return (
    <header>
      <h1 className="animate__animated animate__bounce">{props.title}</h1>
      <h4>Version: {props.version}</h4>
    </header>
  );
};
``` 

On voit que le linter indique une erreur si on ajoute pas la props `version` lorsqu'on créé un élément. Pourtant l'application compile toujours...  
Si l'on souhaite se forcer à écrire du code propre, ça n'est pas une bonne chose que ça compile. Comment indiquer à vite de ne pas compiler si le linter a détecter des erreurs ?  
Il suffit de voir plus loin ; )

Nous allons maintenant ajouter le numéro de version attendu par notre élément de type `Header`:
```tsx
function App() {
  return (
    <div className="page">
      <Header title="We love Pizza" version={0+1} />
      <Main />
      <Footer />
    </div>
  );
}
```

Nous voyons que lorsque nous passons des props, nous pouvons donner comme valeur d'une props le résultat d'une expression JavaScriopt. Toute expression JavaScript (ici une bête addition : `{0+1}`) doit être placée entre accolade au sein du code TSX.

# Exercice : création de composants intégrés
Veuillez créer un nouveau projet en utilisant les technos Vite + React + TS + SWC nommé `/exercises/XY` dans votre git repo.

Veuillez supprimer les fichiers non utilisés (`.css`, assets...).

Voici le code de départ du composant `App` :
```tsx
const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";
  const cinema1Movie1Title = "Film 1 - DeBrouckère";
  const cinema1Movie1Director = "Director A";
  const cinema1Movie2Title = "Film 2 - DeBrouckère";
  const cinema1Movie2Director = "Director B";

  const cinema2Name = "UGC Toison d'Or";
  const cinema2Movie1Title = "Film 1 - Toison d'Or";
  const cinema2Movie1Director = "Director C";
  const cinema2Movie2Title = "Film 2 - Toison d'Or";
  const cinema2Movie2Director = "Director D";

  return (
    <div>
      <h1>{pageTitle}</h1>

      <div>
        <h2>{cinema1Name}</h2>
        <ul>
          <li>
            <strong>{cinema1Movie1Title}</strong> - Réalisateur :{" "}
            {cinema1Movie1Director}
          </li>
          <li>
            <strong>{cinema1Movie2Title}</strong> - Réalisateur :{" "}
            {cinema1Movie2Director}
          </li>
        </ul>
      </div>

      <div>
        <h2>{cinema2Name}</h2>
        <ul>
          <li>
            <strong>{cinema2Movie1Title}</strong> - Réalisateur :{" "}
            {cinema2Movie1Director}
          </li>
          <li>
            <strong>{cinema2Movie2Title}</strong> - Réalisateur :{" "}
            {cinema2Movie2Director}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;
```

Le code n'est pas très propre 😱.  
Veuillez faire un "refactor" de ce code afin que deux nouveaux composants permettent :
- d'afficher le titre de la page
- d'afficher toutes les informations associées au premier cinema
- d'afficher toutes les informations associées du deuxième cinéma

Les nouveaux composants doivent se trouver dans `App.tsx`.  
S'il y a de l'info à donner à un composant, faites le à l'aide des props. Même si ça n'est pas des plus propres, un composant `Cinema` reçoit toutes les infos sans créer de nouveaux types abstrait (comme `Movie` par exemple.

⚡️ Veuillez avancer pas à pas et ne pas tenter de programmer tous vos composants d'un coup. Une fois qu'un composant fonctionne, passez alors seulement au suivant ; )

Voila à quoi ressemblera `App` : 
```tsx
const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";
  // ... for const definitions

  return (
    <div>
      <PageTitle title={pageTitle} />

      <Cinema
        name={cinema1Name}
        movie1Title={cinema1Movie1Title}
        // ...
      />

      <Cinema
        name={cinema2Name}
        //...
      />
    </div>
  );
};
```


Une fois tout fonctionel, veuillez faire un commit avec le message suivant : "new:exXY"

# Exercice : meilleure gestion des types
Nous allons continuer le projet de votre exercice précédent qui se trouve dans le dossier `/exercises/XY` dans votre git repo.

Nous avons vu précédemment qu'il est recommandé, pour un code propre, de définir des types pour chacune des props de nos composants.

De plus, notre client nous a donné une nouvelle version des données d'entrée du composant `App` qui n'est pas parfaite, mais qui s'améliore. Voici ces données, ainsi qu'une idée du résultat du composant `App` :
```js
const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";

  const movie1 = {
    title: "HAIKYU-THE DUMPSTER BATTLE",
    director: "Susumu Mitsunaka",
  };
  const movie2 = {
    title: "GOODBYE JULIA ",
    director: "Mohamed Kordofani",
  };

  const cinema2Name = "UGC Toison d'Or";
  const movie3 = {
    title: "THE WATCHERS",
    director: "Ishana Night Shyamalan",
  };
  const movie4 = {
    title: "BAD BOYS: RIDE OR DIE",
    director: "Adil El Arbi, Bilall Fallah",
  };

  return (
    <div>
      <PageTitle title={pageTitle} />

      <Cinema name={cinema1Name} movie1={movie1} movie2={movie2} />

      <Cinema name={cinema2Name} movie1={movie3} movie2={movie4} />
    </div>
  );
};
```

Pour cet exercice nous souhaitons :
- qu'un type abstrait `Movie` soit créé qui contiendra un `title` et un `director` ;
- qu'un type abstrait `PageTitleProps` soit créé ;
- qu'un type abstrait `CinemaProps` soit créé.

Veuillez mettre à jour votre composant `Cinema` pour que tout soit fonctionel.

Une fois tout fonctionel, veuillez faire un commit avec le message suivant : "new:exXY"

💭 A la fin de cet exercice, nous nous rendons compte que le passage des informations à nos composants peut encore être amélioré... par example, un `Cinema` devrait pouvoir recevoir des `movies` au sein d'un tableau.  De plus, il serait utile d'apprendre à externaliser nos composants dans des modules. Nous allons apprendre cela dans la suite du cours.

# Linter
Cet outil permet de détecter des erreurs de programmation lors de l'écriture de nos scripts. Par défaut, l'application Vite a créé une configuration du linter qui se trouve dans `.eslintrc.cjs`.

Pour bénéficier de feedback sur votre code au sein de VS Code, veuillez installer l'extension ESLint.
Vous avez même des propositions de "Quick fix" !

Pour ajouter les problèmes de linter dans le browser ainsi que dans le terminal, après la compilation, vous devez utiliser un plugin.

- Installation du plugin `vite-plugin-checker` :
```sh
npm i vite-plugin-checker -D
```
- Nouvelle configuration de Vite pour afficher les erreurs dans le browser dans `vite.config.ts` :
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  checker({
    // e.g. use TypeScript check
    typescript: true,
  }),
  ],
})
```

# formatter
Pour formater facilement votre code, vous pouvez utiliser un "formatter". Nous recommandons l'utilisation de l'outil **Prettier** pour formater votre code.

Veuillez donc installer l'extension prettier au sein de VS Code.

Une fois prettier installé dans VS Code, vous pouvez facilement formatter votre code ainsi :
- soit en tapant `Shift Alt F` (`Option Shift F` sous MacOS);
- soit en faisant un clic droit sur votre script, `Format Document` ; la première fois, il se peut que vous deviez sélectionner prettier comme formatter.


# Resources
- photo de : https://unsplash.com/ (Sahand Hoseini)
- musique de : https://freemusicarchive.org/music/Infecticide : Infecticide - Chansons Tristes - 11. Infecticide - Pizza Spinoza