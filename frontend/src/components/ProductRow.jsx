import React from 'react';
import { Edit, Save, Trash2, X } from 'lucide-react';

const ProductRow = ({ 
    product, 
    categories, 
    isEditing, 
    editingProduct, 
    setEditingProduct, 
    onEdit, 
    onDelete, 
    onSave, 
    onCancel 
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct(prev => ({ ...prev, [name]: value }));
    };

    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                {isEditing ? (
                    <input
                        type="text"
                        name="name"
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        value={editingProduct.name}
                        onChange={handleChange}
                    />
                ) : (
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                {isEditing ? (
                    <select
                        name="categoryId"
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        value={editingProduct.categoryId}
                        onChange={handleChange}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <div className="text-sm text-gray-500">
                        {categories.find((c) => c.id == product.categoryId)?.name || 'Unknown'}
                    </div>
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                {isEditing ? (
                    <input
                        type="number"
                        name="price"
                        step="0.01"
                        className="w-20 px-2 py-1 border border-gray-300 rounded"
                        value={editingProduct.price}
                        onChange={handleChange}
                    />
                ) : (
                    <div className="text-sm text-gray-900">${product.price}</div>
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {isEditing ? (
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={onSave}
                            className="text-green-600 hover:text-green-800"
                        >
                            <Save className="h-5 w-5" />
                        </button>
                        <button
                            onClick={onCancel}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={onEdit}
                            className="text-indigo-600 hover:text-indigo-800"
                        >
                            <Edit className="h-5 w-5" />
                        </button>
                        <button
                            onClick={onDelete}
                            className="text-red-600 hover:text-red-800"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default ProductRow;