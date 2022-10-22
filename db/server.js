const mongoose = require('mongoose');


mongoose.connect(process.env.db,{useNewUrlParser:true})
.then(() => {
    console.log("Database is connected successfully");
})
.catch((err) => {
    console.log(err);
})