import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const firebaseConfig = {
    // Vos configurations Firebase

  
};

initializeApp(firebaseConfig);

const GoogleLoginButton = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const { setCurrentUser } = useAuth();

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();

            const response = await fetch('http://localhost:3000/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User authenticated with Google:', data);
                setCurrentUser(result.user);
                navigate('/');
            } else {
                const errorData = await response.json();
                console.error('Error with Google authentication:', errorData);
            }
        } catch (error) {
            console.error('Error with Google authentication:', error);
        }
    };

    return (
        <button onClick={handleGoogleLogin} className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full w-full mb-4">
            Sign in with Google
        </button>
    );
};

export default GoogleLoginButton;
