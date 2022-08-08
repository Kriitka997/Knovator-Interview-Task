const express = require("express");
const userRegister = require("../controller/userRegister");
const userLogin = require("../controller/userLogin");
const route = express.Router();
const posts = require("../controller/posts");
const auth =  require("../middleware/auth");

route.post("/signup",userRegister.signUp);
route.post("/login", userLogin.login);
route.post("/createPost",auth,posts.createPost);
route.delete("/deletePost/:id",auth,posts.deletePost);
route.put("/editPost/:id",auth,posts.editPost);
route.get("/postList/:id",posts.postList);

module.exports = route;