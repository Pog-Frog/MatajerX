import React from 'react';

const TabSelector = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex gap-2">
            <button
                onClick={() => setActiveTab('products')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'products'
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
            >
                Products
            </button>
            <button
                onClick={() => setActiveTab('categories')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'categories'
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
            >
                Categories
            </button>
        </div>
    );
};

export default TabSelector;