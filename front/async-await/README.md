# async / await
## Introduction

Plutôt que d'utiliser des **`.then()`** pour chaîner des traitements asynchrones, il est possible de simplifier la syntaxe des promesses à l'aide de **`async`** et **`await`**.

On va donc écrire du code d'une manière équivalente à ce qui serait fait en programmation synchrone, tout en bénéficiant des effets de la programmation asynchrone.

## async / await : les bases

Pour ce nouveau tutoriel, nous allons refactorer l'IHM pour améliorer le code associé aux appels asynchrones aux API.

Veuillez créer un nouveau projet nommé `async-await` sur base d'un copier/coller de `fetch-no-proxy`.

Nous allons donc refactorer le code où est fait le `fetch`, c'est à dire `App` :

```js numbered highlighting="1"
const App = () => {
  const [actionToBePerformed, setActionToBePerformed] = useState(false);
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const response = await fetch("http://localhost:3000/pizzas");

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const pizzas = await response.json();
      setPizzas(pizzas);
    } catch (err) {
      console.error("HomePage::error: ", err);
    }
  };
```

Pour tester ce code, il ne faut pas oublier de démarrer la RESTful API auparavant, la même qu'au tutoriel précédent (télécharger, et désarchiver cette API : <LinkFile name="api-json-server.zip" target="_blank" download> RESTful API offerte grâce à json-server </LinkFile> & exécutez la).

Voici quelques caractéristiques importantes de **`async`** / **`await`** :
- **`await`** est utilisé pour chaîner une tâche asynchrone (sur une fonction renvoyant une promesse) et ne peut se faire qu'au sein d'une fonction taguée par **`async`** ; c'est donc le remplaçant du **`.then(callback)`**.  
  ⚡ Attention, il est donc important qu'au niveau de la fonction **`arrow`**, à la ligne 1 du code donné ci-dessus, on indique le **`async`** !  
  ⚡ Dans le code donné ci-dessus, il est aussi très important de ne pas oublier les **`await`**. N'hésitez pas à faire le test en enlevant le **`await`** de **`const pizzas = await response.json();`**.  
- Toute fonction "taguée" par **`async`** renvoie automatiquement une promesse ; cela signifie dans le code ci-dessus que la fonction **`fetchPizzas`** est elle même asynchrone.  
- On utilise des blocs **`try`** / **`catch`** pour gérer les erreur ; c'est donc le remplaçant du **`.catch(callback)`**.

💭 Il est à parier, et n'hésitez pas à trouver un moyen de vous en rendre compte visuellement, que le footer s'affiche avant le menu !

💭 Pourquoi ne pas avoir mis directement un await dans le useEffect, sans créer la fonction `fetchPizza` ? On aurait pu tenter qqch du genre :
```ts
useEffect(async () => {
    try {
      const response = await fetch("http://localhost:3000/pizzas");

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const pizzas = await response.json();
      setPizzas(pizzas);
    } catch (err) {
      console.error("HomePage::error: ", err);
    }
  }, []);
```

Cela n'est pas possible car `useEffect`, via TS et le linter, ne permet pas d'avoir une fonction asynchrone en paramètre ! Ainsi, si l'on souhaite lancer une action asynchrone, nous devons faire preuve d'ingénuité : il faut créer une fonction, et l'appeler au sein de la callback de `useEffect` ; )

# <InternalPageTitle> Opération asynchrone d'écriture d'une ressource </InternalPageTitle>

A présent, nous souhaiterions que notre IHM puisse créer une ressource au sein de la RESTful API. Dans un premier temps, nous allons mettre à jour le frontend en acceptant que n'importe quel utilisateur puisse créer une pizza et l'ajouter au menu de la pizzeria.  
Bien entendu, cela est temporaire. Nous verrons plus tard comment sécuriser cette opération, en autorisant un admin seulement à réaliser l'ajout d'une pizza au menu.

Nous allons maintenant ajouter l'interaction avec l'API au sein de **`AddPizzaPage`**.
Lorsque nous soumettons le formulaire, nous voulons faire une requête de création de pizza à la RESTful API, c'est donc une requête de type **`POST /pizzas`** qui doit être l'équivalent de ce que nous faisions avec REST Client. Pour rappel, nous faisions une requête de ce genre :
```http
### Create a pizza
POST {{baseUrl}}/pizzas
Content-Type: application/json

{
    "title":"Magic Green",
    "content":"Epinards, Brocolis, Olives vertes, Basilic"
}
```

