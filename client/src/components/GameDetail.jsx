import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getGameId, clearDetail, /*deleteGame, resetId*/ } from "../actions";
import BackButton from "./BackButton";
import "./GameDetail.css"

export default function GetDetail(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const gameDetail = useSelector((state) => state.details)
    
    useEffect(() => {
        dispatch(getGameId(id));
        return () => dispatch(clearDetail());
    }, [dispatch])

    return(
        <div className="container">
            <Link to="/Home">
                <BackButton />
            </Link>
            <div className="subcontainer">
                    <h1>{gameDetail.name ? gameDetail.name : "Name not found."}</h1>
                    <img className="image" height="300px" width="500px" src={gameDetail.image ? gameDetail.image : "Image not found"}/>
            </div>
            <div>
                <div className="categories">
                    <label>Genres: </label>
                    <h3 className="genres">
                        {gameDetail.genres ? gameDetail.genres.map((ele) => ele.name + (' /')) : "Genres not found"}
                    </h3>
                    
                    <label>Platforms: </label>
                    <h3>      
                        {gameDetail.platforms? gameDetail.platforms.map((el) => el + ("/ ")) : ("Platform not found")}
                    </h3>
                
                    <label>Released Date: </label>
                    <h4>       
                        {gameDetail.releasedDate ? gameDetail.releasedDate : "Released date not found"}
                    </h4>
                    
                    <label>Rating: </label>
                    <h4>
                        {gameDetail.rating ? gameDetail.rating : "Rating not found"}
                    </h4>

                    <label>Description: </label>
                    <p>       
                        {gameDetail.description ? gameDetail.description : "Description not found"}
                    </p>
                </div>
            </div>
        </div>
    
    )
}