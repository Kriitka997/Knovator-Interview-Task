const mongoose = require('mongoose');

const connection = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const uri = "mongodb+srv://kritika997:KritikaP1997@cluster0.ysgo71k.mongodb.net/BlogAppPost?retryWrites=true&w=majority";


const connect = mongoose.connect(uri, connection).then(() => {
    console.log("Database connected ");
}).catch((err) => {
    console.log("Database not connected ");
    console.log(err);
})

module.exports = connect;