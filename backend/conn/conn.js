const mongoose = require('mongoose')

const conn  = mongoose.connect("mongodb+srv://autophile07:opsomm@cluster0.qnhj4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
  console.log("Database Connected.");
}).catch((err)=>{
    console.log('No Connection')
})

module.exports = conn