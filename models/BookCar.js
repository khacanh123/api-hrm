import mongoose, { Schema } from "mongoose";

const bookCarSchema = new Schema({
    textLogo: String,
    listCustomer: [],
    listbookCar: [],
    carHot: [],
    address: [],
    telephone: String,
    email: String
});

const bookCar = mongoose.model('bookcars', bookCarSchema);
export default bookCar;