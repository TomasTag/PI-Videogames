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