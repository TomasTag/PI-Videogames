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

//Obtiene info de la API
const getApiInfo = async () => {
    let n = 1
    let arr = []

    while(n <= 5){
        const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${n}`)
        const apiInfo = await apiUrl.data.results.map( (el)  => {
            return{
                id: el.id,
                name: el.name,
                rating: el.rating,
                image: el.background_image,
                releasedDate: el.released,
                genres: el.genres/*.map((elem) => elem.name)*/, 
                platforms: el.platforms.map((elem) => elem.platform.name),
            }
        })
        arr = arr.concat(apiInfo)        
        n++
    }
    return arr;
};

//Obtiene info de la base de datos
const getDbInfo = () => {
    const infoDb = Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }, 
        }
    })
    return infoDb/*.then((r) => 
    r.map((v) => {
        const {
            id,
            name,
            image,
            description,
            releasedDate,
            rating,
            genres,
            platforms,
            CreatedInDB,
        } = v;
        const game = {
            id,
            name,
            image,
            description,
            releasedDate,
            rating,
            genres genres.map((el) => {
                return {name: el.name}}),
            platforms,
            CreatedInDB,
        };
        return game;
    }))*/
};

//Concatena la info de la DB con la de la API y así obtener toda la info
const getAllInfo = async () => {
    let apiInfo = await getApiInfo();
    let dbInfo = await getDbInfo();
    let allInfo = dbInfo.concat(apiInfo); 

    return allInfo;
}

//Encuentra un juego en la base de datos a través de su ID
const findGameDB = (id) => {
    return Videogame.findByPk((id), {
        include: [
            {
                model: Genre,
                through: {
                    attributes: [],
                },
            }
        ]
    })
}

//Encuentra un juego a través de su ID en la API
const findGameAPI = (id) => {
    return axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
};

router.get("/videogames", async (req, res) => {
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
        console.log(err);
    }
})


router.get("/videogames/:id", (req, res) => {
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
                  description: data.description_raw,
                  releasedDate: data.released,
                  image: data.background_image,
                  rating: data.rating,
                  platforms: data.platforms.map((elem) => elem.platform.name),
                  genres: data.genres/*.map((elem) => elem.name)*/
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

router.get("/genres", async (req, res, next) => {
    try{
        let genresEndp = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        let genres = genresEndp.data.results.map((el) => {
            return {name: el.name}
        })

        const allGenresData = await Genre.findAll()
        if(allGenresData.length){
            res.send(allGenresData)
        } else{
            const genresDb = await Genre.bulkCreate(genres)
            return res.json(genresDb)
        }
    } catch(err){
        next(err)
    }
})

router.get("/videogamesdb", (req, res) =>{
    try {
        getDbInfo().then((g) => res.status(200).send(g))
    } catch (error) {
        console.log(error)
    }
})

router.get("/videogamesapi", (req, res) =>{
    try {
        getApiInfo().then((g) => res.status(200).send(g))
    } catch (error) {
        console.log(error)
    }
})

router.post("/videogame", async (req, res) => {
    let {
         image, 
         name, 
         description, 
         releasedDate, 
         rating, 
         platforms, 
         genres
    } = req.body;

    if (
        !image ||
        !name ||
        !genres ||
        !description ||
        !releasedDate ||
        !rating ||
        !platforms 
    )
      return res.status(404).json({ msg: "Info are required" });

    

        let videogameCreated = {
            name,
            image,
            description,
            releasedDate,
            rating,
            platforms
        };

      try {
        let createdVideogame = await Videogame.create({
            ...videogameCreated
        });
        
        let genreDb = await Genre.findAll(
            { where: { name: genres } 
        });
        
        await createdVideogame.addGenre(genreDb);
        
        res.send("VideoGame created succesfully.");
      
    } catch (error) {
        console.log(error)
        //res.status(404).send("post error", error);
    }
    
})


module.exports = router;
