import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"

export default function LandingPage(){
    return( 
        <div className="container">
            <h1 className="title">Welcome to my videogames app 🎮</h1>
            <Link to="/Home">
                <button className="btn">HOME</button>
            </Link>
        </div>
    
    )
}