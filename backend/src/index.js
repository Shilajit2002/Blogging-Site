// Import dot-env file
require('dotenv').config({ path: '../.env' });
// Connect Database
require("./Database/db");

// Import express & cors
const express = require('express');
const cors = require('cors');

// Creating app from express
const app = express();

// Import User Routes
const Routes = require("./Routes/routes");

// Backend Port
const port = process.env.PORT || 8000;

// Origin is Frontend Server URL
const options = { origin: `${process.env.FRONTEND_SERVER}` };
// Attaching cors with Frontend Server URL
app.use(cors(options));

// Set up express middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API
app.use("/api/v1", Routes);

// Not Routing Pages
app.all("*", (req, res) => {
    return res.status(404).send("`~` Api Not Found `~`");
})

// Listening Port
app.listen(port, () => {
    console.log(`Blogging Server Running at ${port} PORT....`);
    console.log(`Backend Server URL : ${process.env.BACKEND_SERVER}`);
})