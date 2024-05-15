const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const getUserID = asyncHandler(async (req, res) => {
    const CurrUserId = req.user.id;
    try {
        res.status(200).json({CurrUserId});
    }
    catch(err){
        console.log(err);
        res.status(200).send(err);
    }
});

//@dec Get all users
//@route GET /api/user
//@acsess public 
const getUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(err){
        console.log(err);
    }
});

//@dec Create new user
//@route POST /api/user/createuser
//@acsess public 
const createUser = asyncHandler(async (req, res) => {
    try {
        console.log("The request body is : ", req.body);
        const { Email, Password } = req.body;

        if (!Email || !Password) {
            res.status(400).json({ messag: "All fields are required" });
        }

        const user = await User.create(req.body);

        res.status(201).json(user);

    } catch (error) {
        console.log(error);
    }

});

//@dec get a user
//@route GET /api/user/:id
//@acsess public
const getUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate(
            {
                path: 'AllPost',
                populate: {
                    path: 'Comment',
                    populate: {
                        path: 'CommentedBy'
                    }
                }
            }
        ).populate('Request');
        if (!user) {
            res.status(404);
            throw new Error("User not found.");
        }

        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(400).json({});
    }

});

//@dec update a user
//@route PUT /api/user/:id
//@acsess public
const updateUser = asyncHandler(async (req, res) => {
    const CurrUserId = req.user.id;
    try {
        const user = await User.findById(CurrUserId);

        console.log(user)
        if (!user) {
            res.status(404);
            throw new Error("User not found.");
        }

        const updateUser = await User.findByIdAndUpdate(
            CurrUserId,
            req.body,
            { new: true },
        )
        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
    }

});

//@dec delete a user
//@route DELETE /api/user/:id
//@acsess public
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error("User not found.");
        }

        await User.findByIdAndRemove(req.params.id,);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
});


//@dec search a user
//@route GET /api/user/search
//@acsess public 
const searchUser = asyncHandler(async (req, res) => {
    const { query } = req.query;

    try {
        const user = await User.find({
            $or: [
                { UserName: { $regex: query, $options: 'i' } },
                { Email: { $regex: query, $options: 'i' } },
                { FirstName: { $regex: query, $options: 'i' } },
                { LastName: { $regex: query, $options: 'i' } }
            ]
        })
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
})

module.exports = { getUsers, getUserID,createUser, getUser, updateUser, deleteUser, searchUser };