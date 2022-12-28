import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username:String,
    cart_info: Object,
    email: String,
    password: String,
})



const User = mongoose.model('User',userSchema)
export default User