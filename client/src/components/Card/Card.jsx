import React, { useEffect, useState } from "react";
import "./Card.scss";
import {Link} from "react-router-dom"
import { GET_ALL_PRODUCTS } from "../../utils/queries";

const Card= () => {
  const [products, setProducts] = useState([]);
      useEffect(() => {
          const fetchProducts = async () => {
              try {
                  const fetchedProducts = await GET_ALL_PRODUCTS();
                  setProducts(fetchedProducts);
              } catch (error) {
                  console.error("Error fetching products:", error);
              }
          };

          fetchProducts();
      }, []);
    return (
      <div>
        {products && products.map(product => (
          <Link key={product.id} className="link" to={`/product/${product.id}`}>  
            
          <div className="card">
              <div className="image">
                  {/* {item.isNew && <span>New Season</span>} */}
                  <img src={product.imageUrl} alt="" className="mainImg" />
              </div>

              <h2>{product.name}</h2>

              <div className="prices">
                  {/* <h3>{item.oldPrice}</h3> */}
                  <h3>{product.price}</h3>

              </div>
          </div>
          </Link>
          ))}
      </div>
    )
};

export default Card;
