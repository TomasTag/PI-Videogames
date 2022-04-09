
const initialState = {
    videogames: []
}

function rootReducer(state=initialState, action){
    switch(action.type){
        //en mi state videogames manda todo lo que te mande la acción GET_VIDEOGAMES
        case "GET_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload 
            } 
            default:
                return state
    }
};

export default rootReducer; 

