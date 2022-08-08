const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const authHeader = req.headers["Authorization"] || req.headers["authorization"];
    if (authHeader) {
        sliceToken = authHeader.slice(13, authHeader.length - 9)
        jwt.verify(sliceToken, "loginToken", (err, user) => {
            if (err) {
                console.log(err.message)
                res.status(404).send({
                    message: "Sorry! You are not able to do this before login.."
                })
            }
            else {
                req.user = user;
                next()
            };
        });
    } else {
        return res.status(530).send("User Not Recognized...");
    };
};