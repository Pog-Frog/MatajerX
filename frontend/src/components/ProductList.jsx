import React from 'react';
import ProductRow from './ProductRow';

const ProductList = ({ 
    products, 
    categories, 
    editingProductId, 
    editingProduct, 
    setEditingProduct, 
    onEdit, 
    onDelete, 
    onSave, 
    onCancel 
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductRow 
                                    key={product.id}
                                    product={product}
                                    categories={categories}
                                    isEditing={editingProductId === product.id}
                                    editingProduct={editingProduct}
                                    setEditingProduct={setEditingProduct}
                                    onEdit={() => onEdit(product)}
                                    onDelete={() => onDelete(product.id)}
                                    onSave={() => onSave(product.id, editingProduct)}
                                    onCancel={onCancel}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;