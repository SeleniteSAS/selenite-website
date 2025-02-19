# Selenite - Site Web

Selenite est un jeu de vaisseaux spatiaux se déroulant sur la Lune. Ce site web accompagne le projet en fournissant des fonctionnalités communautaires, des informations sur le jeu et un accès aux services en ligne.

## 🛠️ Technologies utilisées

### Frontend

- **Next.js** - Framework React pour une application rapide et optimisée
- **Tailwind CSS** - Style avec des classes utilitaires
- **Three.js & React Three Fiber** - Rendu 3D pour une expérience immersive
- **Zustand** - Gestion d'état simple et efficace
- **Zod** - Validation des données côté frontend

### Backend

- **MongoDB** - Base de données NoSQL pour stocker les données du jeu et des utilisateurs
- **Prisma** - ORM pour interagir avec MongoDB
- **Auth.js** - Gestion de l'authentification des utilisateurs

### Qualité & Sécurité

- **SonarQube** - Analyse de code statique pour améliorer la qualité et la sécurité

## 🚀 Déploiement

Le site est déployé avec :

- **Coolify** - Gestionnaire de déploiement simplifié
- **Docker** - Conteneurisation pour assurer la portabilité
- **GitHub** - CI/CD et gestion du code source

## 📦 Installation & Développement

### Prérequis

- Node.js (dernière version recommandée)
- Docker (optionnel pour l’environnement de dev)

### Installation

```bash
git clone https://github.com/selenite-live/selenite-website.git
cd selenite
npm install
```

### Lancement en local

```bash
npm dev
```

### Serveur de production en local

```bash
npm build
npm start
```

### Déploiement

Le site est déployé via Coolify et Docker à l'url suivante : [selenite.live](https://selenite.live)

---

Contributeurs :

- Pierre Guéroult
- Clément Omnès
