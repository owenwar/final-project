import "./List.scss"
import Card from '../Card/Card';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const List = ({ gender }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/${gender}`, { params: { gender } }) // Use gender prop in the API request
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [gender]); // Include gender in the dependency array

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className='list'>
      {products.map(item => (
        <Card item={item} key={item.id} />  // Render each product using the Card component
      ))}
    </div>
  );
}

export default List;