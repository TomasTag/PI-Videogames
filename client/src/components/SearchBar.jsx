import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameGames } from "../actions";
import "./SearchBar.css"

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }  

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameGames(name))
    }

    return(
        <div className="searchBar">
            <input
            type="text"
            placeholder="Search by name..."
            onChange={(e) => handleInputChange(e)}  
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>
                🔎
            </button>
        </div>
    )
}