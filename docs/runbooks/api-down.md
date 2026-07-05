# Runbook — Service API down

## Objectif
Intervenir rapidement lorsqu'une alerte indique que l'API DAPI ne répond plus ou qu'un service backend est indisponible.

## Détection
- Logs Docker anormaux ou service non démarré

## Diagnostic
```bash
docker compose ps
docker compose logs dapi-backend
docker compose exec dapi-backend sh
```

## Vérifications prioritaires
1. Vérifier que le conteneur backend est en cours d'exécution.
2. Vérifier les logs applicatifs pour détecter une erreur de démarrage.
3. Vérifier si la base de données est accessible.
4. Vérifier la consommation CPU/mémoire du conteneur.

## Mitigation
- Si le conteneur a crashé : relancer la stack.
  ```bash
  docker compose up -d --force-recreate dapi-backend
  ```
- Si la base de données est en panne : appliquer le runbook associé à la base de données.
- Si l'erreur est récente et liée à une version déployée : revenir à la version précédente.
  ```bash
  docker compose down
  docker compose up -d
  ```

## Escalade
- Si l'incident persiste après relance, collecter les logs et ouvrir une issue / incident.
- Conserver les traces de l'erreur et la version de l'image utilisée.
