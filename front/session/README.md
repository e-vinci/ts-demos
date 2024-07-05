# <InternalPageTitle> Où sauvegarder de l'info dans un browser ? </InternalPageTitle>

Nous avons vu qu'une des exigences associées à la création d'une application selon l'architecture REST, c'est qu'elle soit **stateless** : l'API ne peut pas garder l'état du client, sa session, côté serveur.

C'est donc au client de sauvegarder ses données de session.

Mais où pouvons nous sauvegarder des données de manière persistante côté client ?

Il existe deux façons principales de sauvegarder de l'info dans un browser :
- le **web storage** ; 
- les **cookies**.

Dans le cadre de ce cours, nous allons principalement voir comment sauvegarder de l'info à l'aide du **web storage**. Dans la partie du cours sur la gestion de l'authentification et l'autorisation d'utilisateurs, vous pourrez optionnellement voir comment les cookies peuvent être utilisés pour sauvegarder des données de session côté client.

NB : le browser met à disposition d'autres API un peu moins connues pour sauvegarder des infos. Nous ne les verrons pas dans le cadre de ce cours, mais il reste néanmoins intéressant de lire très rapidement de quoi il s'agit :
- **IndexedDB API** : permet de sauvegarder côté client de grandes quantités d'infos structurées, incluant des fichiers ; c'est une base de données orientée objets en JS qui permet les transactions.
- **Cache API** : permet d'enregistrer et retrouver des requêtes et leur réponses. Bien qu'à la base créé pour pouvoir fournir des réponses plus rapides à certaines requêtes, cette API peut aussi être utilisée comme mécanisme général de stockage.

# <InternalPageTitle> Persistance de données de session via le web storage </InternalPageTitle>

## Introduction
Le **Web Storage API** fournit un mécanisme permettant aux browser d'enregistrer des paires **clé / valeur** d'une manière plus intuitive que l'utilisation de cookies.

Il existe deux mécanismes au sein du web storage :
- **sessionStorage** :
    - offre un espace de stockage séparé pour chaque origine pour la durée de la session d'une page, tant que le browser est ouvert.
    - les clés / valeurs y sont enregistrées sous forme de string uniquement ;
    - met à disposition un espace de stockage plus grand qu'un cookie, ~5MB maximum par origine ;
- **localStorage** : 
    - offre aussi un espace de stockage séparé pour chaque origine, mais les données persistent quand le browser est fermé et réouvert ;
    - est un espace de stockage plus grand qu'un cookie, limité à ~10MB en cas de crash/restart du browser.

Les principales méthodes offertes par **sessionStorage** et **localStorage** sont les mêmes. Voici quelques exemples de codes par méthode.

## `setItem()`
Cette méthode permet d'enregistrer, pour une clé donnée, la valeur associée :

```ts numbered highlighting="5"
const storeName = 'user';

const setUserSessionData = (user) => {
  const storageValue = JSON.stringify(user);
  localStorage.setItem(storeName, storageValue);
};
```

Pour enregistrer un objet JS sous forme de string, il suffit de le sérialiser à l'aide de la méthode `JSON.stringify()`.

## `getItem()`
Cette méthode permet d'obtenir la valeur associée à la clé donnée en argument :

```ts numbered highlighting="4"
const storeName = 'user';

const getUserSessionData = () => {
  const retrievedUser = localStorage.getItem(storeName);
  if (!retrievedUser) return;
  return JSON.parse(retrievedUser);
};
```

Pour cet exemple, comme la valeur a été sérialisée, nous pouvons récupérer l'objet grâce à la méthode **`JSON.parse()`**.

## `removeITem()`
Cette méthode permet d'effacer une clé / valeur :

```js numbered highlighting="4"
const storeName = 'user';

const removeSessionData = () => {
  localStorage.removeItem(storeName);
};
```

## `clear()`
Cette méthode permet d'effacer tout l'espace de stockage pour une origine donnée.

Cette méthode est très utile lorsque l'on souhaite effacer toute la session d'un utilisateur, notamment lors du logout d'un utilisateur.


# <InternalPageTitle> Exercice : persistence d'un thème (ex17) </InternalPageTitle>

Veuillez continuer l'exercice précédent nommé `/exercises/XY` afin de compléter l'application `myMovies`.


Vous devez ajouter un moyen de switcher d'un thème "light" ou "dark" au sein de votre application. 

Par exemple, vous pouvez le faire via un bouton dans le header ou le footer permettant de basculer d'un thème à l'autre.

Vous devez sauvegarder le thème sélectionné par l'utilisateur comme donnée de session persistante. Ainsi, vous allez sauvegarder l'information du thème dans le `localStorage`.

Au redémarrage du browser, ou lors du refresh du frontend, l'application doit toujours afficher ses écrans selon le dernier thème sélectionné : veuillez donc changer les couleurs de certains backgrounds et certains textes en fonction du thème.

Une fois tout fonctionel, veuillez faire un commit avec le message suivant : "new:exXY".

# <InternalPageTitle> Authentification d'un utilisateur via une IHM & JWT </InternalPageTitle>

Pour authentifier un utilisateur via une IHM, il suffit de faire une requête à une RESTful API.

