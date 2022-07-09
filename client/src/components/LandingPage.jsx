import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"

export default function LandingPage(){
    return( 
        <div className="container-land">
            <div className="title-cont ">
                <h1 className="title">🎮 videogames app 🎮</h1>
            </div>
            <Link to="/Home">
                <div className="btn-cont">
                    <button className="btn-land">HOME</button>
                </div>
            </Link>
        </div>
    
    )
}