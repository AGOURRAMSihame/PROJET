import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ViewForm() {
  const [formData, setFormData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/forms/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFormData(data);
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
      });
  }, [id]);

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 py-8">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">{formData.title}</h1>
        <div>
          {formData.inputs.map((input, index) => (
            <div key={index} className="mb-6">
              <label className="block font-bold mb-2">{input.label}</label>
              {input.type === 'textarea' ? (
                <textarea className="w-full p-3 border rounded-lg shadow-inner" />
              ) : input.type === 'radio' ? (
                input.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center mb-2">
                    <input type="radio" name={`radio-${index}`} id={`radio-${index}-${optionIndex}`} value={option} className="mr-2" />
                    <label htmlFor={`radio-${index}-${optionIndex}`}>{option}</label>
                  </div>
                ))
              ) : input.type === 'checkbox' ? (
                input.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center mb-2">
                    <input type="checkbox" id={`checkbox-${index}-${optionIndex}`} value={option} className="mr-2" />
                    <label htmlFor={`checkbox-${index}-${optionIndex}`}>{option}</label>
                  </div>
                ))
              ) : (
                <input className="w-full p-3 border rounded-lg shadow-inner" type={input.type} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewForm;
