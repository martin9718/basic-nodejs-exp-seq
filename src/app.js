const express = require('express');
const app = express();
const path = require('path');
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



//ROUTES
app.use(require('./routes/User'));


//Enable public folder
app.use(express.static(path.resolve(__dirname, 'public')));


app.listen(process.env.PORT, () => {
    console.log('Listening to the port', process.env.PORT);
});