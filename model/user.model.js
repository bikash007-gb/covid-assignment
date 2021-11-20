const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    adharCardNumber: {
        type: String,
        required: [true, "Please enter the Adhar card number"],
        unique: true,
        maxlength: 12,
        minlength: 12,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        enum: ["Maharashtra", "Gujrat"],
        required: [true, "Please add a location"],
    },
    createdAt: {
        type: Number,
        default: Date.now(),
    },
})

const User = mongoose.model("User", UserSchema)
module.exports = User
