const express = require('express');
const dotenv = require('dotenv').config();
const {connect} = require('./src/utils/database');
const cloudinary = require('cloudinary').v2;
const routerMovie = require('./src/api/routes/movie.routes');
const routerCinema = require('./src/api/routes/cinema.routes');
const routerUser = require('./src/api/routes/user.routes');
dotenv.config();
const PORT = process.env.PORT || 5000;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY ,
    api_secret: process.env.CLOUDINARY_SECRET
});
const app = express();
connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/movie', routerMovie);
app.use('/cinema', routerCinema);
app.use('/user', routerUser);

app.listen(PORT, () => console.log(`Listening on: http://localhost:${PORT}`));