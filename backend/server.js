const app = require("./app");
const connectDatabase = require("./config/database");


if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}

const cloudinary = require("cloudinary");


connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
  


app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})