Généralement, l'utilisateur devra d'abord créer son compte. Il utilisera un formulaire demandant au minimum un identifiant (username, adresse e-mail ou autres) et un password.  
Dans le cadre d'une SPA, l'IHM fera appel à une opération de type `register` lorsque l'utilisateur soumet le formulaire.

Par la suite, lorsque le compte de l'utilisateur existe, l'IHM fera appel à une opération de type `login` lorsque l'utilisateur tentera de se connecter à l'aide d'un formulaire.

Dans les deux cas, `register` ou `login`, le développeur devra connaître les opérations mises à disposition par l'API. 

Dans le cadre du site de la pizzeria, nous savons que l'API met à disposition ces deux opérations :

| URI | Méthode HTTP | Opération |
|---|---|---|
| **`auths/login`** | **POST** | Vérifier les credentials d'une ressource de type "users" et renvoyer le username et un token JWT si les credentials sont OK |
| **`auths/register`** | **POST** | Créer une ressource de type "users" et renvoyer le username et un token JWT |

<br/>

Pour ce nouveau tutoriel, veuillez créer un projet nommé `session-jwt` sur base du projet `fetch-proxy`.

Au sein de votre repo **`web2`**, veuillez créer le projet nommé **`/web2/tutorials/pizzeria/hmi/jwt-fetch`** sur base d'un copié/collé de **`/web2/tutorials/pizzeria/hmi/async-await`** (ou [async-await-hmi](https://github.com/e-vinci/js-demos/tree/main/frontend/frontend-essentials/basic-fetch)).

Veuillez démarrer la version **`/web2/tutorials/pizzeria/api/safe`** de la RESTful API de la pizzeria. En cas de souci, vous pouvez utiliser ce code-ci :
[api-safe](https://github.com/e-vinci/js-demos/tree/main/backend-restful-api/restful-api-essentials/safe).

Pour la suite du tutoriel, nous considérons que tous les chemins absolus démarrent du répertoire
**`/web2/tutorials/pizzeria/hmi/jwt-fetch`**.

Veuillez mettre à jour le code de la **`RegisterPage`** afin de faire appel à la méthode **`POST /auths/register`** et, si tout est OK, rediriger l'utilisateur vers la **`HomePage`** via la fonction **`Navigate`** :

```js numbered highlighting="2,34-63"
import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';

const RegisterPage = () => {
  clearPage();
  renderPageTitle('Register');
  renderRegisterForm();
};

function renderRegisterForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  const username = document.createElement('input');
  username.type = 'text';
  username.id = 'username';
  username.placeholder = 'username';
  username.required = true;
  username.className = 'form-control mb-3';
  const password = document.createElement('input');
  password.type = 'password';
  password.id = 'password';
  password.required = true;
  password.placeholder = 'password';
  password.className = 'form-control mb-3';
  const submit = document.createElement('input');
  submit.value = 'Register';
  submit.type = 'submit';
  submit.className = 'btn btn-danger';
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit', onRegister);
}

async function onRegister(e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch('/api/auths/register', options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const authenticatedUser = await response.json();

  console.log('Newly registered & authenticated user : ', authenticatedUser);

  Navigate('/');
}

export default RegisterPage;

```

Veuillez exécuter le frontend et vous assurer que l'utilisateur que vous tentez de créer est bien créé par votre API. Si tout fonctionne, vous aurez une confirmation dans la console de votre browser.

Bien, nous souhaitons pour l'instant sauvegarder **`authenticatedUser`** de manière temporaire, car cet objet contient comme info le username et le token de l'utilisateur.

💭 Comment faire pour que cet objet soit disponible dans d'autres modules ?
Cette question nous permet d'explorer un propriété importante des **`export`** d'objets via ECMAScript : ce sont des objets immuables, c'est-à-dire dont vous ne pouvez pas directement changer leurs valeurs. Comment faire alors pour offrir **`authenticatedUser`** ?  
Nous allons offrir quatre nouvelles fonctions : 
- une fonction qui renverra l'état de la variable **`authenticatedUser`** ;
- une fonction qui permettra de modifier la variable **`authenticatedUser`** ;
- une fonction qui indiquera si l'utilisateur est authentifié ou pas ;
- une fonction qui permettra de faire un reset de l'utilisateur en cours (on utilisera cette fonction lors d'un logout).

Veuillez créer le fichier **`/src/utils/auths.js`** et y ajouter le code suivant :

```js numbered
let currentUser;

const getAuthenticatedUser = () => currentUser;

const setAuthenticatedUser = (authenticatedUser) => {
  currentUser = authenticatedUser;
};

const isAuthenticated = () => currentUser !== undefined;

const clearAuthenticatedUser = () => {
  currentUser = undefined;
};

// eslint-disable-next-line object-curly-newline
export { getAuthenticatedUser, setAuthenticatedUser, isAuthenticated, clearAuthenticatedUser };
```

Veuillez mettre à jour le code de la **`RegisterPage`** afin de sauver en mémoire vive l'utilisateur authentifié. Nous allons aussi préparer la suite afin d'avoir une **`Navbar`** qui s'adaptera lorsqu'un utilisateur est authentifié, c'est pourquoi nous allons appeler le composant **`Navbar`** :

