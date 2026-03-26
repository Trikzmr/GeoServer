const mongoose = require('mongoose');

const DB = "mongodb+srv://singhaman2321:N1EZgEd1b6GZvHMj@cluster0.4tsj5xz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(DB, {})
.then(() =>{
    console.log("connection successfull")
})
.catch((err) => {  
    console.log("no connection"); 
    console.log(err);
});