import axios from 'axios';
import { toast } from "react-toastify";

const API_URL = 'http://localhost:3000';

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/menu?delay=3000`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/categories?delay=3000`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const addProduct = async (product) => {
    try {
        const response = await axios.post(`${API_URL}/menu?delay=3000`, product);
        toast.success("Product added successfully");
        return response.data;
    } catch (error) {
        toast.error("Error adding product");
        console.log(error);
        throw error;
    }
};

export const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`${API_URL}/menu/${id}?delay=3000`, product);
        toast.success("Product updated successfully");
        return response.data;
    } catch (error) {
        toast.error("Error updating product");
        console.log(error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_URL}/menu/${id}?delay=3000`);
        toast.success("Product deleted successfully");
        return true;
    } catch (error) {
        toast.error("Error deleting product");
        console.log(error);
        throw error;
    }
};

export const addCategory = async (category) => {
    try {
        const response = await axios.post(`${API_URL}/categories?delay=3000`, category);
        toast.success("Category added successfully");
        return response.data;
    } catch (error) {
        toast.error("Error adding category");
        console.log(error);
        throw error;
    }
};

export const updateCategory = async (id, category) => {
    try {
        const response = await axios.put(`${API_URL}/categories/${id}?delay=3000`, category);
        toast.success("Category updated successfully");
        return response.data;
    } catch (error) {
        toast.error("Error updating category");
        console.log(error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        await axios.delete(`${API_URL}/categories/${id}?delay=3000`);
        toast.success("Category deleted successfully");
        return true;
    } catch (error) {
        toast.error("Error deleting category");
        console.log(error);
        throw error;
    }
};