# <InternalPageTitle> Single Origin Policy & CORS </InternalPageTitle>

La **Single Origin Policy** (**SOP**) sont des règles appliquées par le browser afin :
- de restreindre les interactions entre un document ou script chargé par une origine avec une ressource d'une autre origine ;
- d'isoler des documents ou scripts malicieux, afin de réduire le risque des attaques.

Deux URL ont une même **origine** si ces caractéristiques sont les mêmes :

- **protocole** ;
- **port** ;
- **host** ; l'URL pointe vers le même appareil connecté à internet ou à un réseau local.

Il est possible de relaxer la sécurité via des **Cross Origin Resource Sharing** (**CORS**).  
**CORS** est un mécanisme qui utilise des headers HTTP pour indiquer aux browsers qu'ils peuvent autoriser les accès à des ressources d'origines différentes.

Cela signifie qu'une application web qui utilise une API ne peut le faire que si les ressources demandées à l'API proviennent d'une même origine, à moins que la réponse de l'API inclut les bonnes **CORS** (via des header HTTP).

Si l'on autorise trop d'origines, voici un exemple classique d'attaque :

<ScrollableImage name="cors-issue.png" minWidth="500px" maxWidth="700px" />

Imaginez qu'un site d'une banque ne soit pas sécurisé avec des techniques modernes. Ce site utiliserait une IHM (**`https://my-bank.com`**), qui, via un formulaire, permettrait de faire un versement, sous réserve d'envoyer un cookie qui contiendrait une variable de session (simple mécanisme de sécurité) lors d'une requête à l'API de la banque.

Maintenant, prenons le cas d'un utilisateur qui adore jouer sur le web, un gamer en puissance. Il joue à un jeu de pinguins, mais soudainement, il est redirigé vers un site malicieux (**`https://malicious.com`**), qui lui offre un nouveau jeu avec des dinosaures. Ce site malicieux, en arrière plan, pourrait faire une requête vers la même API utilisée par **`https://my-bank.com`**.  
Comme c'est le même browser utilisé par notre gamer, tant pour faire ses virements, que pour jouer, toute requête faite vers **`https://api.my-bank.com`** enverra d'office les cookies existants et associés au domaine **`api.my-bank.com`**.
Les résultats peuvent être dramatiques : l'attaquant à la capacité de faire des versements jusqu'à vider le compte de notre pauvre gamer.

Bien sûr, grâce à la **SOP** appliquée par nos browser, par défaut, dès que le site malicieux communique avec l'API de la banque, celui-ci bloque l'accès aux ressources de l'API car l'origine du site malicieux est différente de l'origine de l'API.

Les **CORS** permettent de relâcher la sécurité, afin notamment, dans le scénario évoqué, d'autoriser l'origine **`https://my-bank.com`** à accéder à l'origine **`https://api.my-bank.com`**. En effet, c'est ce que le site de la banque souhaite.  
Par contre, si la banque possède des développeurs nuls au niveau sécurité et que ceux-ci autorisent toutes les origines à interroger l'API, là, nous pourrions arriver au hacking décrit ci-dessus.

Nous allons voir comment nous pouvons communiquer entre un frontend et une API fonctionnant sous deux origines différentes, à l'aide de deux techniques différentes.


# <InternalPageTitle> Simulation d'une même origine via un proxy </InternalPageTitle>

Il est possible de mettre en place un proxy au niveau du frontend afin de faire croire au browser que l'API et le frontend ont la même origine.

Veuillez démarrer l'API qui n'autorise aucune autre origine : **`/web2/tutorials/pizzeria/api/fat-model`** (ou via le code de ce web repo si vous avez un souci : [api-fat-model](https://github.com/e-vinci/js-demos/tree/main/backend-restful-api/restful-api-essentials/fat-model)).

Nous allons mettre en place un mécanisme au niveau du frontend pour faire passer toutes les requêtes à destination de l'API par un proxy ; le proxy aura la même origine que le serveur de fichiers statiques ayant offert le frontend.

Pour ce nouveau tutoriel, veuillez créer un nouveau projet `fetch-proxy` sur base d'un copier/coller du projet `async-await` et démarrer votre application.

Le menu des pizzas ne s'affiche pas et nous avons le problème déjà rencontré (`...has been blocked by CORS policy`).


Voici le workflow que nous allons appliquer à notre site gérant la pizzeria (TODO : diagramme simplifié):
- Premier appel de notre browser au serveur de développement de Vite : on récupère notre SPA, c'est à dire `index.html` & tous les assets associés.
- A chaque fetch, on le fait au proxy sur la même origine que le serveur de développement qui a offert les fichiers associés à la SPA.
- Le proxy s'occupe de transférer les requêtes HTTP à l'API, puis de renvoyer la réponse au browser.
- Ainsi, pour le browser, il n'y a qu'une seule origine : )




Le serveur de développement de Vite met à disposition un proxy. Pour utiliser ce proxy, vous devez configurer vite. Veuillez mettre à jour le fichier `vite.config.ts` :

```js
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
```

Cela signifie qu'à chaque fois qu'une requête sera faite sur **`/api`** (on reste sur la même origine que le serveur de fichiers statiques, **`5173`** est le port par défaut d'une application Vite), celle-ci sera redirigée vers le port **`3000`**, le port de l'API.
Le `rewrite` permet de ne pas reprendre **`/api`** dans l'URL de la redirection :
**`GET /api/pizzas`** devient **`GET http://localhost:3000/pizzas`**.

Il nous reste à mettre à jour les fetch au sein de `App` :

```js numbered highlighting="4"
async function getAllPizzas() {
    try {
      const response = await fetch("/api/pizzas");

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const pizzas = await response.json();

      return pizzas;
    } catch (err) {
      console.error("getAllPizzas::error: ", err);
      throw err;
    }
  }

  const addPizza = async (newPizza: NewPizza) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(newPizza),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/pizzas", options); // fetch retourne une "promise" => on attend la réponse

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const createdPizza = await response.json(); // json() retourne une "promise" => on attend les données

      setPizzas([...pizzas, createdPizza]);
    } catch (err) {
      console.error("AddPizzaPage::error: ", err);
    }
  };
```

A ce stade-ci, tout devrait fonctionner : le menu des pizzas est affiché suite à l'appel à notre RESTful API ne relaxant pas la sécurité !

🍬 Voici quelques infos non capitales pour ce cours-ci :

- Il existe une multitude de proxy pour un environnement de développement : **`Vite development server`** et son proxy, **`VS Code proxy`**, proxy léger de **`Node`** directement configurable via **`package.json`** (**`"proxy": "http://localhost:3000",`**), ...
- Il existe par exemple un proxy complet sous Node : **`http-proxy-middleware`**.
- Pour la production, lorsque vous déployer une application web sur le cloud, il faudra trouver les instructions de votre provider pour voir comment configurer le proxy.  
Par exemple, pour configurer un **static file server** et son **proxy** sous **heroku** (provider de services d'hébergements sur le cloud), il faut configurer le fichier **`/static.json`**.


# <InternalPageTitle> Exercice : async / await (ex16) </InternalPageTitle>

Veuillez créer une copie de l'exercice précédent nommé `/exercises/XY` afin de compléter l'application `myMovies`.

Nous souhaitons maintenant que toutes les données de films soient fournies par une API que vous avez développées lors des premières semaines de cours.

A l'aide d'un proxy, veuillez consommer votre API de films afin :
- de lire tous les films offerts par votre API et les afficher dans votre frontend ;
- de créer des films.

Une fois tout fonctionel, veuillez faire un commit avec le message suivant : "new:exXY".