import React from "react";
import "./Paginado.css"

export default function Paginado({gamesXpage, allVideogames, paginated}){
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(allVideogames/gamesXpage); i++){ //Math.ceil redondea el nro para arriba
        pageNumbers.push(i)
    } 
    return(
        <div>
            <ul className="paginado">
                {pageNumbers?.map((number) =>{
                    return(
                        <div key={number}>
                            <button className="numButton" onClick={() => paginated(number)}>
                                {number}
                            </button>
                        </div>
                    )    
                })}
            </ul>
        </div>
    )
}
{/* <li className="numeroPag" key={number}>
    <a onClick={() => paginated(number)}>{number}</a>
</li> */}