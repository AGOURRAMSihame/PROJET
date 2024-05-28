import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Form = () => {
    const [formInputs, setFormInputs] = useState([]);
    const [formTitle, setFormTitle] = useState('');
    const navigate = useNavigate();

    const handleInputAdd = (type, label, options) => {
        setFormInputs([...formInputs, { type, label, options }]);
    };

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:3000/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: formTitle, inputs: formInputs }),
            });

            if (!response.ok) {
                throw new Error('Une erreur est survenue lors de l\'enregistrement du formulaire.');
            }

            const formData = await response.json();
            alert('Formulaire enregistré avec succès !');
            navigate(`/viewform/${formData._id}`);
        } catch (error) {
            console.error(error);
            alert('Une erreur est survenue lors de l\'enregistrement du formulaire.');
        }
    };

    const handleTitleChange = (title) => {
        setFormTitle(title);
    };

    return (
        <div className="flex">
            <Sidebar onInputAdd={handleInputAdd} onSave={handleSave} onTitleChange={handleTitleChange} />
            <div className="p-4 w-1/2">
                <h2 className="text-lg font-semibold mb-4">{formTitle}</h2>

                {formInputs.map((input, index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{input.label}</label>
                        {input.type === 'checkbox' ? (
                            input.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="mb-2">
                                    <input type="checkbox" id={`checkbox-${index}-${optionIndex}`} className="mr-2" />
                                    <label htmlFor={`checkbox-${index}-${optionIndex}`}>{option}</label>
                                </div>
                            ))
                        ) : input.type === 'radio' ? (
                            input.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="mb-2">
                                    <input type="radio" id={`radio-${index}-${optionIndex}`} name={`radio-${index}`} className="mr-2" />
                                    <label htmlFor={`radio-${index}-${optionIndex}`}>{option}</label>
                                </div>
                            ))
                        ) : (
                            <input
                                type={input.type}
                                placeholder={`Enter ${input.label}`}
                                className="block w-full p-2 bg-gray-100 border border-gray-300 rounded"
                            />
                        )}
                    </div>
                ))}
                <button onClick={handleSave} className="bg-purple-600 text-white py-2 px-4 rounded font-bold hover:bg-purple-700 transition duration-200">Envoyer</button>
            </div>
        </div>
    );
};

export default Form;
