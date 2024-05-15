const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
        UserName: {
            type: String,
            required: [true, " Please add your username. "],
        },
        FirstName: {
            type: String,
            required: [true, " Please add your Firstname. "],
        },
        LastName: {
            type: String,
            required: [true, " Please add your Lastname. "],
        },
        ProfilePhoto: {
            type: String,
        },
        Gender: {
            type: String,
            required: [true, " Please add mention your Gender. "]
        },
        Bio: {
            type: String
        },
        DoB: {
            type: Date,
            required: [true, " Please add your birthdate. "]
        },
        Email: {
            type: String,
            required: [true, " Please add your email. "],
            unique: [true,"Email address already taken. "]
        },
        Password: {
            type: Buffer,
            required: [true, " Please add your password. "]
        },
        AccType: {
            type: String,
            
        },
        AllPost:{
            type: [ObjectId],
            ref: "Post"
        },
        FollowingUser:{
            type : [mongoose.Schema.Types.ObjectId],
            ref : "User",
        },
        BlockedUser:{
            type : [mongoose.Schema.Types.ObjectId],
            ref : "User",
        },
        FollowersUser :{
            type : [mongoose.Schema.Types.ObjectId],
            ref : "User",
        },
        Tagged: {
            type: [ObjectId],
            ref: "Post"
        },
        Request : {
            type: [ObjectId],
            ref: "Request"
        },
        SavedUser: {
            type: [ObjectId],
            ref: "User"
        },
        IsCurrentstory :{
            type: Boolean
        },
        Story: {
            type: [ObjectId],
            ref: "Story"
        },
        ArchiveStory:{
            type: [ObjectId],
            ref: "Story"
        },
        salt: Buffer
    },
    {
        timestamps: true,
    }
);

const virtualId = userSchema.virtual('id');
virtualId.get(function () {
    return this._id;
})

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

module.exports = mongoose.model("User", userSchema)
