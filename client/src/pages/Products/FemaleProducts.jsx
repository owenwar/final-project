import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import "./Products.scss"
import { GET_PRODUCTS_BY_GENDER } from "../../utils/queries";

const MaleProducts = () => {

    const [gender] = useState('male'); 
    const catId = parseInt(useParams().id)
    const [maxPrice,setMaxPrice] = useState(1000)
    const [sort, setSort] = useState(null)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await GET_PRODUCTS_BY_GENDER('female');
                console.log(fetchedProducts)
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);
    

    return (
        <div className="products">
            <div className="left">
                <div className="filterItem">
                    <h2>Product Categories</h2>
                    <div className="inputItem">
                        <input type="checkbox" id="1" value={1} />
                        <label htmlFor="1">Shoes</label>
                    </div>
                </div>

                <div className="filterItem">
                    <h2>Filter by price</h2>
                    <div className="inputItem">
                        <span>0</span>
                        <input type="range" min={0} max={1000} onChange={(e)=>setMaxPrice(e.target.value)}/>
                        <span>{maxPrice}</span>
                    </div>
                </div>

                <div className="filterItem">
                    <h2>Sort by</h2>
                    <div className="inputItem">
                        <input type="radio" id="asc" value="asc" name="price" onChange={e=>setSort("asc")} />
                        <label htmlFor="asc">Price: Low to High</label>
                    </div>
                    <div className="inputItem">
                        <input type="radio" id="desc" value="desc" name="price" onChange={e=>setSort("desc")} />
                        <label htmlFor="desc">Price: High to Low</label>
                    </div>
                </div>
            </div>

            <div className="right">
                <img className="catImg" 
                src="https://cdn.discordapp.com/attachments/892058013098184734/1131690360192630785/IMG_6899.jpg" 
                alt="" />
                {products.map(product => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <img src={product.imageUrl} alt={product.name} />
                </div>
            ))}
                {/* <List gender={gender} catId={catId} maxPrice={maxPrice} sort={sort}/> */}
            </div>
        </div>
    )
}

export default MaleProducts;