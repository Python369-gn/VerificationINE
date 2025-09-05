// src/components/StudentCard.jsx
import React from "react";

export default function StudentCard({ student }) {
  // Correction Nom / Prénom
  const nameParts = student.fullName.trim().split(" ");
  const lastName = nameParts[nameParts.length - 1];
  const firstName = nameParts.slice(0, nameParts.length - 1).join(" ");

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-8 border-blue-600 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Carte Étudiant</h2>
      
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <p><span className="font-semibold">Nom :</span> {lastName}</p>
        <p><span className="font-semibold">Prénom :</span> {firstName}</p>
        <p><span className="font-semibold">INE :</span> {student.identifiantNationalEleve}</p>
        <p><span className="font-semibold">Niveau :</span> {student.niveau}</p>
        <p><span className="font-semibold">Établissement :</span> {student.institution}</p>
        <p><span className="font-semibold">Filière :</span> {student.programme}</p>
        <p className="col-span-2"><span className="font-semibold">Validité :</span> {student.startYear} - {student.endYear}</p>
        <p className="col-span-2"><span className="font-semibold">Année Universitaire :</span> {student.anneeUniversitaire}</p>
      </div>

      <div className="mt-4 text-center">
        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold">
          ✅ Valide
        </span>
      </div>
    </div>
  );
}

