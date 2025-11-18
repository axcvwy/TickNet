# NickNET — Billetterie locale (Front-end Vue.js)

Ce dépôt contient la partie front-end (Vue 3 + Vite + Pinia) du projet NickNET — une application de billetterie locale destinée à un théâtre.

## Objectifs implémentés
- Consulter la liste des spectacles (titre, date, prix, image).
- Consulter le détail d'un spectacle et réserver (formulaire simple, enregistrement local).
- Consulter l'historique des réservations (recherche par email / auto via connexion).
- Espace administrateur (CRUD spectacles) avec protection par rôle (admin/user).
- Thème professionnel (blanc/rouge), responsive mobile-first, affiches d'exemple.

## Architecture et fichiers clés
- `src/stores` : Pinia stores — `shows.ts`, `reservations.ts`, `auth.ts`.
- `src/pages` : pages (liste, détail, mes réservations, admin, login, admin form).
- `src/components` : `NavBar`, `ShowCard`, `FooterBar`, `SeatMap` (prototype), `CheckoutForm`.
- `public/images` : affiches SVG d'exemple.

## Démarrage local
1. Installer les dépendances :
```powershell
npm install
```
2. Lancer le serveur de développement :
```powershell
npm run dev
```
3. Ouvrir l'URL indiquée par Vite (ex. `http://localhost:5173`).

## Comptes de démonstration
- Administrateur : `admin@theatre.local` / mot de passe `admin` (accès à l'espace admin)
- Utilisateur : tout autre email / mot de passe (rôle `user`)

## Persistance
Prototype : données stockées dans `localStorage` (shows, reservations, auth). Remplacer par API + PostgreSQL pour production.

## API
`src/services/api.ts` contient un stub et sera le point d'entrée pour une API REST (FastAPI recommandé pour le back-end).

## Prochaines améliorations suggérées
- Intégrer un back-end FastAPI + PostgreSQL pour persistance centralisée et authentification sécurisée.
- Mettre en place des tests unitaires et E2E.
- Ajouter animations et modales (confirmation, toasts) pour meilleure UX.
- Renforcer l'accessibilité (ARIA, focus management) et l'internationalisation.

## Support
Si vous voulez que j'implémente l'un des éléments suivants maintenant :
- connexion au back-end (boilerplate FastAPI + endpoints),
- ajout d'un carrousel d'affiches sur la page d'accueil,
- amélioration de l'espace admin (table avancée, export CSV),
faites-moi signe et je l'ajoute.

---

Projet développé pour démonstration locale — NickNET
