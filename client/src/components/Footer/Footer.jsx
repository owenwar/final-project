import React from 'react'
import "./Footer.scss";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <div className='footer'>
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span>
            <div className="item">
              <Link className='link' to="/products/female">Womenswear</Link>
            </div>
          </span>
          <span>
            <div className="item">
              <Link className='link' to="/products/male">Menswear</Link>
            </div>
          </span>
          <span>Shoes</span>
          <span>Accessories</span>
          <span>New Arrivals</span>
        </div>

        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>

        <div className="item">
          <h1>About</h1>
          <span>
          Welcome to Lome Urban Wear, where style meets the streets. We're not just a clothing store; we're a lifestyle, a movement, and a celebration of urban culture. Established with a passion for authenticity and a commitment to quality, Lome is your go-to destination for contemporary street fashion that captures the essence of city life.
          </span>
        </div>

        <div className="item">
          <h1>Our Collection</h1>
          <span>
          Our carefully curated collections showcase the latest trends in urban fashion. From street-inspired graphic tees and hoodies to edgy denim and statement accessories, our diverse range caters to both men and women who appreciate clothing that tells a story.
          </span>
        </div>

      </div>

      <div className="bottom">
        <div className="left">
          <span className='logo'>Lome</span>
          <span className='copyright'>© Copyright 2023. All Rights Reserved</span>
        </div>
        <div className="right"></div>
      </div>
    </div>
  )
}

export default Footer
