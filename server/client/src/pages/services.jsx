import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
 
 const handleSignInClick = () => {
    console.log('Bouton Sign In cliqué');
    
 };


 const handleSignUpClick = () => {
    console.log('Bouton Sign Up cliqué');
    
 };

 return (
    <div className="bg-white shadow-md p-2">
     
      {/* Main Content */}
      <div className="container mx-auto py-10">
        <h1 className="text-4xl text-center font-bold text-gray-800 mb-10">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/400" alt="Service 1" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-3">Service 1</h2>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec arcu a nibh convallis pulvinar.</p>
            </div>
          </div>
          {/* Service 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/400" alt="Service 2" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-3">Service 2</h2>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec arcu a nibh convallis pulvinar.</p>
            </div>
          </div>
          {/* Service 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/400" alt="Service 3" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-3">Service 3</h2>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec arcu a nibh convallis pulvinar.</p>
            </div>
          </div>
          {/* Service 4 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/400" alt="Service 4" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-3">Service 4</h2>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec arcu a nibh convallis pulvinar.</p>
            </div>
          </div>
          {/* Service 5 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/400" alt="Service 5" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-3">Service 5</h2>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec arcu a nibh convallis pulvinar.</p>
            </div>
          </div>
          {/* Service 6 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/400" alt="Service 6" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-3">Service 6</h2>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec arcu a nibh convallis pulvinar.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
 );
};

export default Services;
