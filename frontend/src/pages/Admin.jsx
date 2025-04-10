import React, { useEffect, useState } from 'react';
import TabSelector from '../components/TabSelector';
import SearchBar from '../components/SearchBar';
import ProductTab from '../components/ProductTab';
import CategoryTab from '../components/CategoryForm';

const AdminPage = ({ products, setProducts, categories, setCategories }) => {
    const [activeTab, setActiveTab] = useState('products');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (activeTab === 'products') {
            const filtered = products.filter(product => {
                return product.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setFilteredProducts(filtered);
        }
    }, [searchTerm, products, activeTab]);

    useEffect(() => {
        if (activeTab === 'categories') {
            const filtered = categories.filter(category => {
                return category.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setFilteredCategories(filtered);
        }
    }, [searchTerm, categories, activeTab]);

    return (
        <div className="max-w-7xl w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 mb-10 text-white">
                <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-lg opacity-90">Manage your products and categories</p>
            </div>

            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <TabSelector
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>

                {activeTab === 'products' && (
                    <ProductTab
                        products={filteredProducts}
                        setProducts={setProducts}
                        categories={categories}
                    />
                )}

                {activeTab === 'categories' && (
                    <CategoryTab
                        categories={filteredCategories}
                        setCategories={setCategories}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminPage;