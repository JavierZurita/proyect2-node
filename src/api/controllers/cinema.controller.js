const Cinema = require('../models/cinema.model');

const getCinema = async(req,res) => {
    try {
        const allCinema = await Cinema.find().populate("movies");
        return res.status(200).json(allCinema);
    } catch (error) {
        return res.status(500).json(error); 
    }
}
const getCinemaById = async (req, res) => {
    try {
        console.log("Entra getter id");
        const {id} = req.params;
        console.log(id);
        const cinema = await Cinema.findById(id);
        if(!cinema){
            return res.status(404).json({ "message": "cinema not found"});
        }
        return res.status(200).json(cinema);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const postCinema = async (req,res) => {
    try {
        console.log("Entra al post");
        console.log(req.body); 
        const newCinema = new Cinema(req.body);
        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema);
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
        return res.status(200).json(updateCinema);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteCinema = async (req,res) => {
    try {
        const {id} = req.params;
        const deleteCinema = await Cinema.findByIdAndDelete(id);
        if(!deleteCinema){
            return res.status(400).json({"message": "cinema not found"});
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {getCinema,getCinemaById , postCinema, putCinema, deleteCinema};