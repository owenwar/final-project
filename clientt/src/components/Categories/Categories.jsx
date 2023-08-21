import React from 'react'
import "./Categories.scss"
import {Link} from "react-router-dom"


const Categories = () => {
  return (
    <div className='categories'>
        <div className="col">
            <div className="row">
                <img src="https://cdn.discordapp.com/attachments/892058013098184734/1131690358246473748/IMG_6909.jpg" alt="" />
            <button>
                <Link className="link" to="/products/1">Sale</Link>
            </button>
            </div>

            <div className="row">
            <img src="https://cdn.discordapp.com/attachments/892058013098184734/1131690358246473748/IMG_6909.jpg" alt="" />
            <button>
                <Link className="link" to="/products/1">Sale</Link>
            </button>
            </div>
        </div>
        
        <div className="col">

            <div className="row">
            <img src="https://cdn.discordapp.com/attachments/892058013098184734/1131690358246473748/IMG_6909.jpg" alt="" />
            <button>
                <Link className="link" to="/products/1">Sale</Link>
            </button>
            </div>
        </div>
        
        <div className="col col-1">

            <div className="row">

                <div className="col">
                    <div className="row">
                    <img src="https://cdn.discordapp.com/attachments/892058013098184734/1131690358246473748/IMG_6909.jpg" alt="" />
                    <button>
                        <Link className="link" to="/products/1">Sale</Link>
                    </button>
                    </div>
                </div>

                <div className="col">
                    <div className="row">
                    <img src="https://cdn.discordapp.com/attachments/892058013098184734/1131690358246473748/IMG_6909.jpg" alt="" />
                    <button>
                        <Link className="link" to="/products/1">Sale</Link>
                    </button>
                    </div>
                </div>
            </div>
            
            <div className="row">
            <img src="https://cdn.discordapp.com/attachments/892058013098184734/1131690358246473748/IMG_6909.jpg" alt="" />
                    <button>
                        <Link className="link" to="/products/1">Sale</Link>
                    </button>
            </div>

        </div>

    </div>
  )
}

export default Categories;