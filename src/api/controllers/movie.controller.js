const Movie = require('../models/movie.model'); 

const getMovie = async (req,res) =>{

    try {
        let {page,limit} = req.query;
        
        const numMovies = await Movie.countDocuments();
        limit = limit ? parseInt(limit) : 10;
        if(page && !isNaN(parseInt(page))){

            page = parseInt(page);
            let numPages = numMovies%limit > 0 ? numMovies/limit + 1 : numMovies/limit;
       
            if(page > numPages) page = numPages;

            if(page < 1) page = 1;

            const skip = (page -1) * limit;

            const movies = await Movie.find().skip(skip).limit(limit);
            return res.status(200).json(
                {
                    info: {
                        numTotal: numMovies,
                        page: page,
                        limit: limit,
                        nextPage: numPages >= page+1 ? `/movie?page=${page + 1}&limit=${limit}` : null,
                        prevPage: page != 1 ? `/movie?page=${page - 1}&limit=${limit}` : null
                    },
                    results: movies
                }
            )       
        } else {
            const movies = await Movie.find().limit(limit);
            return res.status(200).json(
                {
                    info: {
                        numTotal: numMovies,
                        page: 1,
                        limit: limit,
                        nextPage: numMovies > limit ? `/movie?page=2&limit=${limit}` : null,
                        prevPage: null
                    },
                    results: movies
                }
            );
        }
    } catch (error) {
        return res.status(500).json(error);
    }

    // try {
    //     const allMovies = await Movie.find();
    //     return res.status(200).json(allMovies);
    // } catch (error) {
    //     return res.status(500).json(error);
    // }
}

const getMovieById = async (req,res) => {
    try {
        const {id} = req.params;
        const allMovies = await Movie.findById(id);
        return res.status(200).json(allMovies);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getMovieByTitle = async (req,res) => {
    try {
        const {title} = req.params;
        const allMovies = await Movie.find({title: title});
        return res.status(200).json(allMovies);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getMovieByGenre = async (req,res) => {
    try {
        const {genre} = req.params;
        const allMovies = await Movie.find({genre: genre});
        return res.status(200).json(allMovies);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getMovieByYear = async (req,res) => {
    try {
        const {year} = req.params;
        const allMovies = await Movie.find({year: {$gte: year}});
        return res.status(200).json(allMovies);
    } catch (error) { 
        return res.status(500).json(error);
    }
}

const postMovie = async (req,res) => {
    try {
        console.log(req.body);
        const newMovie = new Movie(req.body);
        return res.status(201).json(newMovie);

    } catch (error) {
        return res.status(500).json(error);
    }
}

const putMovie = async (req,res) => {
    try {
        const {id} = req.params;
        const putMovie = new Movie(req.body);
        putMovie._id = id;

        const updateMovie = await Movie.findByIdAndUpdate(id, putMovie, {new: true});
        if(!updateMovie){
            return res.status(400).json({"message": "movie not found"});
        }
        return res.status(200).json(updateMovie);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteMovie = async (req,res) => {
    try {
        const {id} = req.params;
        const deleteMovie = await Movie.findByIdAndDelete(id);
        if(!deleteMovie){
            return res.status(400).json({"message": "movie not found"});
        }
        return res.status(200).json(deleteMovie);
    } catch (error) {
        return res.status(500).json(error);
    }

}

 module.exports = {getMovie, getMovieById, getMovieByTitle, getMovieByGenre, getMovieByYear, postMovie, putMovie, deleteMovie};