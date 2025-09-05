// src/components/StudentVerification.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentCard from "./StudentCard";

export default function StudentVerification() {
  const [ine, setIne] = useState("");
  const [status, setStatus] = useState(null);
  const [student, setStudent] = useState(null);
  const [history, setHistory] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("ineHistory")) || [];
    setHistory(savedHistory);
  }, []);

  const handleVerify = async () => {
    if (!ine.trim()) {
      setStatus("invalid");
      setStudent(null);
      return;
    }

    try {
      setStatus("loading");
      setStudent(null);

      const res = await axios.get(
        `https://api.parcoursupguinee.org/api/Student/GetStudentCardInfo/${ine}`
      );

      if (res.data && res.data.isValid) {
        setStatus("valid");
        setStudent(res.data);

        if (!history.includes(ine)) {
          const newHistory = [ine, ...history].slice(0, 5);
          setHistory(newHistory);
          localStorage.setItem("ineHistory", JSON.stringify(newHistory));
        }
      } else {
        setStatus("error");
        setStudent(null);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setStudent(null);
    }
  };

  const selectHistory = (value) => {
    setIne(value);
    setDropdownOpen(false);
  };

  return (
    <div className="max-w-lg w-full mx-auto p-6 bg-white shadow-2xl rounded-3xl mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Vérification Carte Étudiant</h1>

      <div className="relative mb-4">
        <input
          type="text"
          value={ine}
          onChange={(e) => setIne(e.target.value)}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setTimeout(() => setDropdownOpen(false), 200)} // léger délai pour clic sur dropdown
          placeholder="Entrez votre INE"
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {dropdownOpen && history.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl mt-1 max-h-40 overflow-y-auto shadow-lg">
            {history.map((h, i) => (
              <li
                key={i}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => selectHistory(h)}
              >
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleVerify}
        className="w-full px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors mb-4"
      >
        Vérifier
      </button>

      <div className="text-center min-h-[2rem]">
        {status === "loading" && <p className="text-gray-600 text-lg">⌛ Chargement...</p>}
        {status === "invalid" && <p className="text-red-500 text-lg">🔍 Veuillez fournir un INE valide !</p>}
        {status === "valid" && student && (
          <p className="text-green-600 text-lg font-semibold">
            ✅ Carte valide - Période : {student.startYear} - {student.endYear}
          </p>
        )}
        {status === "error" && <p className="text-red-500 text-lg font-semibold">❌ Carte invalide</p>}
      </div>

      {status === "valid" && student && <StudentCard student={student} />}
    </div>
  );
}
