import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const GRAPHQL_ENDPOINT = "http://localhost:3001/graphql";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      const query = `
        query {
          cart {
            product {
              id
              name
              description
              price
              imageUrl
            }
            quantity
          }
        }
      `;
      try {
        const response = await axios.post(GRAPHQL_ENDPOINT, { query });
        setCartItems(response.data.data.cart);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    const query = `
      mutation RemoveFromCart($productId: ID!) {
        removeFromCart(productId: $productId) {
          product {
            id
          }
        }
      }
    `;
    try {
      await axios.post(GRAPHQL_ENDPOINT, {
        query,
        variables: { productId }
      });
      setCartItems(cartItems.filter(item => item.product.id !== productId));
    } catch (err) {
      console.error("Failed to remove item from cart:", err);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='cart'>
      <h1>Products in your cart</h1>
      {cartItems.map(item => (
        <div className="item" key={item.id}>
          <img src={item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.desc?.substring(0, 100)}</p>
            <div className="price">{item.quantity} x ${item.price}</div>
          </div>
          <DeleteOutlinedIcon className="delete" onClick={() => handleRemoveFromCart(item.id)} />
        </div>
      ))}
      <div className="total">
        <span>Subtotal</span>
        <span>${subtotal}</span>
      </div>
      <button>Proceed to Checkout</button>
      <span className="reset">Reset Cart</span>
    </div>
  );
};

export default Cart;
