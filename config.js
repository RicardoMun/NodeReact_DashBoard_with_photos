require("dotenv").config();

module.exports = {
    API_VERSION: "v1",
    DB_USER: process.env.DB_USER,
    PASSWORD: process.env.PASSWORD,
    DB_CLUSTER: process.env.DB_CLUSTER,
    DB_PORT: process.env.DB_PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
}