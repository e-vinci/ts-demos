# <InternalPageTitle> 🍬 Persistance de données de session via des cookies </InternalPageTitle>

## Authentification & autorisation JWT à l'aide de cookies

Dans la partie optionnelle sur l'[Authentification & autorisation JWT à l'aide de cookies](../security-api/#🍬_authentification_autorisation_jwt_a_laide_de_cookies), nous avons vu comment mettre à jour l'API afin d'intégrer les tokens JWT aux cookies.

Veuillez démarrer la version **`/web2/tutorials/pizzeria/api/cookies`** de la RESTful API de la pizzeria. En cas de souci, vous pouvez utiliser ce code-ci :
[TBD](https://TBD).

Nous allons voir maintenant comment le frontend peut utiliser ces cookies.

## Gestion de session côté client via une IHM et des cookies

Pour ce nouveau tutoriel, veuillez créer un projet nommé `cookies` sur base du projet `session-jwt`.

Afin de sauvegarder les données de session, c'est à dire l'objet **`authenticatedUser`** contenant juste un username, nous ne devons même pas mettre à jour le fichier **`/src/utils/session.js`**. En effet, l'API **`cookies`** renvoie un objet du genre **`{username: "manager"}`**. Au niveau de l'IHM, le code est donc toujours fonctionnel pour sauvegarder le username grâce à `authenticatedUser`.

Il ne reste donc qu'à changer le code où nous avons besoin d'une autorisation. Pour l'application de gestion de la pizzeria, il s'agit de la création de pizza.  
Veuillez donc mettre à jour **`App`** pour enlever la ligne s'occupant de l'authorization header : **`Authorization: authenticatedUser.token`** :
```tsx
const addPizza = async (newPizza: NewPizza) => {
    try {
      if (!authenticatedUser) {
        throw new Error("You must be authenticated to add a pizza");
      }
      const options = {
        method: "POST",
        body: JSON.stringify(newPizza),
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Suite du code ...
```

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

💭 Notons que cette version de notre frontend pourrait être améliorée. Actuellement, lorsqu'on fait un logout, on n'efface pas le cookie du browser.   
Comment feriez vous ?  
*Vous pourriez par exemple appeler la méthode **`GET /auths/logout`** 😉.*
