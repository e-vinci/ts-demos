# Boilerplate d'une RESTful API basique en TS

## Comment l'utiliser ?
### Installation
- Si vous ne l'avez pas fait, vous pouvez cloner le repo associé au boilerplate pour initier votre application : `git clone https://github.com/e-vinci/basic-ts-api-boilerplate.git` ou `git clone https://github.com/e-vinci/basic-ts-api-boilerplate.git nom-de-votre-projet` pour créer votre projet nommé `nom-de-votre-projet`.
- **package.json** est le fichier de configuration de votre projet. Veuillez le mettre à jour afin de :
  - donnnez un nom à votre projet & une description ;
  - vous identifier comme auteur.
- ⚡ Si vous avez cloné votre projet au sein d'un repo existant, Git ne trackera pas ce nouveau projet ; en effet, Git ne tracque pas des projets Git dans des projets Git.
  Pour vous assurer que Git traque votre nouveau projet imbriqué dans un repo, vous devez effacer le répertoire **.git** se trouvant dans votre nouveau projet. N'hésitez pas aussi à effacer **.gitignore** se trouvant dans votre nouveau projet.
- Par contre, si vous souhaitez créer un nouveau repo à l'aide de votre boilerplate,
  vous pouvez utiliser le **.gitignore** existant. Vous pouvez aussi éventuellement utiliser le
  **.git**, mais cela signifie que vous hériterez de tous les changements associés au boilerplate,
  et que vous devrez changer l'origine (`git remote remove origin`, `git remote add origin LINK_TO_YOUR_REPO`). Nous vous recommandons plutôt d'effacer le répertoire **.git** et de
  réinitialiser un projet git (`git init`, `git remote add origin LINK_TO_YOUR_REPO`).
- Installation des dépendances et démarrage du boilerplate :

```shell
cd nom-de-votre-projet # (le nom donné au répertoire de votre projet)
npm i # (equivalent de npm install)
```

### Exécution du programme dans un environnement de développement
- Pour travailler avec un environement de développement confortable offrant un hot reload de votre application à chaque modification de script, il suffit de taper : 
```shell
npm run dev
```
- N'oubliez pas d'activer la sauvegarde automatique au sein de VS Code, car c'est à chaque sauvegarde de fichier que le hot reload va s'effectuer.

### Exécution du programme dans un environnement de production
- Pour déployer son application pour un environnement de production, il faut d'abord la "build" avec la commande :
```shell
npm run tsc
```
- Cela va générer, à partir de vos scripts `.ts`, du code JS optimisé dans le répertoire `/build` de votre application.
- Si votre build de production est réussi, vous pouvez exécuter votre application prête pour la production à l'aide de la commande :
```shell
npm run start
```


## Utilisation du linter et du formatter pour TS

- Pour bénéficier de feedback sur le code lors de son écriture, vous devez avoir installé l'extension **ESLint** au sein de VS Code.
- Vous devez aussi avoir ouvert le projet comme Workspace dans VS Code : `File`, `Open Folder...`. Le fichier de configuration de TypeScript (qui spécifie les options de compilation pour le compilateur TypeScript `tsc`) doit se trouver à la racine de votre Workspace.
- Pour formatter votre code, vous devez avoir installé l'extension **prettier** au sein de VS Code.
- Vous pouvez facilement formatter votre code :
  - soit en tapant `Alt Shift F `(`Option Shift F` sous MacOS);
  - soit en faisant un clic droit sur votre script, **Format Document** ; la première fois, il se peut que vous deviez sélectionner **prettier** comme formater : dans un fichier `.ts`, clic droit, `Format Document With...`, `Configure Default Formatter`.
- Pour info, la configuration des règles de **ESLint** se fait dans le fichier
  **.eslintrc** devant se trouver à la racine d'un projet et offert au sein du boilerplate.
- Il est possible de bénéficier d'un check du projet par le linter et de voir tous les avertissement ou erreurs en tapant cette commande dans votre projet :
```shell
npm run lint
```


## Utilisation du debugger

### Utilisation de la configuratin de debug offerte
Nous vous offrons une configuration de Debug permettant de facilement débugger plusieurs applications au sein d'un même folder de VS Code. Cette configuration se trouve dans le fichier **.vscode/launch.json**.  
Cette configuration est active au sein de VS Code que si elle se trouve à la racine du folder ouverte dans VS Code. Vous devez donc vous assurer que le dossier **.vscode** et son fichier **launch.json** se trouvent au bon endroit. Voici deux scénarios :

- Si vous ouvrez un seul projet au sein de VS Code, c'est-à-dire que le folder ouvert de VS Code est le clone de ce boilerplate) : vous ne devez pas déplacer le répertoire **.vscode**, tout est bien configuré.
- Si vous ouvrez ou folder de VS Code contenant plusieurs projets, comme par exemple un repository contenant plusieurs API : vous devez déplacer **.vscode** à la racine du folder ouvert dans VS Code.

Si vous avez plusieurs applications au sein d'un folder de VS Code, pour débugger une application en particulier, nous vous conseillons cette approche :

- Ouvrez le fichier **package.json** de l'application à débugger ;
- Cliquez sur l'icône **Run and Debug** à gauche de l'Explorer, puis cliquez sur **Start Debugging** (ou cliquez juste sur **F5**) en vérifiant que la configuration de debugging sélectionnée est bien nommée **Launch via NPM**.

Nottons que le nom de la configuration de debugging peut facilment être modifiée en changeant la valeur de l'attribut **name** dans **/.vscode/launch.json**.

### Utilisation du debugger TS
Il existe un autre moyen de débugger son application au sein de VS Code :
- Veuillez installer l'extension TypeScript Debugger au sein de VS Code;
- Ensuite, il vous suffit de créer une configuration de Debug (`Add Configuration...`, `TS Debug`) ou vous pouvez sélectionner la configuration offert nommée `ts-node`. Une fois que votre configuration est ouverte après avoir cliqué sur l'onglet de Debug, vous êtes prêt à débugger.
- Ouvrez le script d'entrée de votre application : `/bin/www.ts`.
- Cliquez sur `Start Debugging` ou csur `F5` en vérifiant que la configuration de debugging sélectionnée est bien nommée `ts-node` (ou le nom que vous auriez choisi pour la configuration de votre debugger pour TS).

## Comment ajouter un package ?

- Installation d'un package : `npm i nomDuPackage`
  Pour plus d'info sur un package, ou pour trouver un package traitant d'un sujet qui vous intéresse : https://www.npmjs.com
- Modification du code pour l'utiliser, au sein de `/src/index.js` (ou tout autre module .js) : chargement de la librairie soit via `import` (ou `require`) du package. Généralement, les instructions d'installation et d'utilisation d'un package sont données sur le site de https://www.npmjs.com.
- Si quelqu'un souhaite installer et exécuter ce projet, la gestion des dépendances est très simple : copie du répertoire du projet (sans `node_modules`), `npm i`, `npm run dev`. Il n'y a donc pas de librairies à gérer manuellement pour reprendre le projet d'un tiers.


# Crédit :
- La configuration du projet pour utiliser TS & le linter a été reprise du cours de Fullstack Open (`Typing an Express app` : https://fullstackopen.com/en/part9/typing_an_express_app ainsi que via https://github.com/fullstack-hy2020/flight-diary).