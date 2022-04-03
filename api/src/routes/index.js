require("dotenv").config();
const { Router } = require('express');
const { Videogame, Genre } = require('../db')
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const router = Router();

//Configurar los routers
//Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    let n = 1
    let arr = []

    while(n <= 5){
        const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${n}`)
        const apiInfo = await apiUrl.data.results.map( (el)  => {
            return{
                id: el.id,
                name: el.name,
                image: el.background_image,
                releasedDate: el.released,
                rating: el.rating,
                platforms: el.platforms.map( elem => elem.platform.name ) 
            }
        })
        arr = arr.concat(apiInfo)        
        n++
    }
    return arr;
};

const getDbInfo = async () => {
    return await Videogame.findAll({
        includes: {
            model: Genre,
            attrib: ['name'],
            through: {
                attrib: []
            }, 
        }
    })
};

const getAllInfo = async () => {
    let apiInfo = await getApiInfo();
    let dbInfo = await getDbInfo();
    let allInfo = apiInfo.concat(dbInfo);

    return allInfo;
}

const findGameDB = (id) => {
    return Videogame.findByPk((id), {
        include: [
            {
                model: Genre,
                through: {
                    attrib: [],
                },
            }
        ]
    })
}

const findGameAPI = (id) => {
    return axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
};

router.get("/videogames", async (req, res, next) => {
    try{
        let { name } = req.query;
        let allVideogames = await getAllInfo();

        if(name) {
            let videogameName = allVideogames
            .filter(elem => elem.name.toLowerCase().includes(name.toLowerCase()))
            .slice(0, 15)
            
            videogameName.length ? res.status(200).send(videogameName) : res.status(404).send("Game not found.")  
        
        } else {
            res.status(200).send(allVideogames)
        }
    } catch(err) {
        next(err);
    }
})


router.get("/videogames/:id", async (req, res) => {
    const { id } = req.params;
    if (id.includes("-")) {
        try {
          findGameDB(id).then((game) => res.status(200).json(game));
        } catch (error) {
          next(error);
        }
    } else {
        try{ 
            findGameAPI(id).then((apiUrl) => {
                const data = apiUrl.data;
                let game = {
                  id: data.id,
                  name: data.name,
                  description: data.description,
                  releasedDate: data.released,
                  image: data.background_image,
                  rating: data.rating,
                  platforms: data.platforms.map((elem) => elem.platform.name),
                  genres: data.genres.map((elem) => elem.name),
                };
                return game;
            })
            .then((game) => res.status(200).json(game))

        } catch(err){
            console.log("Error in the request of the API route.")
            next(error)
        }
    }
})

router.get("/genres", (req, res, next) => {
    
})

module.exports = router;
