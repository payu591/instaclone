const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        PostType: {
            type: String,
            required: [true, "Post type must be mentioned."]
        },
        Comment: {
            type: [ObjectId],
            ref: "Comment"
        },
        Caption: {
            type: String,
        },
        PostPath: {
            type: String,
            required: [true, "Post path must be mentioned."]
        },
        TaggedUser:{
            type: [ObjectId],
            ref: "User"
        },
        UserId: {
            type: ObjectId,
            ref: "User",
            required: [true, "Please mention user. "]
        },
        LikedByUsers: {
            type: [ObjectId],
            ref: "User"
        },
        TotalLikes: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }  
);

const virtualId = postSchema.virtual('id');
virtualId.get(function () {
    return this._id;
})

postSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})


module.exports = mongoose.model("Post", postSchema)