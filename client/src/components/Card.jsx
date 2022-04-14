import React from "react";


export default function Card({image, name, genres}) {
    return (
        <div className="card">
            <img src={image?image:"https://media.gcflearnfree.org/content/5ccc48c7e5c6c4116cbd9df7_05_03_2019/consolasjuegos-01_xl.png"} alt="imagen" width="230px" height="180px"/>
            <h2>{name}</h2>
            <div>
                <p>Genres: </p>
                {genres?.map((gen) => {
                    return (
                        <div key={gen.name}>
                            {gen.name}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}