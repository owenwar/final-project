import React from "react";
import { useState } from "react";
import "./Product.scss"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";

const Product = () => {
    const [selectedImg, setSelectedImg] = useState(0)
    const [quantity, setQuantity] = useState(1)

    const images = [
        "https://cdn.discordapp.com/attachments/892058013098184734/1131690359064375357/IMG_6905.jpg",
        "https://cdn.discordapp.com/attachments/892058013098184734/1131690360461082755/IMG_6904.jpg",
    ]

    return (
        <div className="product">
            <div className="left">
                <div className="images">
                    <img src={images[0]} alt="" onClick={(e) => setSelectedImg(0)} />
                    <img src={images[1]} alt="" onClick={(e) => setSelectedImg(1)} />
                </div>
                <div className="mainImg">
                    <img src={images[selectedImg]} alt="" />
                </div>
            </div>

            <div className="right">
                <h1>Title</h1>
                <span className="price">$199</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, quisquam delectus dignissimos, aliquam aspernatur aut, placeat repudiandae id sint doloribus debitis asperiores cupiditate dolor iusto animi facere. In, vero laboriosam!</p>
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