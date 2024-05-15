const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
    {
        ChatId: {
            type: String,
        },
        SenderUserId: {
            type: ObjectId,
            ref: "User"
        },
        ReceiverUserId: {
            type: ObjectId,
            ref: "User"
        },
        ContentMessage: {
            type: String,
        },
        ContentType: {
            type: String,
        },
    },
    {
        timestamps: true,
    }  
);

module.exports = mongoose.model("Chat", chatSchema)