```js numbered highlighting="1,3,66,68"
import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const RegisterPage = () => {
  clearPage();
  renderPageTitle('Register');
  renderRegisterForm();
};

function renderRegisterForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  const username = document.createElement('input');
  username.type = 'text';
  username.id = 'username';
  username.placeholder = 'username';
  username.required = true;
  username.className = 'form-control mb-3';
  const password = document.createElement('input');
  password.type = 'password';
  password.id = 'password';
  password.required = true;
  password.placeholder = 'password';
  password.className = 'form-control mb-3';
  const submit = document.createElement('input');
  submit.value = 'Register';
  submit.type = 'submit';
  submit.className = 'btn btn-danger';
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit', onRegister);
}

async function onRegister(e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch('/api/auths/register', options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const authenticatedUser = await response.json();

  console.log('Newly registered & authenticated user : ', authenticatedUser);

  setAuthenticatedUser(authenticatedUser);

  Navbar();

  Navigate('/');
}

export default RegisterPage;
```

Pour la **`LoginPage`**, les modifications à faire sont les mêmes :

```js numbered highlighting="1,3-4,36-69"
import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const LoginPage = () => {
  clearPage();
  renderPageTitle('Login');
  renderRegisterForm();
};

function renderRegisterForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  const username = document.createElement('input');
  username.type = 'text';
  username.id = 'username';
  username.placeholder = 'username';
  username.required = true;
  username.className = 'form-control mb-3';
  const password = document.createElement('input');
  password.type = 'password';
  password.id = 'password';
  password.required = true;
  password.placeholder = 'password';
  password.className = 'form-control mb-3';
  const submit = document.createElement('input');
  submit.value = 'Login';
  submit.type = 'submit';
  submit.className = 'btn btn-danger';
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit', onLogin);
}

async function onLogin(e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch('/api/auths/login', options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const authenticatedUser = await response.json();

  console.log('Authenticated user : ', authenticatedUser);

  setAuthenticatedUser(authenticatedUser);

  Navbar();

  Navigate('/');
}

export default LoginPage;
```

Nous souhaitons maintenant faire en sorte que la **`Navbar`** affiche des éléments différents si l'utilisateur est authentifié ou pas :
- s'il est authentifié : on affiche **`Home`**, **`Login`**, **`Register`** et le **`username`** de l'utilisateur connecté.
- s'il est anonyme : on affiche **`Home`**, **`Add a pizza`**, **`Logout`**.

Nous allons mettre à jour la **`Navbar`** pour s'adapter à l'authentification d'un utilisateur :
```js
// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';

const Navbar = () => {
  renderNavbar();
};

function renderNavbar() {
  const authenticatedUser = getAuthenticatedUser();

  const anonymousUserNavbar = `
<nav class="navbar navbar-expand-lg navbar-light bg-danger">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">e-Pizzeria</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" data-uri="/">Home</a>
            </li>
            <li id="loginItem" class="nav-item">
              <a class="nav-link" href="#" data-uri="/login">Login</a>
            </li>
            <li id="registerItem" class="nav-item">
              <a class="nav-link" href="#" data-uri="/register">Register</a>
            </li>            
          </ul>
        </div>
      </div>
    </nav>
`;

  const authenticatedUserNavbar = `
<nav class="navbar navbar-expand-lg navbar-light bg-danger">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">e-Pizzeria</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" data-uri="/">Home</a>
            </li>          
            <li class="nav-item">
              <a class="nav-link" href="#" data-uri="/add-pizza">Add a pizza</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-uri="/logout">Logout</a>
            </li>    
            <li class="nav-item">
              <a class="nav-link disabled" href="#">${authenticatedUser?.username}</a>
            </li>           
          </ul>
        </div>
      </div>
    </nav>
`;

  const navbar = document.querySelector('#navbarWrapper');

  navbar.innerHTML = isAuthenticated() ? authenticatedUserNavbar : anonymousUserNavbar;
}

export default Navbar;
```

Ce code est quasi entièrement neuf. On a rajouté l'élément qui permettra de réaliser le logout d'un utilisateur. Avant d'aller plus loin, veuillez tester l'application.  
Loguez-vous avec l'utilisateur **`admin`** (et le password **`admin`**) et vérifiez que vous êtes bien redirigé vers la **`HomePage`** une fois authentifié, que la **`Navbar`** contient bien les éléments attendus, dont le **`username`**.  
Veuillez maintenant tester un clic sur l'élément **`Add a pizza`** de la **`Navbar`**. Il ne se passe rien...  

💭 Pourquoi les clics ne sont plus pris en compte ?  
En fait, regardons le code de notre **`Router`**, pour la gestion des clics sur la **`Navbar`** :

```js
function onNavBarClick() {
  const navItems = document.querySelectorAll('.nav-link');

  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const uri = e.target?.dataset?.uri;
      const componentToRender = routes[uri];
      if (!componentToRender) throw Error(`The ${uri} ressource does not exist.`);

      componentToRender();
      window.history.pushState({}, '', uri);
    });
  });
}
```

Tant dans **`LoginPage`** que dans **`RegisterPage`**, nous faisons appel à la fonction **`Navbar`** qui fait un "rerender" (réaffichage) de la **`Navbar`**. Ainsi, tous les éléments de la barre de navigation sont "rerender", et donc comme le **`Router`** n'est pas réappelé, la fonction **`onNavBarClick`** n'est pas réexécutée. Ainsi, même si les nouveaux éléments de la **`Navbar`** ont la classe CSS **`nav-link`**, leurs écouteurs d'événements de type **`click`** n'existent plus.

