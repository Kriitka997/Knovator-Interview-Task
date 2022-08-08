const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const saltRounds = 10;
const app = express();
app.use(express.json());

exports.signUp = async (req, res) => {
    try {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.user_email)) {
            User.findOne({ user_email: req.body.user_email }).exec(async (err, user) => {
                if (user) {
                    return res.status(401).send({ status: "error", message: "User is already exits with this email address", error: err })
                };
                if (req.body.user_password.match(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,12})"))) {
                    if (req.body.user_password.length >= 8 && req.body.user_password.length <= 12) {
                        if (req.body.user_password === req.body.confirm_password) {
                            var Payload = {
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                user_email: req.body.user_email,
                                user_password: await bcrypt.hash(req.body.user_password, saltRounds),
                            };

                            let userModel = new User(Payload);
                            await userModel.save()
                            return res.status(201).send({
                                message: "Your account has created.....",
                            });

                        } else {
                            return res.status(401).send({
                                message: "confirm password is not matched....."
                            });
                        };

                    } else {
                        console.log("special")
                        return res.status(401).send({
                            message: "password length should be minimum 8 or maximum 12"
                        })
                    }


                } else {
                    console.log("special")
                    return res.status(401).send({
                        message: "password should have([@,#,$,&],[0-9],[A-z].....)"
                    })
                };

            });
        }
        else {
            return res.status(401).send({
                message: "this email address is not valid...."
            });
        };
    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
};