const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
    {
        CommentContent : {
            type: String,

        },
        CommentedBy: {
            type: ObjectId,
            ref: "User"
        },
    },
    {
        timestamps: true,
    }  
);

const virtualId = commentSchema.virtual('id');
virtualId.get(function () {
    return this._id;
})

commentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})


module.exports = mongoose.model("Comment", commentSchema)