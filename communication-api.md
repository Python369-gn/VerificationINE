# Communication avec une API en React : Bonnes pratiques
DIEO2412743664
## 1. Choix entre Fetch API et Axios

- **Fetch API** :
  - Native dans tous les navigateurs modernes, aucune installation nécessaire.
  - Syntaxe basée sur les Promises.
  - Nécessite plus de code pour la gestion des erreurs et la transformation automatique des réponses JSON.

- **Axios** :
  - Bibliothèque externe à installer (`npm install axios`).
  - Syntaxe plus concise et intuitive.
  - Gère automatiquement la transformation JSON, les requêtes/headers, l’annulation, les intercepteurs, etc.
  - Meilleure gestion des erreurs (statut HTTP ≠ 2xx est automatiquement une erreur).

**Résumé** :
- Utilisez Fetch pour des besoins simples ou si vous ne voulez pas de dépendance externe.
- Utilisez Axios pour des projets plus complexes ou si vous souhaitez une API plus riche et une gestion d’erreurs simplifiée.

## 2. Utilisation des appels asynchrones pour récupérer et afficher les données

- Utilisez `async/await` pour rendre le code plus lisible.
- Placez les appels API dans un effet (`useEffect`) pour charger les données au montage du composant.
- Stockez les données dans un `useState`.

## 3. Gestion des états de chargement et des erreurs

- Utilisez un état `loading` pour indiquer que les données sont en cours de chargement.
- Utilisez un état `error` pour afficher un message en cas d’échec de la requête.
- Affichez un indicateur de chargement ou un message d’erreur pour améliorer l’expérience utilisateur.

---

# Exemples complets

## Exemple 1 : Utilisation de Fetch API

```jsx
import React, { useEffect, useState } from 'react';

const UsersFetch = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des utilisateurs');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{color:'red'}}>{error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name} ({user.email})</li>
      ))}
    </ul>
  );
};

export default UsersFetch;
```

## Exemple 2 : Utilisation d’Axios

```jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersAxios = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{color:'red'}}>{error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name} ({user.email})</li>
      ))}
    </ul>
  );
};

export default UsersAxios;
```

---

**Bonnes pratiques supplémentaires** :
- Toujours gérer les erreurs réseau et afficher un message à l’utilisateur.
- Afficher un indicateur de chargement pendant la récupération des données.
- Nettoyer les effets si besoin (ex : annuler une requête si le composant est démonté).
