import React, { useState } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {Link} from "react-router-dom";
import Cart from "../Cart/Cart";
import "./Navbar.scss"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className='navbar'>
      <div className="wrapper"> 

        <div className="left">

        <div className="item">
          <Link className='link' to="/products/1">Womenswear</Link>
        </div>

        <div className="item">
          <Link className='link' to="/products/2">Menswear</Link>
        </div>

        <div className="item">
          <Link className='link' to="/products/3">Accessories</Link>
        </div>

        </div>
        <div className="center">
          <Link className='link' to="/">Lome</Link>
        </div>

        <div className="right">

        <div className="icons">
          <SearchOutlinedIcon/>
          <PersonOutlineOutlinedIcon/>
          <FavoriteBorderOutlinedIcon/>
          <div className="cartIcon" onClick={()=>setOpen(!open)}>
            <ShoppingCartOutlinedIcon/>
            <span>0</span>
          </div>
        </div>
        </div>
      </div>
      {open && <Cart/>}
    </div>
  )
}

export default Navbar;
