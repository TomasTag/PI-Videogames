import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension" 
import thunk from "redux-thunk" //se encarga de gestión de los datos, servicios de aplicaciones, mensajería, 
                                //autenticación y gestión de las API. 
import rootReducer from "../reducers";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))