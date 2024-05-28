import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/forms')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setForms(data);
      })
      .catch(error => {
        console.error('Error fetching forms:', error);
      });
  }, []);

  const handleDeleteForm = async (formId) => {
    try {
      const response = await fetch(`http://localhost:3000/forms/${formId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete form');
      }

      setForms(forms.filter(form => form._id !== formId));
      alert('Form deleted successfully');
    } catch (error) {
      console.error('Error deleting form:', error);
      alert('An error occurred while deleting the form');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Form Dashboard</h1>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">Title</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map(form => (
              <tr key={form._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{form.title}</td>
                <td className="border px-4 py-2 flex items-center space-x-4">
                  <Link to={`/update/${form._id}`} className="text-yellow-500 hover:text-yellow-600 transition duration-200">
                    <FontAwesomeIcon icon={faEdit} size="lg" />
                  </Link>
                  <Link to={`/view/${form._id}`} className="text-blue-500 hover:text-blue-600 transition duration-200">
                    <FontAwesomeIcon icon={faEye} size="lg" />
                  </Link>
                  <button onClick={() => handleDeleteForm(form._id)} className="text-red-500 hover:text-red-600 transition duration-200">
                    <FontAwesomeIcon icon={faTrash} size="lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
