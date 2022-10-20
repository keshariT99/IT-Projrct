const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminpackageSchema = new Schema({
    package_id : {
        type : String,
        required: true
    },
    package_type: {
        type: String,
        required: true
    },
    package_name: {
        type: String,
        required: true
    },
    day_range: {
        type: String,
        required: true
    },
    price_range: {
        type: String,
        required: true
    },
    other_details: {
        type: String,
    },
   

})

//implementation of create model
const AdminPackage = mongoose.model("RequestPackage",adminpackageSchema);

module.exports = AdminPackage;