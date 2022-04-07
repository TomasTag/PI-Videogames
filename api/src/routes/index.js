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
                genres: el.genres.map((elem) => elem.name), 
                platforms: el.platforms.map( (elem) => elem.platform.name ),
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
    return infoDb.then((r) => 
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
            createdInDB,
        } = v;
        const game = {
            id,
            name,
            image,
            description,
            releasedDate,
            rating,
            genres: genres.map((el) => el.name),
            platforms,
            createdInDB,
        };
        return game;
    }))
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

//Obtiene el nombre de todos los géneros
const genres = async () => {
    const genresApi = await axios(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genEach = genresApi.data.results.map((ele) => ele.name);
    return genEach;
  };
  
//Pone todos los géneros en la base de datos
const putGenresInDB = async () => {
    const genEach = await genres();
    genEach.forEach(async (ele) => {
      await Genre.findOrCreate({
        where: { name: ele },
      });
    });
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
        try{ //RESOLVER DUDA ACÁ--------------------------------------------------------------------------------------------------------------
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

router.get("/genres", async (req, res, next) => {
    try{
        putGenresInDB();   
        const allGenres = await Genre.findAll();
        res.send(allGenres)
    } catch(err){
        next(err)
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
         genre
    } = req.body;
  
    if (
      !image ||
      !name ||
      !genre ||
      !description ||
      !releasedDate ||
      !rating ||
      !platforms
    )
      return res.status(404).json({ msg: "Info are required" });
    else {
      try {
        let createdVideogame = await Videogame.create({
          name,
          image,
          description,
          releasedDate,
          rating,
          platforms,
        });
        
        let genreDb = await Genre.findAll(
            { where: { name: genre } 
        });
        
        createdVideogame.addGenre(genreDb);
        
        res.send("VideoGame created succesfully.");
      
    } catch (error) {
        res.status(404).send(error);
    }
    }
})


module.exports = router;
