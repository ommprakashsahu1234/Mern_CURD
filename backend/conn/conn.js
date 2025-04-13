const mongoose = require('mongoose')

const conn  = mongoose.connect(process.env.MongoDB_URI).then(() => {
  console.log("Database Connected.");
}).catch((err)=>{
    console.log('No Connection')
})

module.exports = conn
