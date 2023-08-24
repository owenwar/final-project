import React from 'react'
import "./Cart.scss"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";


const Cart = () => {
 const data = [
   {
     id: 1,
     img: "https://cdn.discordapp.com/attachments/892058013098184734/1132235387792785480/IMG_6924.png",
     img2: "https://cdn.discordapp.com/attachments/892058013098184734/1132199718835978291/IMG_6917.png",
     title: "Short sleeve raf shirt",
     desc: "Short sleeve raf shirt",
     isNew: true,
     oldPrice: 280,
     price: 200,
 },
 {
   id: 2,
   img: "https://cdn.discordapp.com/attachments/892058013098184734/1132199718492053504/IMG_6918.png",
   title: "Aris shorts",
   desc: "Aris shorts",
   isNew: false,
   oldPrice: 340,
   price: 300,
 },
 ];


 return (
   <div className='cart'>
     <h1>Products in your cart</h1>
     {data?.map(item=>(
       <div className="item" key={item.id}>
         <img src={item.img} alt="" />
         <div className="details">
           <h1>{item.title}</h1>
           <p>{item.desc?.substring(0,100)}</p>


           <div className="price">1 x ${item.price}</div>
         </div>
         <DeleteOutlinedIcon className="delete"/>
       </div>
     ))}
     <div className="total">
       <span>Subtotal</span>
       <span>$123</span>
     </div>
     <button>Proceed to Checkout</button>
     <span className="reset">Reset Cart</span>
   </div>
 )
}


export default Cart
