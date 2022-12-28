import express from 'express'
import {addUser,verifyUser,updateCart,getUserInfo} from '../controllers/user.js'

const user = express.Router();

user.post('/',addUser)
user.post('/verify',verifyUser)
user.patch('/',updateCart)
user.get('/:email',getUserInfo)

export default user