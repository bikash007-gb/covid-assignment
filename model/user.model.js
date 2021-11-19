const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    adharCardNumber: {
        type: String,
        required: [true, "Please add a adhar card number"],
        unique: true,
    },
    ipAddress: {
        type: String,
        required: [true, "Please add a adhar card number"],
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
