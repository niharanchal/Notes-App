const mongoose=require("mongoose")
const user1schema = require("../schema/schema")


const user=mongoose.model("user",user1schema)

module.exports=user