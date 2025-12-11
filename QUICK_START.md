# 🚀 Guide de Démarrage Rapide

## ⚡ Configuration Initiale (2 minutes)

### 1. Installation des dépendances
```bash
npm install
```

### 2. Lancer le serveur de développement
```bash
npm run dev
```

L'application sera disponible à: **http://localhost:5173**

### 3. (Optionnel) Vérifier le build
```bash
npm run build
```

---

## 📖 Premiers Pas

### 1. Explorer la Structure
```bash
# Voir la structure du projet
tree src/

# Voir les composants
ls src/components/

# Voir les services
ls src/services/
```

### 2. Comprendre le Flux
1. **App.jsx** - Composant principal (gestion d'état)
2. **components/** - Composants réutilisables
3. **services/** - Appels API
4. **hooks/** - Logique réutilisable
5. **utils/** - Fonctions utilitaires

### 3. Modifier le Code
- Ouvrez `src/App.jsx` pour voir la logique principale
- Modifiez les composants dans `src/components/`
- Les changements sont appliqués automatiquement (HMR)

---

## 🔧 Commandes Importantes

```bash
# Développement
npm run dev           # Lancer le serveur (HMR activé)

# Production
npm run build         # Compiler pour production
npm run preview       # Prévisualiser la build

# Qualité du code
npm run lint          # Vérifier les erreurs ESLint
npx eslint . --fix   # Corriger automatiquement

# Autres
npm install           # Installer les dépendances
npm update            # Mettre à jour les dépendances
```

---

## 💡 Conseils de Développement

### Hot Module Replacement (HMR)
- Les changements CSS sont appliqués **sans rechargement** de la page
- Les changements de composants nécessitent un rechargement (normal avec React)
- Cela accélère le développement

### Déboguer
```javascript
// Utiliser console.log pour afficher des valeurs
console.log('Ma variable:', myVariable);

// Utiliser les React DevTools (extension navigateur)
// Utiliser l'onglet Network pour déboguer les API
// Utiliser l'onglet Console pour les erreurs
```

### Styles CSS
- Chaque composant a son fichier CSS associé
- Utiliser le format BEM : `.search-bar`, `.search-bar__input`, `.search-bar__button--active`
- Les styles sont scoped au composant par le biais des noms de classe

### Performance
- Les composants lourds peuvent utiliser `React.memo()`
- Utiliser `useCallback()` pour optimiser les callbacks
- Utiliser `useMemo()` pour éviter les recalculs

---

## 🐛 Troubleshooting

### La carte n'apparaît pas
```javascript
// Vérifier que Leaflet est importé dans Map.jsx
import 'leaflet/dist/leaflet.css';
```

### Les places PMR ne s'affichent pas
1. Vérifier que l'API Nantes Métropole est accessible
2. Vérifier la console (F12) pour les erreurs réseau
3. Vérifier que `pmrLocations` est défini dans l'état

### Port 5173 déjà utilisé
```bash
# Utiliser un port différent
npm run dev -- --port 3000
```

### Build échoue
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📚 Documentation

| Document | Objectif |
|----------|----------|
| **README.md** | Vue d'ensemble du projet |
| **PROJECT_SUMMARY.md** | Résumé technique complet |
| **STYLE_GUIDE.md** | Conventions de code |
| **CONTRIBUTING.md** | Comment contribuer |
| **CHANGELOG.md** | Historique des versions |

---

## 🎯 Prochaines Étapes

### Pour Compléter le Projet
1. [ ] Intégrer l'API IGN complète pour géocodage réel
2. [ ] Intégrer l'API IGN Routing pour vrais itinéraires
3. [ ] Ajouter une base de données (Firebase, PostgreSQL)
4. [ ] Implémenter l'authentification
5. [ ] Ajouter des tests (Jest + React Testing Library)
6. [ ] Setup CI/CD (GitHub Actions)

### Pour Améliorer le Code
1. [ ] Migrer vers TypeScript
2. [ ] Utiliser Zustand pour gestion d'état avancée
3. [ ] Ajouter Sentry pour error tracking
4. [ ] Optimiser les images avec WebP
5. [ ] Implémenter PWA (Service Worker)

### Pour Meilleure UX
1. [ ] Ajouter des notifications toast
2. [ ] Ajouter des modals de confirmation
3. [ ] Améliorer les animations
4. [ ] Ajouter des skeletons de chargement
5. [ ] Dark mode complet

---

## 🆘 Besoin d'Aide?

1. **Consulter la documentation** dans le dossier racine
2. **Vérifier les logs** dans la console (F12)
3. **Vérifier le réseau** (F12 → Network)
4. **Relancer le serveur** : Ctrl+C puis `npm run dev`
5. **Nettoyer le cache** : `npm cache clean --force`

---

## ✨ Raccourcis Clavier

| Raccourci | Action |
|-----------|--------|
| `Ctrl+S` | Sauvegarder (auto avec HMR) |
| `F12` | Ouvrir DevTools |
| `Ctrl+Shift+C` | Inspecter un élément |
| `Ctrl+Alt+J` | Console DevTools |

---

**Bon développement! 🎉**

Pour des questions, consultez la section Support dans README.md

