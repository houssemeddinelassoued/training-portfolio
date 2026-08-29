# Portfolio de formations

Site vitrine statique des formations informatiques proposees par le formateur.
Il presente les formations par theme, leurs objectifs pedagogiques et leurs programmes detailles dans une fenetre contextuelle.

Le site est publie avec GitHub Pages :

https://houssemeddinelassoued.github.io/training-portfolio/

## Contenu

- `index.html` : structure et contenu du portfolio
- `cv.html` : version Web du CV et lien vers le document complet
- `styles.css` : styles responsives
- `script.js` : menu mobile, annee du pied de page et programmes detailles
- `assets/cv/` : emplacement reserve au CV
- `programmes/` : documents de travail et programmes PDF locaux

## Apercu local

Ce projet ne requiert ni installation de dependances ni phase de build. Ouvrez `index.html` dans un navigateur, ou lancez un serveur statique depuis la racine du projet :

```powershell
python -m http.server 8000
```

Puis ouvrez `http://localhost:8000`.

## CV et documents PDF

Les fichiers PDF sont ignores par defaut. Seul `assets/cv/CV-HoussemEddineLassoued-2026.pdf` est explicitement publie afin que les boutons de telechargement fonctionnent sur GitHub Pages.

## Deploiement

GitHub Pages est configure pour publier la racine de la branche `main`. Chaque commit pousse sur `main` declenche une nouvelle publication du site.