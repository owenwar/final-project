import React from 'react'
import "./List.scss"
import Card from '../Card/Card';

const List = () => {
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
    ];

  return (
    <div className='list'>
      {data?.map(item=>(
        <Card item={item} key={item.id} />
      ))}
    </div>
    
  )
}

export default List;
