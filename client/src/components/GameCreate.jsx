import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGenres, postGame, getVideogames } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import BackButton  from "./BackButton.jsx"
import "./GameCreate.css"

function validate(input){
    let error = {}
    if(!input.name){
        error.name = "Incorrect name"
    }
    else if(!input.releasedDate){
        error.releasedDate = "Released date is required"
    }
    else if(!input.description){
        error.description = "Rescription is required"
    }
    else if(!input.rating || input.rating > 5 || input.rating < 0){
        error.rating = "Rating is required or must be between 0 - 5"
    }
    else if(!input.platforms.length){
        error.platforms = "Platform is required"
    } 
    else if(!input.genres.length){
        error.genres = "Genre is required"
    } return error

}

export default function GameCreate(){
    const dispatch = useDispatch();
    const generos = useSelector((state) => state.genres);
    const videogames = useSelector((state) => state.videogames)
    
    let initialState = {
        name: "",
        image: "",
        releasedDate: "",
        description: "",
        rating: "",
        platforms: [],
        genres: []
    }


    const [input, setInput] = useState(initialState)
    const [error, setError] = useState({})

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])
    
    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])

    function handleSubmit(e){
        e.preventDefault();
        if(Object.values(error).length > 0){
            alert("Please complete the information required.")
        }
        else if(
            input.name === "" 
            && input.releasedDate === "" 
            && input.description === "" 
            && input.rating === "" 
            &&  !input.platforms.length 
            && !input.genres.length 
        ){
            alert("Please complete the form.")
        } else{
            dispatch(postGame(input));  
            setInput({
                name: "",
                image: "",
                releasedDate: "",
                description: "",
                rating: "",
                platforms: [],
                genres: []
            })
        }
    }
    
    function handleInput(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setError(
        validate({
            ...input,
            [e.target.name] : e.target.value
        })
        )
    }

    function handleSelect(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        setError(
            validate({
                ...input,
                genres: [...input.genres, e.target.value]
            })
            )   
    }

    function handleCheck(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        setError(
            validate({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
            )   
    }

    function handleDelete(e){
        setInput({
            ...input,
            genres: input.genres.filter(ig => ig !== e)
        })
    }

    return(
        <div className="containerCreate">
            <div className="backBtn">
                <Link to="/Home">
                    <BackButton />
                </Link>
            </div>
            <h1 className="titleCreate">Let's create a game!!</h1>
            <form onSubmit={e => handleSubmit(e)} className="formCreate">
                <div>
                    <label>Name: </label>
                    <input className="formInput" type="text" value={input.name} name="name" onChange={e => handleInput(e)}/>
                </div>
                    {error.name && <p>{error.name}</p>}
                <div>
                    <label>Image: </label>
                    <input className="formInput" type="text" value={input.image} name="image" onChange={e => handleInput(e)}/>
                </div>
                <div>
                    <label>Released Date: </label>
                    <input className="formInput" type="text" value={input.releasedDate} name="releasedDate" onChange={e => handleInput(e)}/>
                    {error.releasedDate && <p>{error.releasedDate}</p>}
                </div>
                <div>
                    <label>Description: </label>
                    <input className="formInput" type="text" value={input.description} name="description" onChange={e => handleInput(e)}/>
                    {error.description && <p>{error.description}</p>}
                </div>
                <div>
                    <label>Rating: </label>
                    <input className="formInput" type="number" value={input.rating} name="rating" onChange={e => handleInput(e)}/>
                    {error.rating && <p>{error.rating}</p>}
                </div>
                <div>
                <h3> Plataforms: </h3> 
                <label><br/><input type="checkbox" name="Xbox One" value="Xbox One" onChange={(e) => handleCheck(e)}></input> Xbox One</label> 
                <label><input type="checkbox" name="Xbox Series S/X" value="Xbox Series S/X" onChange={(e) => handleCheck(e)}></input> Xbox Series S/X</label> 
                <label><input type="checkbox" name="Xbox 360" value="Xbox 360"  onChange={(e) => handleCheck(e)}></input> Xbox 360</label> 
                <label><input type="checkbox" name="PlayStation 3" value="PlayStation 3" onChange={(e) => handleCheck(e)}></input> PlayStation 3</label> 
                <label><input type="checkbox" name="PlayStation 4" value="PlayStation 4" onChange={(e) => handleCheck(e)}></input> PlayStation 4</label> 
                <label><input type="checkbox" name="PlayStation 5" value="PlayStation 5" onChange={(e) => handleCheck(e)}></input> PlayStation 5</label> 
                <label><input type="checkbox" name="PC" value="PC" onChange={(e) => handleCheck(e)}></input> PC</label> 
                <label><input type="checkbox" name="Nintendo 3DS" value="Nintendo 3DS" onChange={(e) => handleCheck(e)}></input> Nintendo 3DS</label> 
                <label><input type="checkbox" name="Game Boy" value="Game Boy" onChange={(e) => handleCheck(e)}></input> Game Boy</label> 
                <label><input type="checkbox" name="Nintendo Store" value="Nintendo Store" onChange={(e) => handleCheck(e)}></input> Nintendo Store</label> 
                <label><input type="checkbox" name="Wii U" value="Wii U" onChange={(e) => handleCheck(e)}></input> Wii U</label> 
                <label><input type="checkbox" name="Racing" value="Racing" onChange={(e) => handleCheck(e)}></input> Racing</label> 
                <label><input type="checkbox" name="Nintendo 64" value="Nintendo 64" onChange={(e) => handleCheck(e)}></input> Nintendo 64</label>
                {error.platforms && <p>{error.platforms}</p>}               
                </div>
                <div>
                    <select onChange={(e) => handleSelect(e)}>
                        <option>GENRES</option>
                        {generos.map((gen, i) => (
                            <option value={gen.name} key={i*7}>{gen.name}</option>
                        ))}
                    </select>
                    {error.genres && <p>{error.genres}</p>}                   
                </div>
                <div>
                    {input.genres.map((g, i) => (
                        <div>
                            <p>{g}</p>,
                            <button type="button" onClick={e => handleDelete(g)} key={i*5}>X</button>
                        </div>
                    ))}
                </div>
                <button type="submit" className="submitBtn">Submit</button>
            </form>
        </div>
    )
}