Ici, c'est le JS/TS à rajouter dans la fonction `addPizza` de **`App`** qui doit, permettre de récupérer les données de la pizza à créer et faire un **`fetch`** de l'opération de création offerte par l'API.  


Pour arriver à nos fins, veuillez mettre à jour la fonction `addPizza` dans `Main` :

```tsx numbered highlighting="1"
const addPizza = async (newPizza: NewPizza) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(newPizza),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("http://localhost:3000/pizzas", options); // fetch retourne une "promise" => on attend la réponse

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
}

export default AddPizzaPage;
```

Pour la nouveauté et le **`fetch`** :
- pour faire une requête de type **`POST`**, tout comme pour les requêtes de type **`DELETE`**, **`PATCH`**, **`UPDATE`**..., il faut l'indiquer à la méthode **`fetch`**.  
Cela est indiqué dans un objet que nous appelons généralement **`options`** qui doit contenir la propriété **`method`**.
- lorsque l'on doit envoyer des données dans le **`body`** d'une requête, alors il faut le faire au sein de la propriété **`body`**. Ici, nous souhaitons envoyer un objet contenant les propriétés **`title`** et **`content`** au format JSON. Nous devons donc utiliser la méthode **`JSON.stringify`** qui permet de créer une représentation JSON d'un objet JS/TS. 
- Il est très important de spécifier le type de la représentation de l'objet qui devrait être utilisé par l'API et qui se trouve dans le body de la requête. Cela est fait via un **`header`** et la propriété **`Content-Type`** (**`'Content-Type': 'application/json',`**).  
⚡ Si vous oubliez cela, l'API ne pourra pas parser les données au format JSON vers des objets JS/TS et donc les opérations d'écriture de ressources échoueront !

Veuillez vérifier que tout fonctionne correctement ; )

💭 Comment vérifier que les données persistent bien dans notre API après avoir soumis une nouvelle pizza ?

Faites un refresh de votre page... Vous pouvez même stopper votre frontend et le redémarrer (mais pas votre API). La nouvelle pizza devrait toujours être affichée. Pour rappel, quand les données étaient traitée dans un tableau en mémoire vive via notre frontend, lors d'un refresh, on perdait ces données.

## Quelques mots sur le type en TypeScript

N'avez-vous pas été surpris que lorsque nous avons mis à jour `addPizza`, en la rendant asynchrone à l'aide du mot clé `async`, nous n'ayons pas du changer le type de `addPizza` au sein du type `PizzeriaContext` ?

Pour garder notre typage propre, nous vous recommandons de mettre à jour le retour de `addPizza` dans `/src/types.ts` :
```ts
interface PizzeriaContext {
  pizzas: Pizza[];
  setPizzas: (pizzas: Pizza[]) => void;
  actionToBePerformed: boolean;
  setActionToBePerformed: (actionToBePerformed: boolean) => void;
  clearActionToBePerformed: () => void;
  drinks: Drink[];
  addPizza: (newPizza: NewPizza) => Promise<void>;
}
```

C'est une `Promise` qui est retournée par la fonction `addPizza`.

# <InternalPageTitle> Création de fonctions asynchrones renvoyant une promesse </InternalPageTitle>

A l'aide d'**`async`** / **`await`**, il est très simple de créer des fonctions asynchrones qui renvoient une promesse.

Nous l'avons déjà fait dans ce tutoriel. Imaginons que nous souhaitons créer une fonction asynchrone qui renvoie toutes les pizzas qui sont offertes par l'opération de lecture des pizzas de la RESTful API.

Voici comment nous écririons ce code :

```ts
async function getAllPizzas() {
    try {
      const response = await fetch("http://localhost:3000/pizzas");

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
```

Cette fonction **`getAllPizzas`** ne renvoie pas un array de pizzas, mais une **`Promise`** !  
Si la promesse :
- résout avec succès, alors c'est bien un array de pizzas qui sera renvoyé par cette fonction.
- échoue, c'est une exception qui sera renvoyée.  
Pour que cela fonctionne, vous devez donc faire en sorte, dans vos fonctions asynchrones, de faire un **`throw`** d'une erreur en cas d'échec du traitement asynchrone.

Comment utiliser ce code au sein de `App`?  
Voici comment le code pourrait être mis à jour pour utiliser la fonction asynchrone `getAllPizzas` au sein de `App` :

```tsx highlighting="1,5"
const App = () => {
  const [actionToBePerformed, setActionToBePerformed] = useState(false);
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const pizzas = await getAllPizzas();
      setPizzas(pizzas);
    } catch (err) {
      console.error("HomePage::error: ", err);
    }
  };
```




