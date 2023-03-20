const express = require('express');
const {connect} = require('./src/utils/database');
const routerMovie = require('./src/api/routes/movie.routes');
const routerCinema = require('./src/api/routes/cinema.routes');
const PORT = 5000;

const app = express();
connect();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/movie', routerMovie);
app.use('/cinema', routerCinema);

app.listen(PORT, () => console.log(`Listening on: http://localhost:${PORT}`));