import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import emailjs from 'emailjs-com';

function FormById() {
  const [formData, setFormData] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchFormById = async () => {
      try {
        const response = await fetch(`http://localhost:3000/forms/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormById();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { title, inputs } = formData;
      const formDataToSubmit = {
        title,
        inputs: inputs.map(input => ({
          label: input.label,
          value: input.value
        }))
      };

      console.log('Data to submit:', formDataToSubmit);

      const response = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formId: id,
          formData: formDataToSubmit.inputs,
          userEmail: userEmail,
          userName: userName
        })
      });

      if (response.ok) {
        alert('Vos informations ont été enregistrées avec succès.');
        
        // Envoyer l'email avec EmailJS
        const emailParams = {
          from_email: userEmail,
          from_name: userName, // Nom de l'utilisateur
          form_id: id // ID du formulaire
        };

        emailjs.send('votre_service_id', 'votre_template_id', emailParams, 'votre_user_id')
          .then((result) => {
            console.log('Email envoyé:', result.text);
          }, (error) => {
            console.error('Erreur lors de l\'envoi de l\'email:', error.text);
          });

      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
      alert('Une erreur est survenue lors de l\'enregistrement de vos informations.');
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">{formData.title}</h1>
        <div className="mb-6">
          <label htmlFor="userEmail" className="block font-bold mb-2">Email:</label>
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-inner"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="userName" className="block font-bold mb-2">Nom:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-inner"
            required
          />
        </div>
        {formData.inputs.map((input, index) => (
          <div key={index} className="mb-6">
            <label className="block font-bold mb-2">{input.label}</label>
            {input.type === 'textarea' ? (
              <textarea 
                className="w-full p-3 border rounded-lg shadow-inner" 
                value={input.value} 
                onChange={(e) => input.value = e.target.value} 
              />
            ) : input.type === 'radio' ? (
              input.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center mb-2">
                  <input 
                    type="radio" 
                    name={`radio-${index}`} 
                    value={option} 
                    checked={input.value === option} 
                    onChange={(e) => input.value = e.target.value} 
                    className="mr-2"
                  />
                  <label>{option}</label>
                </div>
              ))
            ) : input.type === 'checkbox' ? (
              input.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center mb-2">
                  <input 
                    type="checkbox" 
                    value={option} 
                    checked={input.value.includes(option)} 
                    onChange={(e) => {
                      if (e.target.checked) {
                        input.value.push(e.target.value);
                      } else {
                        input.value = input.value.filter(val => val !== e.target.value);
                      }
                    }} 
                    className="mr-2"
                  />
                  <label>{option}</label>
                </div>
              ))
            ) : (
              <input 
                type={input.type} 
                value={input.value} 
                onChange={(e) => input.value = e.target.value} 
                className="w-full p-3 border rounded-lg shadow-inner" 
              />
            )}
          </div>
        ))}
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormById;
