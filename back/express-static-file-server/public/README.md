# Création d’un frontend pour une pizzeria : Step -2 - Option A : frontend classique HTML / CSS / JS
## How to ?
- Simple développement d'une page HTML (`index.html`) reprenant des images et du son. 
- Pour générer le corps de sa page HTML, on peut utiliser une abbréviation Emmet au sein de VS Code : pour cela tapper 
`html:5` dans le fichier `index.html`
- En savoir plus sur les abbréviations Emmet : https://docs.emmet.io/abbreviations/
- La gestion du démarrage ou de la pause du son, lors d'un clic sur le header, est gérée dans un script externe au sein de `index.js`
- Comment démarrer l'application Web ?
    - Installation de l'extension `Live Server` au sein de VS Code.
    - Exécution de  `index.hmtl` en faisant un clic droit sur ce fichier dans l'explorer de VS Code, puis `Open with Live Server`

## Mise en forme
- La mise en forme de la page est gérée ici via le CSS dans le fichier `/stylesheets/style.css`
- Il est intéressant de noter comment le layout de la page fait toujour, au minimum, la hauteur complète du navigateur : utilisation d'un body repris comme un un élément Flexbox faisant 100% de hauteur. Ensuite, le `main` est paramétré pour lui permettre de remplir l'espace disponible. Ainsi, le footer donne l'effet d'être "sticky" en bas de la page.


# Resources
- photo de : https://unsplash.com/ (Sahand Hoseini)
- musique de : https://freemusicarchive.org/music/Infecticide : Infecticide - Chansons Tristes - 11. Infecticide - Pizza Spinoza