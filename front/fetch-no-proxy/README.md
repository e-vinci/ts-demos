## fetch de données

La méthode **`fetch`** permet de faire des requêtes HTTP d'un browser vers des API.

Cette méthode est asynchrone, c'est-à-dire quelle n'est pas bloquante, elle renvoie des promesses de résultats via des objets **`Promise`**. Nous allons de manière intuitive découvrir la programmation asynchrone. Nous pourrons voir plus en détails par la suite ce type de programmation à l'aide de **promises** (les promesses).

Si un jour vous avez besoin de plus de documentation sur la méthode **`fetch`**, n'hésitez pas à consulter la [documentation MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) [[R.61]](/references/#r61).

Veuillez créer un nouveau projet `fetch-no-proxy` sur base d'un copier/coller du projet `routing-state`.

Actuellement, les **`pizzas`** du menu sont hardcodées dans `App`.  

Nous souhaitons changer ça : afin de récupérer une liste de pizzas, l'IHM doit faire une requête **`fetch`** à notre RESTful API développée dans la partie [Refactoring à l'aide d'un "fat model"](../../part1/refactoring/) :
[fat-model](https://github.com/e-vinci/js-demos/tree/main/backend-restful-api/restful-api-essentials/fat-model).

Nous n'allons donc plus utiliser REST Client mais une fonction offerte par le browser pour faire l'équivalent de cette requête :

```http
### Read all pizzas with File variable
GET {{baseUrl}}/pizzas
```

Veuillez mettre à jour `App` en supprimant l'array **`pizzas`** et en rajoutant la requête `fetch` : 
```tsx
const App = () => {
  const [actionToBePerformed, setActionToBePerformed] = useState(false);
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/pizzas")
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `fetch error : ${response.status} : ${response.statusText}`
          );
        return response.json();
      })
      .then((pizzas) => setPizzas(pizzas))
      .catch((err) => {
        console.error("HomePage::error: ", err);
      });
  }, []);

  // Reste du code inchangé
```

Malheureusement, cela ne fonctionne pas, nous avons cette erreur : `Access to fetch at 'http://localhost:3000/pizzas' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.`.

Nous allons apprendre à résoudre cette erreur dans la partie qui suit, car celle-ci dépend de la façon dont l'API a été configurée. A ce stade-ci, pour voir l'application fonctionner, veuillez :
- Stopper la RESTful API ;
- Télécharger, et désarchiver cette API : <LinkFile name="api-json-server.zip" target="_blank" download> RESTful API offerte grâce à json-server </LinkFile>
- Lancer l'API téléchargée : 
  - Ouvrir un terminal dans son répertoire.
  - Installation des packages : **`npm i`**
  - Exécution de l'API : **`npm start`**
- Faire un refresh au niveau de votre browser. Le menu des pizzas devrait s'afficher 🎉.

# useEffect

Mais à quoi sert `useEffect` dans un composant React ?

`useEffect` est un hook de React qui permet d'exécuter des effets secondaires dans nos composants fonctionnels. Les effets secondaires peuvent inclure des opérations telles que la récupération de données depuis une API, la manipulation directe du DOM, la configuration de timers, etc.

Le code à l'intérieur de `useEffect` est une fonction qui sera exécutée après que le composant soit rendu.

Le tableau vide `[]` en second argument signifie que cet effet ne s'exécutera qu'une seule fois, après le 1er rendu du composant :

```tsx
const App = () => {
  const [actionToBePerformed, setActionToBePerformed] = useState(false);
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
   // Code de la fonction
  }, []);
  // ...
```

Si vous aviez mis des variables d'état dans ce tableau, l'effet se serait exécuté à chaque fois que ces variables auraient changé.

Un exemple est donné dans le composant `AudioPlayer` du tutoriel : 
```ts
const AudioPlayer = ({
  sound,
  actionToBePerformed,
  clearActionToBePerformed,
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement && actionToBePerformed) {
      console.log("actionToBePerformed", actionToBePerformed);
      if (audioElement.paused) audioElement.play();
      else audioElement.pause();
      clearActionToBePerformed();
    }
  }, [actionToBePerformed]);
```

La fonction a l'intérieur de `useEffect` ne sera appelée que si la valeur de `actionToBePerformed` change.

En résumé, pour les fetch de données, si on souhaite le faire qu'une seule fois, au tout premier rendu du composant, alors il faut utiliser `useEffect` avec un `[]` en deuxième paramètre.

La suite va expliquer les fondements de la programmation asynchrone en JS/TS.

# Les "promises" & fetch

La méthode **`fetch`** renvoie une **`Promise`**, qui est un objet représentant un état intermédiaire d'une opération. Le code des callbacks s'exécute quand la tâche asynchrone est finie avec succès ou si la tâche échoue.

Les états d'une promesse sont les suivants :

- **pending** : état initial,
- **fulfilled** : l'opération asynchrone a été terminée avec succès ; par exemple la requête
  **`fetch()`** a obtenu un flux de données avec la RESTful API,
- **rejected** : l'opération asynchrone a échouée ; par exemple la requête **`fetch`** est mal construite.

Pour récupérer le résultat d'une méthode asynchrone, on va faire appel :

- **`.then( callback )`** : ce morceau de code permet de chaîner des traitements asynchrones. Par exemple, à la fin du premier traitement asynchrone associé au **`fetch()`**, on appelle

```ts numbered highlighting="2-5"
fetch("http://localhost:3000/pizzas")
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `fetch error : ${response.status} : ${response.statusText}`
          );
        return response.json();
      })
      .then((pizzas) => setPizzas(pizzas))
      .catch((err) => {
        console.error("HomePage::error: ", err);
      });
```

La **callback** sera appelée et recevra comme paramètre un objet de type **`Response`** : cet objet ne contient pas encore le contenu du body de la réponse. En fait, **`Response.body`** est un flux de données (un stream), il faudra donc faire appel à un traitement asynchrone pour obtenir le contenu du body sous forme d'un objet JS.  
C'est ce qui est fait en renvoyant **`return response.json();`** : la fonction **`json()`** renvoie une promesse, c'est à dire qu'une fois le traitement terminé, nous pourrons chaîner celui-ci via un autre **`.then()`**.
C'est ainsi que nous chaînons, une fois le **`body`** disponible, l'appel d'une deuxième **callback** qui s'occupe de mettre à jour la variable d'état `pizza`. Cette deuxième **callback** recevra en paramètre le body de la réponse sous forme d'un objet JS :

```ts numbered highlighting="9"
fetch("http://localhost:3000/pizzas")
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `fetch error : ${response.status} : ${response.statusText}`
          );
        return response.json();
      })
      .then((pizzas) => setPizzas(pizzas))
      .catch((err) => {
        console.error("HomePage::error: ", err);
      });
```

**`.catch( callback )`** : ce morceau de code permet d'exécuter une **callback** lorsque la tâche asynchrone associée à la promesse échoue. Dans le code, on voit que l'on affiche juste un message dans la console :

```js numbered highlighting="10-12"
fetch("http://localhost:3000/pizzas")
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `fetch error : ${response.status} : ${response.statusText}`
          );
        return response.json();
      })
      .then((pizzas) => setPizzas(pizzas))
      .catch((err) => {
        console.error("HomePage::error: ", err);
      });
```

**`.finally( callback )`** : si l'on souhaite exécuter une callback quelque soit le résultat de la promesse, en cas de succès ou d'échec.

⚡ Pour le chaînage des traitements via plusieurs callback appelées au sein de **`.then()`**, cela n'est possible que s'il y a un **`return`** dans les callback.

En effet, si une callback dans la gestion de promesses retourne :

- **Une valeur** : la promesse retournée par **`then`** est résolue avec la valeur.
- **Pas de valeur** : la promesse retournée par **`then`** est résolue avec **`undefined`**.
- **Une autre promesse "pending"**: la promesse retournée par **`then`** est résolue/rejetée à la suite de la résolution/rejet de la promesse retournée par la **callback**.

Pour info, autrefois, pour la programmation asynchrone en JS, nous utilisions simplement les callbacks, des fonctions que l'on passait en argument d'autres fonctions. Le code pouvait facilement devenir illisible et donc difficilement maintenable.


# <InternalPageTitle> Exercice : 1er fetch online (ex14) </InternalPageTitle>

Nous souhaitons consommer une API qui nous permette d'afficher des blagues.  
Nous avons trouvé une restful API qui permet très facilement de générer de manière aléatoire des **`jokes`** : [JokeAPI](https://v2.jokeapi.dev/).

Cette API est très simple d'utilisation. D'ailleurs, la page du site [JokeAPI](https://v2.jokeapi.dev/) vous donne un exemple fonctionnel de comment récupérer des blagues simples dans l'onglet **`Try it out here`**. Pour cela, désélectionnez **`twopart`** et vous obtenez l'URL pour faire vos requêtes en dessous du formulaire.

Veuillez créer un nouveau projet en utilisant les technos Vite + React + TS + SWC nommé `/exercises/XY` dans votre git repo.

Dans votre application, veuillez afficher une **`joke`** après l'avoir récupérée de **`JokeAPI`**, en donnant ces 2 informations :
- la catégorie associée à la **`joke`** ;
- le texte associé à la **`joke`**.

Une fois tout fonctionel, veuillez faire un commit avec le message suivant : "new:exXY".

# Gestion d'événements associés au temps 
## Gestion d'un timer
**`setTimeout(f,t)`** permet l'exécution d'une callback **`f`** à l'expiration d'un timer, après **`t`** ms.

**`clearTimeout()`** permet de stopper l'exécution d'une callback qui a été appelée via **`setTimeout()`**.

Cet exemple montre comment mettre en place un minuteur qui met à jour un état après 3 secondes :
```tsx
import { useState, useEffect } from 'react';

const TimerComponent = () => {
  const [message, setMessage] = useState('Attendez 3 secondes...');

  useEffect(() => {
    // Définir un timer de 3 secondes
    const timer = setTimeout(() => {
      setMessage('3 secondes se sont écoulées!');
    }, 3000);

    // Nettoyage du timer pour éviter des fuites de mémoire si le composant est démonté avant que le timer se déclenche
    return () => clearTimeout(timer);
  }, []); // Le tableau vide [] signifie que cet effet s'exécute une seule fois lors du montage

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default TimerComponent;
```

Ici nous apprenons un nouveau concept associé à `useEffect` : la fonction de nettoyage. Une fonction de nettoyage, au sein de `useEffect`, est une fonction qui sera appelée lors de la destruction d'un composant (par exemple lorsque l'on passe d'une page à une autre, la page sera "détruite"). La fonction de nettoyage est spécifiée dans le `return` de `useEffect`.

Ci-dessus, la fonction de nettoyage `clearTimeout(timer)` est retournée par `useEffect` pour s'assurer que le timer est nettoyé si le composant est démonté avant que le timer ne se déclenche. Cela sera très utile à mettre en place lorsqu'une action est associée à une page uniquement.

## Gestion d'intervalles de temps & actions répétées

**`setInterval(f,t)`** permet l'exécution d'une callback **`f`** tous les **`t`** ms.

**`clearInterval()`** permet de stopper les appels à la callback qui ont été programmés via **`setInterval()`**.

Cet exemple montre comment mettre en place un intervalle qui met à jour un compteur toutes les secondes. :
```tsx
import { useState, useEffect } from 'react';

const CounterComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Définir un intervalle qui incrémente le compteur toutes les secondes
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    // Nettoyage de l'intervalle pour éviter des fuites de mémoire si le composant est démonté
    return () => clearInterval(interval);
  }, []); // Le tableau vide [] signifie que cet effet s'exécute une seule fois lors du montage

  return (
    <div>
      <p>Compteur: {count}</p>
    </div>
  );
};

export default CounterComponent;
```

# <InternalPageTitle> Exercice : gestion d'événement temporel (ex15) </InternalPageTitle>

Veuillez continuer l'exercice précédent nommé `/exercises/XY` afin d'afficher une nouvelle blague toute les 10 secondes.

Une fois tout fonctionel, veuillez faire un commit avec le message suivant : "new:exXY".


