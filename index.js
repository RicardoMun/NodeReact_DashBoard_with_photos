const mongoose = require("mongoose");
const app = require("./app")

const {
    DB_PORT,
    DB_USER,
    PASSWORD,
    DB_CLUSTER,
} = require("./config");


const URI = `mongodb+srv://${DB_USER}:${PASSWORD}@${DB_CLUSTER}/?retryWrites=true&w=majority`;

async function connectToDatabase() {
    try{
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection to database successful");
        app.listen(DB_PORT, () => {
            console.log("API RESTful running on port: ", DB_PORT);
        });
    }catch(error){
        console.log(error);
    }
};

connectToDatabase().catch(console.error);
/* createUploadsDir(); */