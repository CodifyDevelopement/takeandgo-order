import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { gsap } from 'gsap';
import './styles.css'; // Import the CSS

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticated = localStorage.getItem('adminAuthenticated');
    if (authenticated !== 'true') {
      navigate('/admin-login');
    } else {
      fetchOrders();
    }
  }, [navigate]);


  const fetchOrders = async () => {
    try {
      const result = await axios.get('https://api-takeandgo.vercel.app/api/orders');
      setOrders(result.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(`https://api-takeandgo.vercel.app/api/orders/${id}`, { status });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`https://api-takeandgo.vercel.app/api/orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="admin-page">
      <img src="https://i.postimg.cc/d0qj12cC/logotranswhite-1.png" alt="Take and Go Logo" className="logo" />
      <h1>Admin Panel</h1>
      <h2>Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id} className="order-list-item">
            {order.coffeeType} - {order.clientName} - {order.status}
            <div>
              <button className="button" onClick={() => updateOrderStatus(order._id, 'Accepted')}>Accept</button>
              <button className="button delete-btn" onClick={() => deleteOrder(order._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
