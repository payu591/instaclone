const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const requestSchema = mongoose.Schema(
    {
        RequestSenderUser: {
            type: ObjectId,
            ref: "User"
        },
        RequestReceiverUser: {
            type: ObjectId,
            ref: "User"
        },
        IsFollowback: {
            type: Boolean,
        },
        StatusRequest: {
            type: String,
        },
        Msg: {
            type: String,
        },
    },
    {
        timestamps: true,
    }  
);

const virtualId = requestSchema.virtual('id');
virtualId.get(function () {
    return this._id;
})

requestSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})


module.exports = mongoose.model("Request", requestSchema)