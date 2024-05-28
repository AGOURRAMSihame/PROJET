import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../pages/google';
import Image from '../assets/img/register.jpg'; 
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert('Sending data');
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const data = await response.json();
        alert('User registered');
        navigate('/login');
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await response.json();
          alert('Error registering user: ' + JSON.stringify(errorData));
        } else {
          const errorText = await response.text();
          alert('Error registering user: ' + errorText);
        }
      }
    } catch (error) {
      alert('Error registering user: ' + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="mt-16 mb-8"> {/* Ajoutez de la marge en haut */}
        <form onSubmit={handleSubmit} className="w-96 border-2 border-gray-200 rounded-lg shadow-lg p-8 mr-8">
          <h1 className="text-4xl font-bold mb-6 text-center">Register</h1>
          <div className="mb-6">
            <label htmlFor="name" className="block font-bold mb-2">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="transition duration-300 ease-in-out border-2 border-gray-300 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-lg p-2 w-full" required />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block font-bold mb-2">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="transition duration-300 ease-in-out border-2 border-gray-300 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-lg p-2 w-full" required />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block font-bold mb-2">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="transition duration-300 ease-in-out border-2 border-gray-300 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-lg p-2 w-full" required />
          </div>
          <button type="submit" className="transition duration-300 ease-in-out bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full w-full mb-4">Register</button>
          <GoogleLoginButton /> 
        </form>
      </div>
      <img src={Image} alt="Logo" className="w-64 h-auto ml-8" />
    </div>
  );
};

export default Register;
