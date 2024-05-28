import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewRes = () => {
  const { id } = useParams();
  const [response, setResponse] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/all/${id}`)
      .then(response => response.json())
      .then(data => setResponse(data))
      .catch(error => console.error("Erreur lors de la récupération des détails de la réponse :", error));
  }, [id]);

  if (!response) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Détails de la Réponse</h1>
        <div className="mb-4">
          
          <p><strong>Nom de l'Utilisateur:</strong> {response.userName}</p>
          <p><strong>Email de l'Utilisateur:</strong> {response.userEmail}</p>
        </div>
        <div>
          <strong>Données du Formulaire:</strong>
          <ul className="list-disc pl-6">
            {response.formData.map((data, index) => (
              <li key={index}><strong>{data.label}:</strong> {data.value}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewRes;
