const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    name : { type: String, required: true },
    username: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

const User = mongoose.model("user", userSchema)

module.exports = User