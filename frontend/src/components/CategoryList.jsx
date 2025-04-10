import React from 'react';
import CategoryRow from './CategoryRow';

const CategoryList = ({ 
    categories, 
    editingCategoryId, 
    editingCategory, 
    setEditingCategory, 
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
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <CategoryRow 
                                    key={category.id}
                                    category={category}
                                    isEditing={editingCategoryId === category.id}
                                    editingCategory={editingCategory}
                                    setEditingCategory={setEditingCategory}
                                    onEdit={() => onEdit(category)}
                                    onDelete={() => onDelete(category.id)}
                                    onSave={() => onSave(category.id, editingCategory)}
                                    onCancel={onCancel}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryList;