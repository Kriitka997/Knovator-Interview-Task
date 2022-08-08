const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const User = require("../model/userModel");
const app = express();
app.use(cookie())
app.use(express.json());

exports.login = async (req, res) => {
    try {
        var userDetails = await User.findOne({ user_email: req.body.user_email });

        if (userDetails) {
            bcrypt.compare(req.body.user_password, userDetails["user_password"], (err, data) => {

                if (data) {

                    var token = jwt.sign({ Email: userDetails["user_email"], ID: userDetails["_id"] }, "loginToken", {

                        expiresIn: '365d'
                    });
                    return res.status(200).cookie("token", token).send({
                        message: "you login successfully....",
                        cookie: token,
                        user_role: userDetails["role"]
                    });

                } else {
                    return res.status(563).send
                        ({ message: "Password dosen't matched..." });
                };
            });
        } else {
            return res.status(530).send({
                message: "This Email is not exits",
            });
        };
    }
    catch (error) {
        return res.status(401).send({
            message: "something went wrong...."
        });
    };
};