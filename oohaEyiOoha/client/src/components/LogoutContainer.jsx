import React, { useState } from 'react';
import { FaUser, FaCaretDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../../../utils/customFetch';

const LogoutContainer = () => {
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();

    const logoutUser = async () => {
        try {
            await customFetch.get('/auth/logout');
            toast.success('Logout Successful');
            navigate('/'); // Redirect after logout
        } catch (error) {
            toast.error('Error logging out');
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="relative inline-block text-left" style={{ zIndex: '100' }}>
            <div>
                <button
                    type="button"
                    className="flex items-center space-x-2 p-2 bg-orange-800 text-white rounded-lg focus:outline-none hover:bg-white hover:text-orange-950"
                    onClick={() => setShowLogout(!showLogout)}
                >
                    <FaUser className="text-xl" />
                    <FaCaretDown className={`text-md transition-transform duration-200 ${showLogout ? 'rotate-180' : ''}`} />
                </button>
            </div>
            <div
                className={`origin-top-right absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-opacity duration-200 ${showLogout ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                style={{ zIndex: 10 }}
            >
                <button
                    type="button"
                    className="w-full text-left px-4 py-2 text-gray-700 hover:rounded-lg flex justify-center hover:bg-orange-950 hover:text-white hover:font-bold focus:outline-none"
                    onClick={() => { /* handle profile logic here */ }}
                >
                    Profile
                </button>
                <div className="border border-gray-300"></div>
                <button
                    type="button"
                    className="w-full text-left px-4 py-2 text-gray-700 flex justify-center hover:rounded-lg hover:bg-orange-950 hover:text-white hover:font-bold focus:outline-none"
                    onClick={logoutUser}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default LogoutContainer;
