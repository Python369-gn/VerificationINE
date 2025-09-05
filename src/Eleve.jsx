import React from 'react'
import { useState } from 'react'
const Eleve = () => {

          const eleves = [
    { id: 1, nom: "Diallo", prenom: "Awa", classe: "Terminale", annee: 2020 },
    { id: 2, nom: "Sow", prenom: "Moussa", classe: "Première", annee: 2022 },
    { id: 3, nom: "Ba", prenom: "Fatou", classe: "Seconde", annee: 2025 },
    { id: 4, nom: "Sy", prenom: "Ali", classe: "Terminale", annee: 2025 },
    { id: 5, nom: "Fall", prenom: "Mariama", classe: "Première", annee: 2022 }
  ];

  const [anneeRecherchee, setAnneeRecherchee] = useState('');


  const elevesFiltres = anneeRecherchee
    ? eleves.filter(eleve => eleve.annee === Number(anneeRecherchee))
    : eleves;

  return (
    <>
          <h2>Liste des élèves</h2>
      <input
        type="number"
        placeholder="Entrer une année (ex: 2025)"
        value={anneeRecherchee}
        onChange={e => setAnneeRecherchee(e.target.value)}
      />
      <ul>
        {elevesFiltres.length > 0 ? (
          elevesFiltres.map(eleve => (
            <li key={eleve.id}>
              {eleve.prenom} {eleve.nom} - {eleve.classe} ({eleve.annee})
            </li>
          ))
        ) : (
          <li>Aucun élève inscrit pour cette année.</li>
        )}
      </ul>
  
    </>
  )
}

export default Eleve