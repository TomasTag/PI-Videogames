import axios from "axios";

export function getVideogames(){
    return async function(dispatch){ //con fetch usas .then y axios te devuelve la respuesta en un data
        let json = await axios("http://localhost:3001/videogames"); //acá sucede la conexión con el back
        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: json.data
        }) 
    }
}

export function getNameGames(name){
    return async function(dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type: "GET_NAME_GAMES",
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function getGenres(){
    return async function(dispatch){
    try {
        let jsonGen = await axios.get("http://localhost:3001/genres")
        return dispatch({
            type: "GET_GENRES",
            payload: jsonGen.data
        }) 
    } catch (e) {
        console.log(e)
    }
    }
}

export function getGameId(id){
    return async function(dispatch){
        try {
            let jsonId = await axios.get(`http://localhost:3001/videogames/${id}`)
            return dispatch({
                type: "GET_ID",
                payload: jsonId.data
            }) 
        } catch (e) {
            console.log(e)
        }
    }
}

export function getDbVideogames(){
    return async function (dispatch){ 
        
            let jsonDb = await axios("http://localhost:3001/videogamesdb")
                return dispatch({
                    type: "GET_DB_GAMES",
                    payload: jsonDb.data
                })
            }
        
    }


export function getApiVideogames(){
    return async function (dispatch){ 
        
            let jsonApi = await axios("http://localhost:3001/videogamesapi")
           
                return dispatch({
                    type: "GET_API_GAMES",
                    payload: jsonApi.data
                })
            }
        
}

export function clearDetail() {
    return {
      type: "CLEAR_DETAIL",
    };
}

export function filterByGenres(payload){
    return{
        type: "FILTER_BY_GENRE",
        payload
    }
}

export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByRating(payload){
    return{
        type: "ORDER_BY_RATING",
        payload
    }
}


export function postGame(payload){
    return async () => {
        const postVid = await axios.post("http://localhost:3001/videogame", payload);
        return {
            type: "POST_GAME",
            payload: postVid.data
        };
    };
}

export function createDb(payload){
    return{
        type: "CREATE_DB",
        payload
    };
}