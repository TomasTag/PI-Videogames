import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage(){
    return( 
    <div>
        <h1>Welcome to my videogames app 🎮</h1>
        <Link to="/Home">
            <button>HOME</button>
        </Link>
    </div>
    )
}