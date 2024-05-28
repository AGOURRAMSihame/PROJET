import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UpdateForm() {
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

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedInputs = [...formData.inputs];
    updatedInputs[index][name] = value;
    setFormData({ ...formData, inputs: updatedInputs });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/forms/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update form');
      }

      alert('Form updated successfully');
    } catch (error) {
      console.error('Error updating form:', error);
      alert('An error occurred while updating the form');
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Update Form</h1>
        <div>
          <label className="block font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="border rounded-md w-full px-3 py-2 mb-4"
          />
        </div>
        <form className="space-y-4">
          {formData.inputs.map((input, index) => (
            <div key={index}>
              <label className="block font-medium text-gray-700 mb-2">Label</label>
              <input
                type="text"
                name="label"
                value={input.label}
                onChange={(e) => handleInputChange(e, index)}
                className="border rounded-md w-full px-3 py-2 mb-2"
              />
              <label className="block font-medium text-gray-700 mb-2">Type</label>
              <select
                name="type"
                value={input.type}
                onChange={(e) => handleInputChange(e, index)}
                className="border rounded-md w-full px-3 py-2 mb-2"
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio</option>
                <option value="file">File</option>
              </select>
              {(input.type === 'checkbox' || input.type === 'radio') && (
                <div>
                  <label className="block font-medium text-gray-700 mb-2">Options</label>
                  {input.options.map((option, optionIndex) => (
                    <input
                      key={optionIndex}
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const updatedOptions = [...input.options];
                        updatedOptions[optionIndex] = e.target.value;
                        const updatedInputs = [...formData.inputs];
                        updatedInputs[index].options = updatedOptions;
                        setFormData({ ...formData, inputs: updatedInputs });
                      }}
                      className="border rounded-md w-full px-3 py-2 mb-2"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const updatedOptions = [...input.options, ''];
                      const updatedInputs = [...formData.inputs];
                      updatedInputs[index].options = updatedOptions;
                      setFormData({ ...formData, inputs: updatedInputs });
                    }}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 font-bold"
                  >
                    Add Option
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 font-bold"
          >
            Save Updates
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateForm;
