import React from "react";


export default function Card({image, name, genres}) {
    return (
        <div className="card">
            <img src={image} alt="imagen" width="280px" height="180px"/>
            <h2>{name}</h2>
            <div>
                <p>Genres: </p>
                {genres?.map((gen) => {
                    return (
                        <div key={gen}>
                            {gen}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}