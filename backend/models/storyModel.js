const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const storySchema = mongoose.Schema(
    {
        User:{
            type: ObjectId,
            ref: "User",
        },
        // CurentStory: {
        //     type: String
        // },
        CurentStoryType : {
            type: String,
        },
        StoryPath: {
            type: String,
        },
    },
    {
        timestamps: true,
    }  
);

module.exports = mongoose.model("Story", storySchema)
