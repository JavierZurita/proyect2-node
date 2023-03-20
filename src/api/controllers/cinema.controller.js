const Cinema = require('../models/cinema.model');

const getCinema = async(req,res) => {
    try {
        const allCinema = await Cinema.find();
        return res.status(200).json(allCinema);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const postCinema = async (req,res) => {
    try {
        console.log(req.body);
        const newCinema = new Cinema(req.body);
        return res.status(201).json(newCinema);

    } catch (error) {
        return res.status(500).json(error);
    }
}

const putCinema = async (req,res) => {
    try {
        const {id} = req.params;
        const putCinema = new Cinema(req.body);
        putCinema._id = id;
        const updateCinema = await Cinema.findByIdAndUpdate(id, putCinema, {new: true});
        if(!updateCinema){
            return res.status(400).json({"message": "cinema not found"});
        }
        return res.status(200).json(updateMovie);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteCinema = async (req,res) => {
    try {
        const {id} = req.params;
        const deleteCinema = await Cinema.findByIdAndDelete(id);
        if(!deleteCinema){
            return res.status(400).json({"message": "movie not found"});
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {getCinema, postCinema, putCinema, deleteCinema};