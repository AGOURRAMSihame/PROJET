import React, { useState } from 'react';

const Sidebar = ({ onInputAdd, onSave, onTitleChange }) => {
    const [inputType, setInputType] = useState('');
    const [inputLabel, setInputLabel] = useState('');
    const [inputOptions, setInputOptions] = useState('');
    const [options, setOptions] = useState([]);
    const [title, setTitle] = useState('');

    const handleInputTypeChange = (e) => {
        setInputType(e.target.value);
    };

    const handleLabelChange = (e) => {
        setInputLabel(e.target.value);
    };

    const handleOptionsChange = (e) => {
        setInputOptions(e.target.value);
    };

    const handleAddClick = () => {
        if (inputType && inputLabel) {
            onInputAdd(inputType, inputLabel, options);
            setInputType('');
            setInputLabel('');
            setInputOptions('');
            setOptions([]);
        }
    };

    const handleSaveClick = () => {
        onSave();
    };

    const handleAddOption = () => {
        if (inputOptions.trim() !== '') {
            setOptions([...options, inputOptions]);
            setInputOptions('');
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        onTitleChange(e.target.value);
    };

    return (
        <div className="sidebar bg-white p-6 h-screen w-1/4 flex flex-col shadow-xl mt-8 mb-8 ml-4 border border-gray-300 rounded-lg">
            <div className="mb-6">
                <label htmlFor="formTitle" className="block text-sm font-bold mb-2">Form Title</label>
                <input 
                    type="text" 
                    id="formTitle" 
                    value={title} 
                    onChange={handleTitleChange} 
                    placeholder="Enter Form Title" 
                    className="block w-full p-3 bg-white border border-gray-300 rounded shadow-lg font-bold"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="inputType" className="block text-sm font-bold mb-2">Input Type</label>
                <select 
                    id="inputType" 
                    value={inputType} 
                    onChange={handleInputTypeChange} 
                    className="block w-full p-3 bg-white border border-gray-300 rounded shadow-lg font-bold"
                >
                    <option value="">Select an input type</option>
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                    <option value="file">File</option>
                </select>
            </div>
            <div className="mb-6">
                <label htmlFor="inputLabel" className="block text-sm font-bold mb-2">Label</label>
                <input 
                    type="text" 
                    id="inputLabel" 
                    value={inputLabel} 
                    onChange={handleLabelChange} 
                    placeholder="Enter Label" 
                    className="block w-full p-3 bg-white border border-gray-300 rounded shadow-lg font-bold"
                />
            </div>
            {(inputType === 'checkbox' || inputType === 'radio') && (
                <div className="mb-6">
                    <label htmlFor="inputOptions" className="block text-sm font-bold mb-2">{inputType === 'checkbox' ? 'Checkbox Options' : 'Radio Options'}</label>
                    <input 
                        type="text" 
                        id="inputOptions" 
                        value={inputOptions} 
                        onChange={handleOptionsChange} 
                        placeholder="Enter Options" 
                        className="block w-full p-3 bg-white border border-gray-300 rounded shadow-lg font-bold"
                    />
                    <button 
                        onClick={handleAddOption} 
                        className="py-2 px-4 bg-purple-600 text-white rounded mt-2 shadow-lg font-bold"
                    >
                        Add Option
                    </button>
                    {options.map((option, index) => (
                        <div key={index} className="mt-2">
                            <span className="font-bold">{option}</span>
                        </div>
                    ))}
                </div>
            )}
            <button 
                onClick={handleAddClick} 
                className="py-2 px-4 bg-purple-600 text-white rounded mb-6 shadow-lg font-bold"
            >
                Add Input
            </button>
            <button 
                onClick={handleSaveClick} 
                className="py-2 px-4 bg-purple-600 text-white rounded shadow-lg font-bold"
            >
                Save Form
            </button>
        </div>
    );
};

export default Sidebar;
