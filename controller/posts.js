const express = require("express");
const User = require("../model/userModel");
const usersPost = require("../model/postModel");
const app = express();
app.use(express.json());

//create post
exports.createPost = async (req, res) => {
    try {
        var userDetails = await User.findOne({ _id: req.user.ID });
        if (userDetails) {
            const postData = {
                UserId: userDetails["_id"],
                Title: req.body.Title,
                Blog: req.body.Blog,
            };

            let data = new usersPost(postData);
            await data.save();

            return res.status(201).send({
                message: "Post created successfully...."
            });

        } else {
            return res.status(530).send({
                message: "user not Authorization"
            });
        }
    }
    catch (err) {
        res.send(err)
    };
};

//Delete post

exports.deletePost = async (req, res) => {

    try {
        var user = await User.findOne({ _id: req.user.ID });
        var userPost = await usersPost.findOne({ _id: req.params.id });

        if (userPost["UserId"] == req.user.ID) {
            usersPost.deleteOne(userPost, function (err, result) {
                if (err) throw err;
                if (result != 0) {
                    console.log("done")
                    return res.status(200).send({
                        message: "Your Post Has Deleted.."
                    });
                }
                else {
                    return res.status(204).
                        send({
                            message: "document has not deleted"
                        });
                };
            });
        }
        else {

            return res.status(530).send({
                message: "Only Post Admin Can Delete The Post"
            });
        };
    }
    catch (err) {
        res.status(400).send({
            message: "soething went wrong",
            error: err
        });
    };
};

//edit post
exports.editPost = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.user.ID });

        let editPost = await usersPost.findOne({ _id: req.params.id });

        if (editPost["UserId"] == req.user.ID) {

            const payload =
            {
                Blog: req.body.Blog,
            }

            const options = { "upsert": false };

            usersPost.updateOne(editPost, payload, options)
                .then(result => {
                    res.send({
                        message: "Your Post has edited",
                        result: result
                    })
                })
                .catch((err) => {
                    res.send({
                        message: "There is issue while edit your post",
                        error: err.message
                    })
                })

            return res.status(200).send({
                message: "success",
                data: userData
            });
        }
        else {
            return res.status(530).send({
                message: "Only Poswt Admin Can Edit The Post"
            });
        };
    }
    catch (err) {
        console.log(err)
    };
};

//see the list of all post 
exports.postList = async (req, res) => {
    try {
        await usersPost.find({ _id: req.params.id }).populate("UserId").exec((err, result) => {
            if (err) {

                return res.send("data is not there");
            }
            else {
                return res.send(result);
            };
        });
    }
    catch (err) {
        console.log(err)
    };
}