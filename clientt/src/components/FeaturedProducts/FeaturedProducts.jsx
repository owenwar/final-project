import React from 'react'
import Card from '../Card/Card'
import "./FeaturedProducts.scss"

const FeaturedProducts = ({type}) => {

    const data = [
        {
            id: 1,
            img: "https://cdn.discordapp.com/attachments/892058013098184734/1132235387792785480/IMG_6924.png",
            img2: "https://cdn.discordapp.com/attachments/892058013098184734/1132199718835978291/IMG_6917.png",
            title: "Short sleeve raf shirt",
            isNew: true,
            oldPrice: 280,
            price: 200,
        },
        {
            id: 2,
            img: "https://cdn.discordapp.com/attachments/892058013098184734/1132199718492053504/IMG_6918.png",
            title: "Aris shorts",
            isNew: false,
            oldPrice: 340,
            price: 300,
        },
        {
            id: 3,
            img: "https://cdn.discordapp.com/attachments/892058013098184734/1132235386123473007/IMG_6919.png",
            title: "Black Mansion Bag",
            isNew: false,
            oldPrice: 180,
            price: 130,
        },
        {
            id: 4,
            img: "https://cdn.discordapp.com/attachments/892058013098184734/1132235387528560710/IMG_6923.png",
            title: "Dior Jean",
            isNew: false,
            oldPrice: 400,
            price: 250,
        },
    ]

  return (
    <div className='featuredProducts'>
        
        <div className="top">
            <h1>{type} products </h1>

            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
            suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
            lacus vel facilisis labore et dolore magna aliqua. Quis ipsum
            suspendisse ultrices gravida. Risus commodo viverra maecenas.
            </p>
        </div>

        <div className="bottom">
            {data.map(item=>(
                <Card item={item} key={item.id}/>
            ))}
        </div>

    </div>
  )
}

export default FeaturedProducts;