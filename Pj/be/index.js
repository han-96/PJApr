require("dotenv").config();
const express = require('express');
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./api")

require("./repositories")

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(router)

app.get('/',(req,res)=>{
    res.send("hello from node js server!")
})

app.get('/1/:id',(req,res)=>{
    res.send(req.params.id)
})

const PORT = 7000; 
app.use('/static', express.static(path.join(__dirname, "static")))
app.listen(PORT, () => {
    console.log("App is running at " + PORT)
})