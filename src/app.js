const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
//Database
require("./database/db");
//Associations DB
require("./database/associations");


require('./config/config');

//Data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// CORS
// Headers and CORS connfigurations
app.options('*', cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



//ROUTES
app.use(require('./routes/User'));


//Enable public folder
app.use(express.static(path.resolve(__dirname, 'public')));


app.listen(process.env.PORT, () => {
    console.log('Listening to the port', process.env.PORT);
});