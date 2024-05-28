import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const ResponseList = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/all')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched responses:', data);
        setResponses(data);
      })
      .catch(error => console.error("Erreur lors de la récupération des réponses :", error));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Liste des Réponses</h1>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">Titre du Formulaire</th>
              <th className="border px-4 py-2 text-left">Email de l'Utilisateur</th>
              <th className="border px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {responses.map(response => (
              <tr key={response._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{response.formTitle}</td>
                <td className="border px-4 py-2">{response.userEmail}</td>
                <td className="border px-4 py-2 flex items-center space-x-4">
                  <Link to={`/response/${response._id}`} className="text-blue-500 hover:text-blue-700 transition duration-200">
                    <FontAwesomeIcon icon={faEye} size="lg" />
                    <span className="ml-2">Voir</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResponseList;
