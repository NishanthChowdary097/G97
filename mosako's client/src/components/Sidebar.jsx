import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar, activeTab, setActiveTab }) => {
  return (
    <div className={`fixed inset-y-0 left-0 bg-gray-900 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:w-screen lg:w-80`}>
      <div className="flex items-center justify-between p-4">
        <button onClick={toggleSidebar} className="block">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <nav className="mt-4 flex space-x-2 px-4">
        <button 
          onClick={() => setActiveTab('favourites')} 
          className={`flex-1 text-center py-2 ${activeTab === 'favourites' ? 'bg-gray-700 rounded-md' : ''}`}
        >
          Favourites
        </button>
        <button 
          onClick={() => setActiveTab('ai')} 
          className={`flex-1 text-center py-2 ${activeTab === 'ai' ? 'bg-gray-700 rounded-md' : ''}`}
        >
          AI
        </button>
      </nav>
      <div className="p-16">
        {activeTab === 'favourites' ? (
          <div>Favourite Content</div>
        ) : (
          <div>AI Content</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
