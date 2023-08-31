import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Product.scss"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import { GET_PRODUCT_BY_ID } from "../../utils/queries";

const Product = () => {
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1)
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await GET_PRODUCT_BY_ID(id);
                setProduct(fetchedProduct);
                console.log(fetchedProduct)
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div className="product">
            <div className="left">
                <div className="images">
                    <img src={product.imageUrl} alt="" className="mainImg" />
                </div>
                <div className="mainImg">
                <img src={product.imageUrl} alt="" className="mainImg"/>
                </div>
            </div>

            <div className="right">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <h4>
                    price:
                    <span className="price">{ product.price }</span>
                </h4>
                <div className="quantity">
                    <button onClick={()=>setQuantity((prev) => (prev === 1 ? 1 : prev -1))}>-</button>
                    {quantity}
                    <button onClick={()=>setQuantity((prev)=>prev+1)}>+</button>
                </div>
                <button className="add">
                    <AddShoppingCartIcon/> Add To Cart
                </button>
                <div className="links">
                    <div className="item">
                        <FavoriteBorderIcon/> Add to wish list
                    </div>
                    <div className="item">
                        <BalanceIcon/> Add to compare
                    </div>
                </div>
                <div className="info">
                    <span>Vendor: Polo</span>
                    <span>Product Type: T-Shirt</span>
                    <span>Tag: T-Shirt, Women, Top</span>
                </div>
                <hr />
                <div className="info">
                    <span>DESCRIPTION</span>
                    <hr />
                    <span>ADDITIONAL INFORMATION</span>
                    <hr />
                    <span>FAQ</span>
                </div>
            </div>
        </div>
    )
}

export default Product;