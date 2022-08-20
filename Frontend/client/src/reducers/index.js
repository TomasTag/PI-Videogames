const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    details: []
}

function rootReducer(state=initialState, action){
    switch(action.type){
        //en mi state videogames manda todo lo que te mande la acción GET_VIDEOGAMES
        case "GET_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload 
            }      
        case "GET_NAME_GAMES":
            return{
                ...state,
                videogames: action.payload
            }
        case "GET_GENRES":
            return{
                ...state,
                genres: action.payload
            }
        case "GET_ID":
            return{
                ...state,
                details: action.payload
            }
        case "GET_DB_GAMES":
            return{
                ...state,
                videogames: action.payload
            }
        case "GET_API_GAMES":
            return{
                ...state,
                videogames: action.payload
            }    
        case "POST_GAME":
            return{
                ...state
            }
        case "CLEAR_DETAIL":
            return{
                ...state,
                details: []
            }
        case "FILTER_BY_GENRE":
            const allGames = state.allVideogames
            const genresFiltered = action.payload === "All" 
            ? allGames 
            : allGames.filter((elem) => elem.genres.find((ele) => ele.name.includes(action.payload)))
            return{
                ...state,
                videogames: genresFiltered,
            };
        case "FILTER_CREATED_GAMES": 
        let createdFilter = action.payload === "creados" 
            ? state.allVideogames.filter((elem) => elem.CreatedInDb)
            : state.allVideogames
            return {
                ...state,
                type: "FILTER_CREATED_GAMES",
                videogames: createdFilter       
            }      
        case "ORDER_BY_NAME":
            let orderedNames = action.payload === "asc"
            ? state.videogames.sort((a, b) => { //sort: método de ordenamiento
                if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                return 0;                
            }) 
            : state.videogames.sort((a, b) => {
                if(a.name > b.name) return -1;
                if(a.name < b.name) return 1;
                return 0;
            })
            return {
                ...state,
                videogames: action.payload === "all" ? state.allVideogames : orderedNames
            }
        case "ORDER_BY_RATING":
            let orderedRating = action.payload === "ratAsc"
            ? state.videogames.sort((a, b) => {
                if(a.rating > b.rating) return 1;
                if(a.rating < b.rating) return -1;
                return 0;
            })
            : state.videogames.sort((a, b) => {
                if(a.rating > b.rating) return -1;
                if(a.rating < b.rating) return 1;
                return 0;
            })
            return{
                ...state,
                videogames: action.payload === "All" ? state.allVideogames : orderedRating
            }
        default:
            return state
    } 
};

export default rootReducer; 

