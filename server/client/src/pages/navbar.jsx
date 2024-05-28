import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div>
     
      <div className="bg-white shadow-md p-2">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="w-12 h-12">
              <a href="/">
                <img
                  className="w-full h-full"
                  src="https://th.bing.com/th/id/R.01eab780618cb688af2bfa044cf2af5a?rik=72bTO7biDcLEoA&pid=ImgRaw&r=0"
                  alt="Logo"
                />
              </a>
            </div>
            <div className="flex justify-center space-x-4">
              <Link
                to="/about"
                className="text-blue-500 hover:text-blue-600 transition-all font-medium"
              >
                A Propos
              </Link>
              <Link
                to="/services"
                className="text-blue-500 hover:text-blue-600 transition-all font-medium"
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="text-blue-500 hover:text-blue-600 transition-all font-medium"
              >
                Contact Us
              </Link>
            </div>
            <div className="flex items-center">
              {currentUser ? (
                <>
                  <Link
                    to="/list"
                    className="bg-purple-900 text-white hover:bg-purple-700 transition-all font-medium px-3 py-2 rounded-md mr-2"
                  >
                    formDashboard
                  </Link>
                  <Link
                    to="/reslist"
                    className="bg-green-500 text-white hover:bg-green-700 transition-all font-medium px-3 py-2 rounded-md"
                  >
                    Resp dashboar
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-blue-900 text-white hover:bg-blue-700 transition-all font-medium px-3 py-2 rounded-md ml-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-blue-900 text-white hover:bg-blue-700 transition-all font-medium px-3 py-2 rounded-md mr-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-purple-900 text-white hover:bg-purple-700 transition-all font-medium px-3 py-2 rounded-md mr-2"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
