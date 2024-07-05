# Comment gérer l'état avec React Router ?

Il est possible que vous ayez remarqué, dans le code du router du tutoriel précédent, qu'il semble compliqué, voire impossible, de faire passer des variables d'états & des fonctions pour mettre à jour cet état, entre routes...

Pour la pizzeria, l'IHM que nous avons développée s'est terminée avec le code du tutoriel `ui-library`. Néanmoins, pour la suite du cours, nous ne souhaitons pas vous imposer d'utiliser des composants de `Material UI`. Dès lors, nous avons restructuré le code pour avoir quelque chose de propre, qui contient :
- que du CSS sans composants `MUI`;
- deux pages : `HomePage` & `AddPizzaPage` ; 
- un router et une `NavBar` pour assurer la navigation.
Cette nouvelle version de l'App se trouve dans le projet `routing-starter`.

Veuillez créer un nouveau projet `routing-state` sur base d'un copier/coller du projet `routing-starter`. Attention, il est normal que votre projet ne s'exécute pas car il manque la gestion de l'état.

Veuillez vous assurer que vous comprenez le code associé au routage des pages : `main.tsx`, `App` et `HomePage` et `AddPizzaPage` sont à bien analyser.

Pour gérer l'état entre siblings (deux pages ici, l'équivalent de deux routes), nous avons appris précédemment qu'il fallait :
- Déclarer l'état au niveau du parent ainsi que des fonctions pour mettre à jour cet état
- Passer cet état & fonctions aux enfants (les pages ici) qui vont devoir l'utiliser.

Or ici, la relation "parent/enfant" est compliquée, car :
- il y a un composant `<App>` qui contient tout le squelette de l'application, pour les 2 pages de l'application ;
- il y a un composant `<Outlet>` qui s'occupe d'appeler les composants "enfant" (les pages) en fonction de la route.

Ainsi, il n'est pas vraiment possible de classiquement faire un "drill" des variables d'état et des fonctions. On ne peut passer les variables d'état de `App` & fonction pour mettre à jour cet état vers `HomePage` et `AddMoviePage`.

Il existe plusieurs façon de gérer de manière élégante l'état de l'application. Ici, nous allons voir ce que React Router met à notre disposition.

# Utilisation d'un OutletContext

Dans une route "parent", nous allons définir un contexte à l'aide de composant `Outlet`. Ce contexte peut être n'importe quelle donnée ou fonction que nous souhaitons partager avec les routes "enfants".

Dans une route "enfant", nous pouvons accéder au contexte en utilisant le hook `useOutletContext`.

Commençons par mettre à jour `App` en y ajoutant la définition et le passage du contexte aux routes "enfants" :
```tsx
const App = () => {
  const [actionToBePerformed, setActionToBePerformed] = useState(false);
  const [pizzas, setPizzas] = useState(defaultPizzas);

  const addPizza = (newPizza: NewPizza) => {
    const pizzaAdded = { ...newPizza, id: nextPizzaId(pizzas) };
    setPizzas([...pizzas, pizzaAdded]);
  };

  const handleHeaderClick = () => {
    setActionToBePerformed(true);
  };

  const clearActionToBePerformed = () => {
    setActionToBePerformed(false);
  };

  const fullPizzaContext: PizzaContext = {
    addPizza,
    pizzas,
    setPizzas,
    actionToBePerformed,
    setActionToBePerformed,
    clearActionToBePerformed,
    drinks,
  };

  return (
    <div className="page">
      <Header
        title="We love Pizza"
        version={0 + 1}
        handleHeaderClick={handleHeaderClick}
      />
      <main>
        <NavBar />
        <Outlet context={fullPizzaContext} />
      </main>
      <Footer />
    </div>
  );
};
```

Pour que TS soit OK au niveau des types, nous avons défini un nouveau type dans `/src/types.ts` :
```ts
interface PizzeriaContext {
  pizzas: Pizza[];
  setPizzas: (pizzas: Pizza[]) => void;
  actionToBePerformed: boolean;
  setActionToBePerformed: (actionToBePerformed: boolean) => void;
  clearActionToBePerformed: () => void;
  drinks: Drink[];
  addPizza: (newPizza: NewPizza) => void;
}

export type { Pizza, NewPizza, Drink, PizzeriaContext };
```

Veuillez importer ce nouveau type dans `App`.

Maintenant, nous souhaitons mettre à jour `HomePage` pour récupérer, via le hook `useOutletContext`, le `PizzeriaContext` : 
```tsx
const HomePage = () => {
  const {
    actionToBePerformed,
    clearActionToBePerformed,
    pizzas,
    drinks,
  }: PizzeriaContext = useOutletContext();

  return (
    <>
      <h1>Ma Pizzeria</h1>
      <p>
        Parce que nous aimons le JS/TS, vous pouvez cliquer sur le header pour
        démarrer / stopper la musique ; )
      </p>
      <AudioPlayer
        sound={sound}
        actionToBePerformed={actionToBePerformed}
        clearActionToBePerformed={clearActionToBePerformed}
      />

      <PizzaMenu pizzas={pizzas} />

      <DrinkMenu title="Nos boissons" drinks={drinks} />
    </>
  );
};
```

Puis nous souhaitons aussi mettre à jour `AddMoviePage` pour récupérer la fonction `addPizza` du contexte : 
```tsx
const AddPizzaPage = () => {
  const { addPizza }: PizzeriaContext = useOutletContext();
```

N'oubliez pas de faire l'import de `useOutletContext` et du type `PizzeriaContext`.
Une fois les changements effectués, vous devriez avoir une application pleinement fonctionnelle, avec un routing moderne et une gestion de l'état élégante.

# Exercice : état & routes dynamiques (ex12)
Veuillez continuer votre exercice précédent en y intégrant :
- Une `AddMoviePage` qui permette d'ajouter un film à la liste des films. Une fois un film ajouté, l'utilisateur est automatiquement redirigé vers la `MovieListPage`.


Une fois tout fonctionel, veuillez faire un commit avec le message suivant : "new:exXY".

# Excercice : routes dynamiques (ex13)
Veuillez continuer l'exercice précédent (`/exercises/XY`).

Nous vous demandons : 
- De mettre à jour la `HomePage` afin qu'elle n'affiche que le titre de vos films favoris (`/exercises/XY`).
- Il doit être possible de pouvoir cliquer sur le titre d'un de vos films favoris et de naviguer vers une nouvelle `MoviePage` qui affichera toutes les infos de ce film-ci. Pour ce faire, vous devez ajouter un id à vos films, et cette id doit être visible dans l'URL quand les utilisateurs cliquent sur un titre donné dans la `HomePage`.

Une fois tout fonctionel, veuillez faire un commit avec le message suivant : "new:exXY".