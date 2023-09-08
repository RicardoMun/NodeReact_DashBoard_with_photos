const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
    country: { type: String },
    state: { type: String },
    city: { type: String },
    nomenclature: { type: String }
});

module.exports = mongoose.model("Address", AddressSchema);