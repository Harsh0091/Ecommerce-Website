import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css'; // Ensure this path is correct

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: '',
        imageUrl: null
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [currentSection, setCurrentSection] = useState('products');

    useEffect(() => {
        if (currentSection === 'products') {
            fetchProducts();
        } else if (currentSection === 'orders') {
            fetchOrders();
        } else if (currentSection === 'users') {
            fetchUsers();
        }
    }, [currentSection]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            console.log('Users fetched:', response.data); // Add this line
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    

    const handleProductAdd = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (newProduct.imageUrl) {
            formData.append('imageUrl', newProduct.imageUrl);
        }
        formData.append('name', newProduct.name);
        formData.append('price', newProduct.price);
        formData.append('description', newProduct.description);
        formData.append('category', newProduct.category);
        formData.append('stock', newProduct.stock);

        try {
            const response = await axios.post('http://localhost:5000/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setProducts([...products, response.data]);
            resetProductForm();
        } catch (error) {
            console.error("Error adding product:", error.response ? error.response.data : error.message);
        }
    };

    const handleProductEdit = (product) => {
        setEditingProduct(product);
        setNewProduct({
            ...product,
            imageUrl: null
        });
    };

    const handleProductUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (newProduct.imageUrl) {
            formData.append('imageUrl', newProduct.imageUrl);
        }
        formData.append('name', newProduct.name);
        formData.append('price', newProduct.price);
        formData.append('description', newProduct.description);
        formData.append('category', newProduct.category);
        formData.append('stock', newProduct.stock);

        try {
            const response = await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setProducts(products.map(product => (product._id === editingProduct._id ? response.data : product)));
            resetProductForm();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleProductDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${productId}`);
            setProducts(products.filter((product) => product._id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const resetProductForm = () => {
        setNewProduct({
            name: '',
            price: '',
            description: '',
            category: '',
            stock: '',
            imageUrl: null
        });
        setEditingProduct(null);
    };

    const handleOrderUpdate = async (orderId, status) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${orderId}`, { orderStatus: status });
            setOrders(
                orders.map((order) =>
                    order._id === orderId ? { ...order, orderStatus: status } : order
                )
            );
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    const handleUserDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${userId}`);
            setUsers(users.filter((user) => user._id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="admin-panel">
            <div className="sidebar">
                <h2>Admin Panel</h2>
                <ul>
                    <li onClick={() => setCurrentSection('products')}>Products</li>
                    <li onClick={() => setCurrentSection('orders')}>Orders</li>
                    <li onClick={() => setCurrentSection('users')}>Users</li>
                </ul>
            </div>
            <div className="content">
                {currentSection === 'products' && (
                    <div className="product-management">
                        <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                        <form onSubmit={editingProduct ? handleProductUpdate : handleProductAdd} className="product-form">
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Product Price"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Product Description"
                                value={newProduct.description}
                                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Product Category"
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Stock Quantity"
                                value={newProduct.stock}
                                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                required
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.files[0] })}
                            />
                            <button type="submit" className="submit-button">{editingProduct ? 'Update Product' : 'Add Product'}</button>
                            <button type="button" onClick={resetProductForm} className="cancel-button">Cancel</button>
                        </form>

                        <h2>Products</h2>
                        <div className="product-list">
                            {products.map((product) => (
                                <div className="product-item" key={product._id}>
                                    <img src={product.imageUrl} alt={product.name} />
                                    <h3>{product.name}</h3>
                                    <p>Description: {product.description}</p>
                                    <p>Price: ${product.price.toFixed(2)}</p>
                                    <p>Category: {product.category}</p>
                                    <p>Stock: {product.stock}</p>
                                    <div>
                                        <button className="edit-button" onClick={() => handleProductEdit(product)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleProductDelete(product._id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {currentSection === 'orders' && (
                    <div className="order-management">
                        <h2>Orders</h2>
                        {orders.map((order) => (
                            <div className="order-item" key={order._id}>
                                Order ID: {order._id} - Total: ${order.totalPrice} - Status: {order.orderStatus}
                                <button className="order-btn" onClick={() => handleOrderUpdate(order._id, 'Shipped')}>
                                    Mark as Shipped
                                </button>
                                <button className="order-btn" onClick={() => handleOrderUpdate(order._id, 'Cancelled')}>
                                    Mark as Cancelled
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {currentSection === 'users' && (
                    <div className="user-management">
                        <h2>Users</h2>
                        <div className="user-list">
                            {users.map((user) => (
                                <div className="user-item" key={user._id}>
                                    <p>Username: {user.username}</p>
                                    <p>Email: {user.email}</p>
                                    <button className="delete-button" onClick={() => handleUserDelete(user._id)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
