import React, { useEffect, useState } from 'react'
import { ShoppingCart, Search, HelpCircle } from 'lucide-react';
import ReactPaginate from 'react-paginate';

export default function Home({ products, categories, addProductToCart, isInCart }) {
    const [showedProducts, setShowedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showTooltip, setShowTooltip] = useState(false);

    const itemsPerPage = 10;

    useEffect(() => {
        let filtered = products;
        if (activeCategory) {
            filtered = filtered.filter(item => item.categoryId == activeCategory);
        }
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(filtered);

        const newPageCount = Math.ceil(filtered.length / itemsPerPage);
        setPageCount(newPageCount);

        if (itemOffset >= filtered.length && filtered.length > 0) {
            setItemOffset(0);
        }

        const endOffset = Math.min(itemOffset + itemsPerPage, filtered.length);
        setShowedProducts(filtered.slice(itemOffset, endOffset));

    }, [products, activeCategory, searchTerm, itemOffset]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % Math.max(filteredProducts.length, 1);
        setItemOffset(newOffset);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-10 text-white">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-bold mb-4">Discover Amazing Products</h1>
                    <p className="text-lg opacity-90 mb-6">Shop the latest trends and innovations with free shipping.</p>
                    <button className="relative inline-block">
                        <span className="relative z-10 text-3xl font-bold text-center tracking-wider uppercase text-neutral-50">
                            Shop Now
                        </span>
                        <span className="absolute bottom-1 left-0 w-full h-2 bg-pink-500"></span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!activeCategory
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                    >
                        All Products
                    </button>
                    {categories && categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors hover:cursor-pointer ${activeCategory === category.id
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-64">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />

                        <div className="absolute right-3 top-2.5">
                            <div
                                className="relative"
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >
                                <HelpCircle className="h-5 w-5 text-gray-400 cursor-help" />

                                {showTooltip && (
                                    <div className="absolute right-0 mt-2 w-64 bg-gray-800 text-white text-sm rounded-md shadow-lg p-3 z-50">
                                        <div className="absolute -top-2 right-2 w-4 h-4 bg-gray-800 transform rotate-45"></div>
                                        <p>Search for products by name. Results will update as you type.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {showedProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
                        <div className="p-4">
                            <div className="mb-1 text-xs font-medium text-indigo-600">
                                {categories.find((category) => category.id == product.categoryId)?.name}
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-1">
                                {product.name}
                            </h3>

                            <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-bold text-gray-900">
                                    ${product.price}
                                </span>
                                {!isInCart(product) &&
                                    <button
                                        onClick={() => addProductToCart(product)}
                                        className="p-2 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors"
                                    >
                                        <ShoppingCart className="h-5 w-5 text-indigo-600" />
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {pageCount > 1 && (
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    containerClassName="hidden md:flex justify-center mt-8 space-x-1 select-none"
                    pageClassName="border rounded-md hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
                    pageLinkClassName="block px-3 py-1 w-full h-full"
                    previousClassName="border rounded-md hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
                    previousLinkClassName="block px-3 py-1 w-full h-full"
                    nextClassName="border rounded-md hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
                    nextLinkClassName="block px-3 py-1 w-full h-full"
                    activeClassName="bg-indigo-600 text-white"
                    disabledClassName="text-gray-300 border-gray-200 !cursor-not-allowed hover:!text-gray-300 hover:!border-gray-200 hover:!bg-white"
                    renderOnZeroPageCount={null}
                    forcePage={itemOffset / itemsPerPage}
                />
            )}
        </div>
    );
}