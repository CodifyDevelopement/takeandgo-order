import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import './styles.css'; // Import the CSS

const coffeeOptions = [
  { name: 'Americano', imgSrc: 'https://i.postimg.cc/MGzBWzJK/pngtree-cup-of-coffee-cream-picture-image-13106639.png' },
  { name: 'Café Crème', imgSrc: 'https://i.postimg.cc/MGzBWzJK/pngtree-cup-of-coffee-cream-picture-image-13106639.png' },
  { name: 'Cappuccino', imgSrc: 'https://i.postimg.cc/MGzBWzJK/pngtree-cup-of-coffee-cream-picture-image-13106639.png' },
  { name: 'Lait', imgSrc: 'https://i.postimg.cc/MGzBWzJK/pngtree-cup-of-coffee-cream-picture-image-13106639.png' }
];

const Order = () => {
  const [coffeeType, setCoffeeType] = useState('');
  const [clientName, setClientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    gsap.from('.coffee-card', { opacity: 100, scale: 0.8, duration: 1, stagger: 0.2 });
  }, []);

  const placeOrder = async () => {
    if (!coffeeType || !clientName || !phoneNumber) {
      setAlertMessage('Please select a coffee type, enter your name, and provide your phone number.');
      return;
    }
    try {
      await axios.post('https://api-takeandgo.vercel.app/api/order', { coffeeType, clientName, phoneNumber });
      setCoffeeType('');
      setClientName('');
      setPhoneNumber('');
      setAlertMessage('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      setAlertMessage('Failed to place order.');
    }
  };

  return (
    <div className="order-page">
      <img src="https://i.postimg.cc/d0qj12cC/logotranswhite-1.png" alt="Take and Go Logo" className="logo" />
      <h1>Order Coffee</h1>
      <div className="coffee-cards">
        {coffeeOptions.map(option => (
          <div
            key={option.name}
            className={`coffee-card ${coffeeType === option.name ? 'selected' : ''}`}
            onClick={() => setCoffeeType(option.name)}
          >
            <img src={option.imgSrc} alt={option.name} />
            <h2>{option.name}</h2>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        placeholder="Client Name"
      />
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
      />
      <button className="button" onClick={placeOrder}>Place Order</button>
      {alertMessage && <div className="alert">{alertMessage}</div>}
    </div>
  );
};

export default Order;