💭 Comment corriger cela ?  
On pourrait se dire qu'il suffit de faire appel à la fonction **`onNavBarClick`** dans la **`Navbar`**. Cette solution ne fonctionnerait pas car nous aurions des dépendances cycliques, la **`Navbar`** devrait faire appel aux routes, qui elles font appel aux pages, les pages faisant appel à la **`Navbar`**...  
Dès lors, le mieux serait de mettre un écouteur d'événements au niveau du wrapper de la **`Navbar`**.  
Comme le wrapper n'est jamais réinitialisé, tout sera en ordre.  
Veuillez donc mettre à jour la fonction **`onNavBarClick`** de **`/src/Components/Router/Router.js`** :

```js highlighting="2,4,6-8"
function onNavBarClick() {
  const navbarWrapper = document.querySelector('#navbarWrapper');

  navbarWrapper.addEventListener('click', (e) => {
    e.preventDefault();
    const navBarItemClicked = e.target;
    const uri = navBarItemClicked?.dataset?.uri;
    if (uri) {
      const componentToRender = routes[uri];
      if (!componentToRender) throw Error(`The ${uri} ressource does not exist.`);

      componentToRender();
      window.history.pushState({}, '', uri);
    }
  });
}
```

Veuillez noter que le **`navbarWrapper`** est initialisé au sein du composant **`Header`**.  
Dans la nouvelle version du code du **`Router`**, le gestionnaire de clics est ajouté au niveau de ce wrapper. Grâce à l'event objet **`e`**, on accède à l'élément sur lequel on a cliqué grâce à la propriété **`target`**. On retrouve donc l'élément de la navbar sur lequel on a cliqué très facilement. 

Veuillez tester votre IHM et vérifier qu'une fois logué, vous puissiez bien voyager entre les pages.

Il reste maintenant à créer un composant permettant de faire un logout. On souhaite que ce composant de logout supprime l'utilisateur authentifié, réaffiche la **`Navbar`** pour un utilisateur anonyme et redirige l'utilisateur vers la page de login.

Pour ce faire, veuillez créer le dossier et le fichier **`/src/Components/Logout/Logout.js`** et y ajouter ce code :
```js
import { clearAuthenticatedUser } from '../../utils/auths';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const Logout = () => {
  clearAuthenticatedUser();
  Navbar();
  Navigate('/login');
};

export default Logout;
```

Attention, même si nous avons mis à jour la **`Navbar`** et créé le composant **`Logout`**, le boilerplate du frontend impose de rajouter une route au sein du **`Router`** pour qu'un clic sur l'élément **`Logout`** de la **`Navbar`** amène à appeler le composant **`Logout`**.
Veuillez donc mettre à jour **`routes`** au sein de **`/src/Components/Router/Router.js`** :

```js highlighting="1,12"
import Logout from '../Logout/Logout';
import AddPizzaPage from '../Pages/AddPizzaPage';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/add-pizza': AddPizzaPage,
  '/logout': Logout,
};
```

Veuillez maintenant tester le login et le logout. Tout devrait être fonctionnel !  
Il nous reste à faire en sorte que l'on puisse autoriser l'opération de création de pizza.

# <InternalPageTitle> Autorisation de l'appel à une opération protégée  </InternalPageTitle>

Nous allons maintenant voir comment, à partir d'une IHM, nous pouvons utiliser un token pour accéder à une opération d'une RESTful API.

Veuillez vous assurer que la version **`/web2/tutorials/pizzeria/api/safe`** de la RESTful API de la pizzeria est bien démarrée. En cas de souci, vous pouvez utiliser ce code-ci :
[api-safe](https://github.com/e-vinci/js-demos/tree/main/backend-restful-api/restful-api-essentials/safe).

Veuillez vous connecter à l'IHM du tutoriel en cours (**`/web2/tutorials/pizzeria/hmi/jwt-fetch`**) à l'aide du compte **`manager`** et tentez d'ajouter une pizza. Cela ne devrait pas fonctionner.

Veuillez regarder dans la console : il devrait y avoir une erreur qui s'affiche avec le "status code" **`401 : Unauthorized`**.  
En effet, l'API attend un token pour autoriser l'opération de création d'une pizza.

Nous allons donc mettre à jour **`/src/Components/Pages/AddPizzaPage.js`** pour ajouter le token de l'utilisateur authentifié au sein du header de la requête (il n'y a que trois lignes à rajouter) :

```js numbered highlighting="1,44,54"
import { getAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';

const AddPizzaPage = () => {
  clearPage();
  renderPageTitle('Add a pizza to the menu');
  renderAddPizzaForm();
};

function renderAddPizzaForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  const title = document.createElement('input');
  title.type = 'text';
  title.id = 'title';
  title.placeholder = 'title of your pizza';
  title.required = true;
  title.className = 'form-control mb-3';
  const content = document.createElement('input');
  content.type = 'text';
  content.id = 'content';
  content.required = true;
  content.placeholder = 'Content of your pizza';
  content.className = 'form-control mb-3';
  const submit = document.createElement('input');
  submit.value = 'Add pizza to the menu';
  submit.type = 'submit';
  submit.className = 'btn btn-danger';
  form.appendChild(title);
  form.appendChild(content);
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit', onAddPizza);
}

async function onAddPizza(e) {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;

  const authenticatedUser = getAuthenticatedUser();

  const options = {
    method: 'POST',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: authenticatedUser.token,
    },
  };

  const response = await fetch('/api/pizzas', options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const newPizza = await response.json();

  console.log('New pizza added : ', newPizza);

  Navigate('/');
}

export default AddPizzaPage;

```

