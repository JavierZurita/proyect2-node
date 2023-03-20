const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://root:root@cluster0.oaxtglw.mongodb.net/?retryWrites=true&w=majority";

const connect = async () => {
    try {
        
        const db = await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const {name, host} = db.connection;
        console.log(`Connected to ${name} DB in host: ${host}`);

    } catch (error) {
        console.log(`Failed to connect to database: ${error}`);
    }
}

module.exports = {connect};