import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { deleteProduct, updateProduct, addProduct } from '../utils/api';
import { toast } from 'react-toastify';
import { object, string, number } from 'yup';

const ProductTab = ({ products, setProducts, categories }) => {
    const [openProductForm, setOpenProductForm] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editingProduct, setEditingProduct] = useState({ name: '', price: '', categoryId: '' });

    const productSchema = object({
        name: string().required('Product name is required'),
        price: number().positive('Price must be positive').required('Price is required'),
        categoryId: string().required('Category is required')
    });

    const validateProduct = async (product) => {
        try {
            await productSchema.validate(product);
            return { valid: true };
        } catch (error) {
            return { valid: false, error: error.message };
        }
    };

    const handleAddProduct = async (newProduct) => {
        const validation = await validateProduct({
            name: newProduct.name,
            price: Number(newProduct.price),
            categoryId: newProduct.categoryId
        });

        if (!validation.valid) {
            toast.error(validation.error);
            return;
        }

        try {
            const savedProduct = await addProduct(newProduct);
            setProducts(prevProducts => [savedProduct, ...prevProducts]);
            setOpenProductForm(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateProduct = async (id, updatedProduct) => {
        const validation = await validateProduct({
            name: updatedProduct.name,
            price: Number(updatedProduct.price),
            categoryId: updatedProduct.categoryId
        });

        if (!validation.valid) {
            toast.error(validation.error);
            return;
        }

        const rollback = [...products];

        try {
            setProducts(products.map(product =>
                product.id === id ? { ...product, ...updatedProduct } : product
            ));

            await updateProduct(id, updatedProduct);
            setEditingProductId(null);
        } catch (error) {
            setProducts(rollback);
            console.log(error);
        }
    };

    const handleDeleteProduct = async (id) => {
        const rollback = [...products];

        try {
            setProducts(products.filter(product => product.id !== id));
            await deleteProduct(id);
        } catch (error) {
            setProducts(rollback);
            console.log(error);        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct({
            id: product.id,
            name: product.name,
            price: product.price,
            categoryId: product.categoryId
        });
        setEditingProductId(product.id);
    };

    const handleCancelEdit = () => {
        setEditingProductId(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Products</h2>
                <button
                    onClick={() => setOpenProductForm(!openProductForm)}
                    className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <PlusCircle className="h-5 w-5" />
                    <span>Add Product</span>
                </button>
            </div>

            {openProductForm && (
                <ProductForm
                    onSubmit={handleAddProduct}
                    onCancel={() => setOpenProductForm(false)}
                    categories={categories}
                />
            )}

            <ProductList
                products={products}
                categories={categories}
                editingProductId={editingProductId}
                editingProduct={editingProduct}
                setEditingProduct={setEditingProduct}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onSave={handleUpdateProduct}
                onCancel={handleCancelEdit}
            />
        </div>
    );
};

export default ProductTab;