Veuillez vous connecter à l'IHM à l'aide du compte **`manager`** et tenter d'ajouter une pizza. Cela ne devrait toujours pas fonctionner. Veuillez regarder dans la console : il devrait y avoir une erreur qui s'affiche avec le "status code" **`403 : Forbidden`**.  
En effet, l'API attend un token pour autoriser l'opération de création d'une pizza, mais seulement **`admin`** a le privilège d'ajouter une pizza au menu !

Déconnectez-vous (logout), reconnectez-vous à l'aide du compte **`admin`**, et ajoutez une pizza.
Voila ! Le site devrait être entièrement fonctionnel !

Si tout fonctionne bien, faites un **`commit`** de votre repo (**`web2`**) avec comme message : **`jwt-fetch-hmi tutorial`**.

En cas de souci, vous pouvez utiliser le code du tutoriel :

- pour le frontend : [jwt-fetch-hmi](https://github.com/e-vinci/js-demos/tree/main/frontend/frontend-essentials/jwt-fetch).
- pour l'API : [api-safe](https://github.com/e-vinci/js-demos/tree/main/backend-restful-api/restful-api-essentials/safe).

💭 Est-ce que c'est "safe" que notre IHM affiche le menu "Add a pizza" pour un utilisateur qui n'est pas l'admin ?    
*En fait oui, c'est "safe", vous l'avez testé. L'API ne doit jamais faire confiance aux applications clientes pour appliquer la sécurité. Ainsi, même si le frontend autorise l'accès à des opérations qui ne devraient pas être permises, au regard des autorisations appliquées par l'API, ça n'a pas d'importance point de vue sécurité.  
De la même façon, c'est pour ça qu'une API doit aussi toujours valider les paramètres qu'elle reçoit. Elle ne peut pas faire confiance aux applications clientes, comme par exemple à une application web tournant dans un browser, pour valider tous les champs d'un formulaire.    
La raison est simple, l'API est développée indépendamment des applications clientes, elle ne peut pas supposer que les requêtes seront toujours bien construites.*

💭 OK, tout est "safe" si l'API fait toutes les vérifications nécessaires. Néanmoins, n'y a-t-il pas des règles de bonnes pratiques au niveau des IHM, pour ne pas permettre de faire n'importe quelles requêtes vers des API ?  
*Et bien oui, au niveau des IHM, pour des questions d'**ergonomie**, d'expérience utilisateur, on va faire en sorte :*
- *de ne pas offrir des opérations qui ne seront pas autorisées. Par exemple, dans le cadre de ce tutoriel sur un site permettant de gérer une pizzeria, il ne faut pas "frustrer" les utilisateurs en leur faisant croire qu'ils ont accès à l'opération de créer une pizza ! Imaginez-vous, vous créez une nouvelle pizza de 32 ingrédients, et lors de la soumission, vous recevez un message comme quoi vous n'êtes pas l'admin du site et que vous n'avez donc pas le droit de créer une pizza 😲!*
- *de ne pas demander du travail à une API quand l'IHM peut détecter que ce n'est pas utile. 
Ainsi, quand une IHM offre des formulaires, qui amèneront à des requêtes vers des API, on évitera d'autoriser la soumission des données tant que les champs n'ont pas été validés. Tout ce que l'IHM peut valider côté client, elle doit le faire. Le feedback sera plus rapide pour l'utilisateur, et les ressources de l'API seront économisées (pas d'appel inutile).*

N'hésitez donc pas à mettre à jour ce tutoriel pour faire en sorte de n'afficher "Add a pizza" que si l'utilisateur est **`admin`**.

💭 Ca n'est pas un peu "cheap" que seul l'utilisateur **`admin`** puisse avoir le privilège d'administrateur du site ?  
*Hé bien oui, c'est "cheap". Généralement, dans le cadre d'applications plus robustes, nous allons ajouter un ou plusieurs rôle(s) aux utilisateurs. Par exemple, dans le cadre d'applications où les rôles sont simples, qu'il n'y a jamais qu'un seul rôle associé à un utilisateur, il suffirait d'ajouter au niveau de l'API la propriété **`role`** aux utilisateurs. La majorité des utilisateurs pourrait avoir un rôle dont la valeur serait **`default`**, et une minorité d'utilisateur auraient le rôle d'**`admin`**...*

On n'affiche actuellement **pas de message d'erreur** à l'utilisateur lorsque la réponse d'une API renvoie une erreur. Pour améliorer l'expérience de l'utilisateur, ce serait une amélioration à faire.

Finalement, lorsqu'on ferme le browser et revient sur l'application par la suite, on n'est plus authentifié. Nous allons donc prochainement voir comment nous pourrions sauvegarder des données de session (le token et le username) côté-client, dans le browser.

