import User from '../Models/userModel.js'
import Courses from '../Models/coursesModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const addUser = async (req,res) => {

    const email = req.body.email
    const password = req.body.password

    try{

        if(await User.findOne({email:email})){
            return res.status(409).json({message:"Something Went Wrong"})
        }

        const hashPassword = await bcrypt.hash(password,12)

        await User.create({...req.body,password:hashPassword})

        // const token = jwt.sign({email:newUser.email,id:newUser._id}, "secret_key", {expiresIn:"15m"})
        const user = await User.findOne({email:email},{password:0})
        return res.status(201).json({result:user})    
    }
    catch(error){
        return res.status(500).json({message:"Something Went Wrong"})
    }

}


export const verifyUser = async(req,res) => {

    const {email,password} = {...req.body}
    
    try{
        
        let user = await User.findOne({email:email})
        if(!user){ return res.status(404).json({message:"User Not Found"})}

        const isValidPassword = bcrypt.compare(password,user.password)
        if(!isValidPassword){ return res.status(404).json({message:"Password Does Not Match"})}

        user = await User.findOne({email:email},{password:0})
        return res.status(200).json({result:user})

    }
    catch{
        return res.status(500).json({message:"Something Went Wrong"})
    }

}



export const updateCart = async (req,res)=>{

    const email = req.body.email
    const price = req.body.price
    const course = req.body.cname
    const _id = req.body._id
    const courseInfo = {_id : _id, course : course, price: price}
    
    
    try{

        await User.findOneAndUpdate({ "email" : email},{
            $push: { "cart_info.enrolled_courses" : { $each : [courseInfo] , $position : 0}},
            $inc: { "cart_info.total_price" : price},
        })

        
        const userInfo = await User.findOne({email:email},{password:0})
        res.status(200).json({message:userInfo})
    }
    catch(err){
        res.status(400).json({message:err})
    }

}


export const getUserInfo = async(req,res)=>{
    
    const email =  req.params.email

    try{
        const userInfo = await User.findOne({email:email},{password:0})
        res.status(200).json({message:userInfo})
    }
    catch(err){
        res.status(400).json({message:err})
    }

}



