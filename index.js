const mongoose = require("mongoose");
const app = require("./app")

const {  DB_HOST, DB_USER, DB_PASS, DB_PORT, API_VERSION, IP_SERVER } = require("./config");

/*Local DB URI
const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_SERVER_IP}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority`;
*/
const DB_STRING = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/`;

async function connectToDatabase() {
    mongoose
    .connect(DB_STRING)
    .then( () => {
            console.log("Connected to MongoDB database");
            app.listen(DB_PORT, () => {
                console.log("Server running on: ");
                console.log(`IP_SERVER:\nhttp://${IP_SERVER}:${DB_PORT}/${API_VERSION}`)
            });
        }
    )
    .catch(
        (err) => {
            console.error(err)
        }
    )
};

connectToDatabase().catch(console.error);
/* createUploadsDir(); */