import React, { useState } from "react";
import "./search.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";




const products = [
    { id: 1, label: "Raf Simons", img: "https://cdn.discordapp.com/attachments/892058013098184734/1132235387792785480/IMG_6924.png", desc: "Short sleeve raf shirt", isNew: true, oldPrice: 280, price: 200, },
    { id: 2, label: "Dior", img: "https://cdn.discordapp.com/attachments/892058013098184734/1132235387528560710/IMG_6923.png", desc: "Dior Jean", isNew: false, oldPrice: 400, price: 250, },
    { id: 3, label: "Maison Margiela", img: "https://cdn.discordapp.com/attachments/892058013098184734/1132235386123473007/IMG_6919.png", desc: "Black Mansion Bag", isNew: false, oldPrice: 180, price: 130, },
    { id: 4, label: "Rick Owens", img: "https://cdn.discordapp.com/attachments/892058013098184734/1132199718492053504/IMG_6918.png", desc: "Aris shorts", isNew: false, oldPrice: 340, price: 300, },
];
const Search = () => {
    const [search, setSearch] = useState("");
    const filteredProducts = products.filter((product) =>
        product.label.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <div className="search">
          <div className="wrapper">
                <div className="input">
                    <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    <SearchOutlinedIcon />
                </div>
            </div>
            <div className="results">
                {filteredProducts.map((product) => (
                    <div className="item" key={product.id}>
                        <img src={product.img} alt="" />
                        <div className="details">
                            <h1>{product.label}</h1>
                            <p>{product.desc}</p>
                            <div className="price">
                                <span>${product.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
        </div>
      );
    };


export default Search;

