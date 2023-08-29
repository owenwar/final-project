import React, { useState }  from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {Link, useLocation, useNavigate } from "react-router-dom";
import Cart from '../Cart/Cart';
import "./Navbar.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState('male');
  const location = useLocation();
  const navigate = useNavigate();

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    const newPath = location.pathname.replace(/\/(male|female)/, `/${gender}`);
    navigate(newPath); // Use navigate to update the route
  };

    return (
      <div className='navbar'>
        <div className="wrapper"> 

          <div className="left">

          <div className="item">
            <Link
              className={`link ${selectedGender === 'male' ? 'active' : ''}`}
              to="/products/male"
              onClick={() => handleGenderChange('male')}
            >
              Menswear
            </Link>
          </div>

          <div className="item">
            <Link
              className={`link ${selectedGender === 'female' ? 'active' : ''}`}
              to="/products/female"
              onClick={() => handleGenderChange('female')}
            >
              Womenswear
            </Link>
          </div>

          </div>
          <div className="center">
            <Link className='link' to="/">Lome</Link>
          </div>

          <div className="right">

          <div className="item">
            <Link className='link' to="/">About</Link>
          </div>

          <div className="item">
            <Link className='link' to="/">Contact</Link>
          </div>

          <div className="item">
            <Link className='link' to="/">Stores</Link>
          </div>

          <div className="icons">
            <SearchOutlinedIcon/>
            <Link className='link' to='/signUp'>
                <PersonOutlineOutlinedIcon />
            </Link>
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
