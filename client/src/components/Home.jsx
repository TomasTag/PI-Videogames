import { useState, useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux" 
import { 
    getVideogames, 
    filterByGenres, 
    orderByName, 
    orderByRating, 
    getDbVideogames,
    getApiVideogames } from "../actions";
import { Link } from "react-router-dom"
import BootCard from "./BootCard";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./Home.css"



export default function Home(){
    
    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videogames) //esto es como hacer mapStateToProps
                                                                   //useSelector = trae todo lo que está en el estado de videogames  
    console.log(allVideogames)

    const [currentPage, setCurrentPage] = useState(1) //El 1 hace ref a la primer pagina (donde arranca)
    const [gamesXpage, setGamesXpage] = useState(15) //cantidad de games por pagina 
    const [orden, setOrden] = useState('')
    const posLastGame = currentPage * gamesXpage //15
    const posFirstGame = posLastGame - gamesXpage //0
    const currentGame =  allVideogames.slice(posFirstGame, posLastGame) //games que hay que renderizar

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getVideogames()) //esto es como hacer mapDispatchToProps
    }, [dispatch])                //el array es para que no se haga un loop infinito de llamados

    function handleClick(event){
        event.preventDefault();
        dispatch(getVideogames());
    } 

    function handleFilterGenres(e){
        dispatch(filterByGenres(e.target.value))
    }

    function handleSortName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1); //Setea la pagina en la primera una vez hecho el ordenamiento  
        setOrden(`Ordenado ${e.target.value}`) //Modifica el estado local y se renderiza
    }

    function handleSortRating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`) 
    }

    function handleFilterCreated(e){
        if (e.target.value === "filter") {
            dispatch(getVideogames());
          }
        if (e.target.value === "api") {
            dispatch(getApiVideogames());
        }
        if (e.target.value === "creados") {
        dispatch(getDbVideogames());
        }
        dispatch(setCurrentPage(1));
    };

    return (
        <div className="container-home">
            <nav className="navBar">
            <h1 className="title">VIDEOGAMES APP</h1>
            <Link to="/videogame">
                <button className="createBtn">
                    Create Game
                </button>
            </Link>
            <button className="reloadBtn" onClick={(event) => handleClick(event)}>
                Reload games
            </button>
            <div>
                <select onChange={e => handleSortName(e)}>
                    <option>ALPHABETIC ORDER</option>
                    <option value="asc">Ascendant</option>
                    <option value="desc">Descendant</option>
                </select>   
                <select onChange={e => handleSortRating(e)}>
                    <option>RATING ORDER</option>
                    <option value="All">All games</option>
                    <option value="ratAsc">0 to 5</option>
                    <option value="ratDesc">5 to 0</option>
                </select>
                <select onChange={(e) => handleFilterCreated(e)}>
                    <option value="filter">CREATED GAMES</option>                  
                    <option value="filter">All games</option>
                    <option value="api">API games</option>
                    <option value="creados">Created</option>
                </select>
                <select className="select-style" onChange={(e) => handleFilterGenres(e)}> 
                    <option value="All">FILTER BY GENRES</option> 
                    <option value="All">All games</option> 
                    <option value="Action">Action</option> 
                    <option value="Indie">Indie</option> 
                    <option value="Adventure">Adventure</option> 
                    <option value="RPG">RPG</option> 
                    <option value="Strategy">Strategy</option> 
                    <option value="Shooter">Shooter</option> 
                    <option value="Casual">Casual</option> 
                    <option value="Simulation">Simulation</option> 
                    <option value="Puzzle">Puzzle</option> 
                    <option value="Arcade">Arcade</option> 
                    <option value="Platformer">Platformer</option> 
                    <option value="Racing">Racing</option> 
                    <option value="Massively Multiplayer">Massively Multiplayer</option> 
                    <option value="Sports">Sports</option> 
                    <option value="Fighting">Fighting</option> 
                    <option value="Family">Family</option> 
                    <option value="Board Games">Board Games</option> 
                    <option value="Educational">Educational</option> 
                    <option value="Card">Card</option> 
                </select>
                <div className="search">
                    <SearchBar/>
                </div>
            </div>
            </nav>
                <Paginado gamesXpage={gamesXpage} allVideogames={allVideogames.length} paginated={paginated}/>
                
                <div className="cards">
                    {
                        currentGame?.map( (el) => {
                            return(
                                <div key={el.id}>
                                    <Link to={"/home/" + el.id}>
                                        <BootCard 
                                        image={el.image}  
                                        name={el.name} 
                                        genres={el.genres}
                                        key={el.id}
                                        />
                                    </Link>                          
                                </div>
                            );                       
                        })
                    }
                </div>
                
        </div>
    )



}