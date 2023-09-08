const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    active: { type: Boolean },
    rol: { type: String },
    
});

module.exports = mongoose.model("Client", ClientSchema);