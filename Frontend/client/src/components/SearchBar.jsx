import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameGames } from "../actions";
import { GiMagnifyingGlass } from "react-icons/gi"
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
            <button type="submit" onClick={(e) => handleSubmit(e)} style={{color:"white", backgroundColor: "rgba(255, 255, 255, 0)", borderColor: "white"}}>
                <GiMagnifyingGlass size={20}/>
            </button>
            <input
            type="text"
            placeholder="Search by name..."
            onChange={(e) => handleInputChange(e)}  
            />
        </div>
    )
}