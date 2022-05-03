const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error")
const cookieParser =require('cookie-parser');
const bodyParser  =  require("body-parser");
const fileUpload  = require("express-fileupload");
const path = require("path");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}


app.use(express.json({limit: "50mb"}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));
app.use(fileUpload());

// routes
const post = require("./routes/post");
const user = require("./routes/user");

app.use("/api/v1" , post);
app.use("/api/v1" , user);



app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


//Error Middleware
app.use(errorMiddleware);

module.exports = app;