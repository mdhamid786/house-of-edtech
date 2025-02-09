

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fileupload = require('express-fileupload')
const errorMiddleware = require("./middleware/error")
const cors = require("cors")

// parse the body data in json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// routing api url set 


app.use(fileupload({
    useTempFiles:true
}))


app.use(cors())

const user = require("./routers/userRouter");

app.use("/users",user)



// middleware set 
app.use(errorMiddleware)

module.exports = app
