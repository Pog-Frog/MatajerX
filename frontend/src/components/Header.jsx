import { useState } from 'react';
import { Menu, X, ShoppingCart, ShieldUser } from 'lucide-react';
import { NavLink } from "react-router";

const Header = ({ totalItems }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                        <a href="#" className="flex-shrink-0 flex items-center">
                            <div className="flex items-center">
                                <div className="h-8 w-8 bg-indigo-600 rounded-md flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">X</span>
                                </div>
                                <span className="ml-2 text-xl font-bold text-gray-900">MatajerX</span>
                            </div>
                        </a>
                    </div>

                    <ul className={`hidden md:flex space-x-8`}>
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}>
                                Shop
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart" className={({ isActive }) => isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}>
                                Cart
                            </NavLink>
                        </li>
                    </ul>

                    <div className="flex items-center space-x-4">
                        <NavLink to="/cart" className="text-gray-400 hover:text-gray-500 relative">
                            <ShoppingCart className="h-6 w-6" />
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white">{totalItems}</span>
                        </NavLink>
                        <div className="relative">
                            <NavLink to="/admin">
                                <ShieldUser
                                    className="h-7 w-7 text-gray-400 hover:text-gray-500 cursor-pointer"
                                    onMouseEnter={() => setShowTooltip(true)}
                                    onMouseLeave={() => setShowTooltip(false)}
                                />
                            </NavLink>

                            {showTooltip && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white text-sm rounded-md shadow-lg p-3 z-50">
                                    <div className="absolute -top-2 right-2 w-4 h-4 bg-gray-800 transform rotate-45"></div>
                                    <p>Admin dashboard access</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg border-t">
                    <NavLink to="/" className="text-gray-900 hover:text-indigo-600 block px-3 py-2 text-base font-medium">
                        Shop
                    </NavLink>
                    <NavLink to="/cart" className="text-gray-900 hover:text-indigo-600 block px-3 py-2 text-base font-medium">
                        Cart
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;