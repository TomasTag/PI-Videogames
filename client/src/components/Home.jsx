import { useState, useEffect, Fragment } from "react"; 
import { useDispatch, useSelector } from "react-redux" 
import { getVideogames } from "../actions";
import { Link } from "react-router-dom"
import Card from "./Card";

export default function Home(){
    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videogames) //esto es como hacer mapStateToProps
                                                                   //useSelector = trae todo lo que está en el estado de videogames
    useEffect(() => {
        dispatch(getVideogames()) //esto es como hacer mapDispatchToProps
    }, [dispatch])                        //el array es para que no se haga un loop infinito de llamados

    return (
        <div>
            <Link to="/videogame">Create Game</Link>
            <h1>VIDEOGAMES APP</h1>
            <button>
                Reload games
            </button>
            <div>
                <select>
                    <option value="asc">Ascendant</option>
                    <option value="desc">Descendant</option>
                </select>
                <select>
                    <option value="ratAsc">+ to -</option>
                    <option value="ratDesc">- to +</option>
                </select>
                <select>
                    <option value="todos">All</option>
                    <option value="creados">Created</option>
                    <option value="api">Existing</option>
                </select>
                {
                    allVideogames?.map( (el) => {
                        return(
                            <div key={el.id}>
                                <Card 
                                key={el.id}
                                image={el.image}  
                                name={el.name} 
                                genres={el.genres}
                                />
                            </div>
                        );                       
                    })
                }
            </div>
        </div>
    )
}

