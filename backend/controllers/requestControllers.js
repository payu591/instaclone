const asyncHandler = require("express-async-handler");
const Request = require("../models/requestModel");
const mongoose = require('mongoose');
const User = require("../models/userModel");

//@dec Get all requests
//@route GET /api/request/
//@acsess public 
const getRequests = asyncHandler(async (req, res) => {
    const CurrUserId = req.user.id;
    const requests = await Request.find({ RequestReceiverUser: CurrUserId }).populate("RequestReceiverUser").populate("RequestSenderUser");//.sort(timestamps);
    res.status(200).json(requests);
});


//@dec Create new Request
//@route POST /api/request/createrequest/:ReceiverId
//@acsess public 
const createRequest = asyncHandler(async (req, res) => {
    const CurrUserId = req.user.id;
    try {
        console.log("The request body is : ", req.body);
        const { Msg } = req.body;
        console.log(CurrUserId);
        console.log(req.params.ReceiverId);

        const existingRequest = await Request.findOne({
            RequestSenderUser: CurrUserId,
            RequestReceiverUser: req.params.ReceiverId,
        });

        if (existingRequest) {
            res.status(403).json({msg:"request is already there."});
        }

        const request1 = await Request.create({
            RequestSenderUser: CurrUserId,
            RequestReceiverUser: req.params.ReceiverId,
            IsFollowback: false,
            StatusRequest: "Pending",
            Msg: Msg,
        });
        
        const user1 = await User.findByIdAndUpdate(req.params.ReceiverId,
            {
                $push: { Request: request1._id }, // 
            },
            { new: true }
        );
        res.status(201).json(request1);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error});
    }
});

//@dec update a request
//@route PUT /api/request/:UserId/:RequestId
//@acsess public
const updateRequest = asyncHandler(async (req, res) => {
    const CurrUserId = req.user.id;

    try {
        const currRequestId = new mongoose.Types.ObjectId(req.params.RequestId);
        const currRequest = await Request.findOne({
            _id: currRequestId,
            RequestReceiverUser: CurrUserId
        })
        console.log(currRequest);

        const user1 = currRequest.RequestSenderUser;
        const user2 = currRequest.RequestReceiverUser;

        // check if alternate request exits or not 
        const alternateRequest = await Request.findOne({
            RequestSenderUser: user2,
            RequestReceiverUser: user1
        });

        let updateCurrentRequest = null;
        if (req.body.StatusRequest == "Accepted") //if it is requeset accepted then do this
        {
            if (alternateRequest) {
                const updateAlternanteId = alternateRequest._id;
                const updateValues = {
                    StatusRequest: "Accepted",
                    IsFollowback: true,
                }
                let updateCurrentRequest = await Request.findByIdAndUpdate(currRequestId, { ...updateValues, Msg: `${user1} starts follow You` });

                const updateAlternanteRequest = await Request.findByIdAndUpdate(updateAlternanteId, { ...updateValues, Msg: `${user2} starts follow You` });
            }
            else {
                const updateValues = {
                    StatusRequest: "Accepted",
                    Msg: `${user1} starts follow You`,
                    IsFollowback: false,
                }
                let updateCurrentRequest = await Request.findByIdAndUpdate(currRequestId, updateValues);
            }

            const updateUser1 = await User.findOneAndUpdate(user1,
                {
                    $push: { FollowingUser: user2 }
                },
                { new: true }
            );

            const updateUser2 = await User.findOneAndUpdate(user2,
                {
                    $push: { FollowersUser: user1 }
                },
                { new: true }
            );

            res.status(200).json(updateCurrentRequest);
        }
        else {
            const request1 = await Request.findById(req.params.RequestId);
            if (!request1) {
                res.status(400).json({ msg: "Request not found." });
            }
            let updateCurrentRequest = await Request.findByIdAndRemove(req.params.RequestId);
            res.status(200).json(updateCurrentRequest);
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message });
    }
});

const handleFollowRequest = asyncHandler(async (req, res) => {
    const CurrUserId = req.user.id;
    try {
        // console.log("The request body is : ", req.body);
        const { Msg } = req.body;
        // console.log(CurrUserId);
        // console.log(req.params.ReceiverId);

        const alternateRequest = await Request.findOne({
            RequestSenderUser: req.params.ReceiverId,
            RequestReceiverUser: CurrUserId
        });
        console.log(alternateRequest);
        const updateValues = {
            IsFollowback: true
        }
        await Request.findByIdAndUpdate(alternateRequest._id, { ...updateValues });

        const request = await Request.create({
            RequestSenderUser: CurrUserId ,
            RequestReceiverUser: req.params.ReceiverId,
            IsFollowback: true,
            StatusRequest: "Pending",
            Msg: Msg,
        });
        
        const curruser = await User.findByIdAndUpdate(req.params.ReceiverId,
            {
                $push: { Request: request._id },  
            },
            { new: true }
        );
        res.status(201).json(request);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error});
    }
});

const handleUnFollowRequest = asyncHandler(async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error});
    }
});



module.exports = { getRequests, createRequest, updateRequest, handleFollowRequest };