# <InternalPageTitle> Mise en place du localStorage pour sauvegarder les données de session </InternalPageTitle>

Dans le cadre du site nous permettant de gérer une pizzeria, nous allons faire en sorte de sauvegarder les données de session au sein du **`localStorage`**, et plus juste en mémoire vive. Nous allons appliquer ce que nous avons appris dans la partie sur [Les sessions côté client](../../part2/sessions/).

Veuillez démarrer la version **`/web2/tutorials/pizzeria/api/safe`** de la RESTful API de la pizzeria. En cas de souci, vous pouvez utiliser ce code-ci :
[api-safe](https://github.com/e-vinci/js-demos/tree/main/backend-restful-api/restful-api-essentials/safe).

Pour ce nouveau tutoriel, au sein de votre repo **`web2`**, veuillez créer le projet nommé **`/web2/tutorials/pizzeria/hmi/web-storage`** sur base d'un copier/coller de **`/web2/tutorials/pizzeria/hmi/jwt-fetch`** (ou [jwt-fetch-hmi](https://github.com/e-vinci/js-demos/tree/main/frontend/frontend-essentials/jwt-fetch)).

Pour la suite du tutoriel, nous considérons que tous les chemins absolus démarrent du répertoire
**`/web2/tutorials/pizzeria/hmi/web-storage`**.

Afin de sauvegarder les données de session, c'est à dire l'objet **`authenticatedUser`** contenant un token et un username, nous devons juste mettre à jour le fichier **`/usr/utils/auths.js`** :

```js numbered highlighting="1,7,10,15-16,24"
const STORE_NAME = 'user';
let currentUser;

const getAuthenticatedUser = () => {
  if (currentUser !== undefined) return currentUser;

  const serializedUser = localStorage.getItem(STORE_NAME);
  if (!serializedUser) return undefined;

  currentUser = JSON.parse(serializedUser);
  return currentUser;
};

const setAuthenticatedUser = (authenticatedUser) => {
  const serializedUser = JSON.stringify(authenticatedUser);
  localStorage.setItem(STORE_NAME, serializedUser);

  currentUser = authenticatedUser;
};

const isAuthenticated = () => currentUser !== undefined;

const clearAuthenticatedUser = () => {
  localStorage.removeItem(STORE_NAME);
  currentUser = undefined;
};

// eslint-disable-next-line object-curly-newline
export { getAuthenticatedUser, setAuthenticatedUser, isAuthenticated, clearAuthenticatedUser };
```

Au sein de **`getAuthenticatedUser`** : 
- on fait un premier check afin d'éviter d'aller lire dans le **`localStorage`** si la variable **`currentUser`** est déjà initialisée.
- on parse l'utilisateur authentifié et sérialisé qui est retrouvé dans le **`localStorage`** via la clé **`STORE_NAME`**.

Au sein de **`setAuthenticatedUser`**, on sérialise **`authenticatedUser`** avant d'ajouter une paire clé/valeur au **`localStorage`**.  Ces données restent dans le browser, peu importe le nombre de fois que l'on redémarre son browser. 

Dans **`clearAuthenticatedUser`**, on efface la paire clé/valeur associée à l'utilisateur authentifié (via la clé **`STORE_NAME`**).

Veuillez bien mettre à jour votre code et tester l'application.  
Connectez-vous à l'aide de l'utilisateur **`manager`**.  Veuillez fermer votre browser.  
Veuillez le réouvrir.   
Vous devriez automatiquement être authentifié : veuillez observer l'état de la **`Navbar`** pour vous en assurer.

💭 Où puis-je observer l'état des données sauvegardées dans le web storage de mon browser ?   
Tout en ayant la fenêtre de votre application ouverte, via Chrome, allez dans vos outils de développeurs : **`F12`**.  
Puis, dans l'onglet **`Application`**, vous trouverez dans **`Storage`** : **`Local Storage`** et **`Session Storage`**.  
Ici, nous utilisons le **`Local Storage`**, donc cliquez dessus, vous verrez apparaître **`http://localhost:8080`**. Cliquez sur cette URL, et vous verrez vos données de session, quelque chose du style **`{"username":"manager","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbmFnZXIiLCJpYXQiOjE2NjE3NjM3MDksImV4cCI6MTc0ODE2MzcwOX0.jAxH0WsOgiK5vf4QduDZ8JgTR-SKC42G9aPieV_OTOo"}`**.  
N'hésitez pas à faire un clic droit sur l'URL **`http://localhost:8080`**, puis **`Clear`**.  
Si vous faites ensuite un refresh de votre page, comme votre session aura été effacée, votre utilisateur ne sera plus connecté. Votre **`Navbar`** affichera le menu pour un utilisateur anonyme !  
Faites ce test, c'est intéressant 😉.

Si tout fonctionne bien, faites un **`commit`** de votre repo (**`web2`**) avec comme message :
**`web-storage-hmi tutorial`**.

En cas de souci, vous pouvez utiliser le code du tutoriel :

- pour le frontend : [web-storage-hmi](https://github.com/e-vinci/js-demos/tree/main/frontend/frontend-essentials/web-storage).
- pour l'API : [api-safe](https://github.com/e-vinci/js-demos/tree/main/backend-restful-api/restful-api-essentials/safe).

# <InternalPageTitle> Projet 4.3 : Authentification et appel d'opérations protégées par JWT </InternalPageTitle>

## Mise en place du projet

Vous devez mettre à jour votre frontend afin qu'il consomme les nouvelles opérations de votre API qui ont été développées pour [Projet 4.2](../security-api/#projet_4_2_securisation_d_api).

Le code de votre frontend doit se trouver dans votre repository local et votre web repository (normalement appelé **`web2`**) dans le répertoire nommé **`/project/4.3/hmi`** sur base d'un copier/coller du code de [Projet 3.1](../../part3/#projet_3_1_deploiement_de_votre_frontend_de_votre_backend).

## Authentification et appel d'opérations nécessitant une autorisation JWT

Même si votre projet ne nécessite pas d'authentification, afin d'apprendre les concepts associés à "JWT auths", veuillez créer un prototype de frontend introduisant ces cas d'utilisation :
- **`register`** : les utilisateurs doivent pouvoir créer un compte.
- **`login`** : les utilisateur doivent pouvoir se loguer.
- **`logout`** : les utilisateurs doivent pouvoir se déconnecter.

<UnAuthenticatedBlock>

Si vous avez choisi comme projet d'approfondir le développement de l'application **`myMovies`**, celle-ci doit maintenant autoriser les opérations suivantes que pour des utilisateurs authentifiés :
-	UC2 : l'ajout d'une ressource de type films via un formulaire d'ajout d'un film.
- UC3 : la suppression d'un film.
- UC4 : la mise à jour des données d'un film (à l'exception de l'id associé à un film).

Comme auparavant, cette opération est permise pour tous les utilisateurs, anonymes ou authentifiés :
-	UC1 : l'affichage, sous forme de tableau, de toutes les ressources de type films.

</UnAuthenticatedBlock>

Pensez à bien mettre à jour votre **`Navbar`** pour afficher les bons menus en fonction que l'utilisateur est authentifié ou pas.

Faites attention, il n'est pas autorisé, pour des raisons d'ergonomie, que le frontend offre les fonctionnalités d'écriture de ressources pour les utilisateur non authentifiés. Vous devez donc rendre invisible les opérations non autorisées aux utilisateurs. 

<UnAuthenticatedBlock>

UC2 (create), UC3 (delete) et UC4 (update) doivent être invisibles pour les utilisateurs anonymes.

</UnAuthenticatedBlock>

Dans un premier temps, veuillez faire en sorte de rajouter dans le web storage ces nouvelles données de session lors du login ou du register : le token et le username.  
NB : précédemment vous aviez des données de session à gérer pour le thème et pour un message concernant le respect de la vie privée.

<AuthenticatedBlock>

Veuillez travailler avec les membres de votre groupe et vous partager le travail :
- certains membres peuvent travailler sur le frontend ;
- d'autres membres peuvent travailler sur le backend s'il vous reste des opérations à rajouter.

Un peu avant la fin de la séance, veuillez discuter :
- présenter ce que vous avez appris au niveau de la sécurisation aux membres qui ont travaillé sur autre chose.

</AuthenticatedBlock>

Quand votre prototype de frontend offre l'authentification (register & login) et utilise toutes les opérations sécurisées de votre API, que les sessions sont bien sauvegardées, veuillez faire un **`commit`** de votre code avec comme message : **`4.3.1 : hmi jwt auths`**.

#### 🤝 Tips

- N'hésitez pas à copier/coller les fichiers utiles trouvés dans le tutoriel associé à cette partie : **`RegisterPage`**, **`LoginPage`**, **`Logout`**, **`auths`**, **`Navbar`** (différent affichage pour un utilisateur anonyme que pour un utilisateur connecté)....
- Attention à ne pas oublier de mettre à jour votre **`Router`** : nouvelles pages pour le register, le login et le logout, la Navbar...
- Ajoutez les tokens dans le header de vos requêtes **`fetch`**... 
- Concernant le **`Router`**, il faut mettre à jour **`onNavBarClick`** pour que les gestionnaires d'evénéments restent attachés même quand la **`Navbar`** est réaffichée.
- 💭 Comment rendre invisible les opérations d'écriture de certaines ressources au sein du frontend ?  
Par exemple, vous pourriez afficher des boutons de type **`Delete`** ou **`Save`** que si l'utilisateur est authentifié.  
De même, si l'utilisateur est anonyme, les ressources ne devraient pas être éditables.

## 🍬 Gestion de session & remember me

Vous pourriez ajouter une fonction "remember me" à votre formulaire de "login" et de "register" et faire en sorte que vos données de session soient sauvegardées :
- dans le **`localStorage`** si l'on clique sur une checkbox "Remember me" ;
- dans le **`sessionStorage`** si l'on ne clique pas sur la checkbox "Remember me" lors du login ou du register.


Quand votre prototype de frontend est finalisé, veuillez faire un **`commit`** de votre code avec comme message : **`4.3.2 : remember me`**.


#### 🤝 Tips
- Vous allez pouvoir refaire un peu de gestion d'événements pour détecter les clics sur une checkbox. N'hésitez pas à voir ce que propose **Bootstrap 5** pour les **checkboxes**.
- Prenez un moment pour voir comment gérer la persistance de l'info 'Remember me'...  
Est-ce que ce n'est pas une donnée de session qui doit persister lorsque l'utilisateur ferme son browser ?  
En effet, point de vue ergonomie, il est intéressant que le dernier choix de l'utilisateur soit toujours présenté. La checkbox devrait donc rester **`checked`** ou pas, tant que l'utilisateur ne change pas son état, via un clic, ou via un Logout ; et cet état doit subsister aux travers des connexions (ouvertures / fermetures du browser).


# <InternalPageTitle> 🍬 Persistance de données de session via des cookies </InternalPageTitle>

## Authentification & autorisation JWT à l'aide de cookies

Dans la partie optionnelle sur l'[Authentification & autorisation JWT à l'aide de cookies](../security-api/#🍬_authentification_autorisation_jwt_a_laide_de_cookies), nous avons vu comment mettre à jour l'API afin d'intégrer les tokens JWT aux cookies.

Veuillez démarrer la version **`/web2/tutorials/pizzeria/api/cookies`** de la RESTful API de la pizzeria. En cas de souci, vous pouvez utiliser ce code-ci :
[api-cookies](https://github.com/e-vinci/js-demos/tree/main/backend-restful-api/restful-api-essentials/cookies).

Nous allons voir maintenant comment le frontend peut utiliser ces cookies.

## Gestion de session côté client via une IHM et des cookies

Pour ce nouveau tutoriel, nous allons repartir de la dernière version de notre frontend.

Au sein de votre repo **`web2`**, veuillez créer le projet nommé **`/web2/tutorials/pizzeria/hmi/cookies`** sur base d'un copié/collé de **`/web2/tutorials/pizzeria/hmi/web-storage`** (ou [web-storage-hmi](https://github.com/e-vinci/js-demos/tree/main/frontend/frontend-essentials/web-storage)).

Pour la suite du tutoriel, nous considérons que tous les chemins absolus démarrent du répertoire
**`/web2/tutorials/pizzeria/hmi/cookies`**.

Afin de sauvegarder les données de session, c'est à dire l'objet **`authenticatedUser`** contenant juste un username, nous ne devons même pas mettre à jour le fichier **`/usr/utils/auths.js`**. En effet, l'API **`cookies`** renvoie un objet du genre **`{username: "manager"}`**. Au niveau de l'IHM, le code est donc toujours fonctionnel pour sauvegarder le username grâce à `authenticatedUser`.

Il ne reste donc qu'à changer le code où nous avons besoin d'une autorisation. Pour l'application de gestion de la pizzeria, il s'agit de la création de pizza.  
Veuillez donc mettre à jour **`/src/Components/AddPizzaPage.js`** en enlevant ces deux lignes :
- l'authenticatedUser : **`const authenticatedUser = getAuthenticatedUser();`** et l'import associé (**`import { getAuthenticatedUser } from '../../utils/auths';`**),
- la ligne s'occupant de l'authorization header : **`Authorization: authenticatedUser.token`**.

Veuillez tester votre dernière version du frontend.
Loguez-vous avec l'utilisateur **`admin`** (et le password **`admin`**).  
Ajoutez une pizza et vérifiez qu'elle s'affiche bien.  

💭 Comment vérifier le cookie ?  
Tout en ayant la fenêtre de votre application ouverte, via Chrome, allez dans vos outils de développeurs : **`F12`**.  
Puis, dans l'onglet **`Application`**, cliquez sur **`Cookies`**, vous verrez apparaître **`http://localhost:8080`**. Cliquez sur cette URL, et vous verrez vos 2 cookies de session, **`user.sig`** et **`user`**.  
N'hésitez pas à aller décoder la valeur du cookie **`user`** sur [base64decode](https://www.base64decode.org/) en faisant un copier / coller de **`Value`**. Vous devriez voir quelque chose apparaître du style **`{"username":"manager","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbmFnZXIiLCJpYXQiOjE2NjE3NzUxMDgsImV4cCI6MTc0ODE3NTEwOH0.sAZqq6vbrjCCZZoLH-n8hJKBoXJJJ8jEoupk8xKu5WI"}`**  !

Toujours dans l'onglet **`Application`** des outils de développeurs de Chrome, faites un clear des cookies : clic droit sur **`http://localhost:8080`**, **`Clear`**.  
Tentez maintenant d'ajouter une pizza... Ca ne fonctionne plus, et c'est bien normal, car il n'y a plus de token qui est envoyé à l'API !  

Suite à ces tests, si tout fonctionne bien, faites un **`commit`** de votre repo (**`web2`**) avec comme message : **`cookies-hmi tutorial`**.

En cas de souci, vous pouvez utiliser le code du tutoriel :

- pour le frontend : [cookies-hmi](https://github.com/e-vinci/js-demos/tree/main/frontend/frontend-essentials/cookies).
- pour l'API : [api-cookies](https://github.com/e-vinci/js-demos/tree/main/backend-restful-api/restful-api-essentials/cookies).

💭 Notons que cette version de notre frontend pourrait être améliorée. Actuellement, lorsqu'on fait un logout, on n'efface pas le cookie du browser.   
Comment feriez vous ?  
*Vous pourriez par exemple appeler la méthode **`GET /auths/logout`** 😉.*
