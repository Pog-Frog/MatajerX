import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { addCategory, updateCategory, deleteCategory } from '../utils/api';
import { toast } from 'react-toastify';
import { object, string } from 'yup';


const CategoryTab = ({ categories, setCategories }) => {
    const [openCategoryForm, setOpenCategoryForm] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingCategory, setEditingCategory] = useState({ name: '' });

    const categorySchema = object({
        name: string().required('Category name is required')
    });

    const validateCategory = async (category) => {
        try {
            await categorySchema.validate(category);
            return { valid: true };
        } catch (error) {
            return { valid: false, error: error.message };
        }
    };

    const handleAddCategory = async (newCategory) => {
        const validation = await validateCategory(newCategory);

        if (!validation.valid) {
            toast.error(validation.error);
            return;
        }

        try {
            const savedCategory = await addCategory(newCategory);
            setCategories(prevCategories => [savedCategory, ...prevCategories]);
            setOpenCategoryForm(false);
        } catch (error) {
            console.log(error);            
        }
    };

    const handleUpdateCategory = async (id, updatedCategory) => {
        const validation = await validateCategory(updatedCategory);

        if (!validation.valid) {
            toast.error(validation.error);
            return;
        }

        const rollback = [...categories];

        try {
            setCategories(categories.map(category =>
                category.id === id ? { ...category, ...updatedCategory } : category
            ));

            await updateCategory(id, updatedCategory);
            setEditingCategoryId(null);
        } catch (error) {
            setCategories(rollback);
            console.log(error);
        }
    };

    const handleDeleteCategory = async (id) => {
        const rollback = [...categories];

        try {
            setCategories(categories.filter(category => category.id !== id));
            await deleteCategory(id);
        } catch (error) {
            setCategories(rollback);
            console.log(error);
        }
    };

    const handleEditCategory = (category) => {
        setEditingCategory({
            id: category.id,
            name: category.name
        });
        setEditingCategoryId(category.id);
    };

    const handleCancelEdit = () => {
        setEditingCategoryId(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Categories</h2>
                <button
                    onClick={() => setOpenCategoryForm(!openCategoryForm)}
                    className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <PlusCircle className="h-5 w-5" />
                    <span>Add Category</span>
                </button>
            </div>

            {openCategoryForm && (
                <CategoryForm
                    onSubmit={handleAddCategory}
                    onCancel={() => setOpenCategoryForm(false)}
                />
            )}

            <CategoryList
                categories={categories}
                editingCategoryId={editingCategoryId}
                editingCategory={editingCategory}
                setEditingCategory={setEditingCategory}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
                onSave={handleUpdateCategory}
                onCancel={handleCancelEdit}
            />
        </div>
    );
};

export default CategoryTab;