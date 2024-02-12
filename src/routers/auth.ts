import {Router} from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User,UserModel } from '../models/user';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';

const authRouter = Router();

authRouter.post("/login", asyncHandler(
    async (req, res) => {
      const {email, password} = req.body;
      const user = await UserModel.findOne({email});
    
       if(user && (await bcrypt.compare(password,user.password))) {
        res.send(generateTokenReponse(user));
       }
       else{
         res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
       }
    
    }
  ));
    
  authRouter.post('/register', asyncHandler(async (req, res) => {
    const {avatar,name, email, password, address} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
      res.status(HTTP_BAD_REQUEST)
      .send('User is already exist, please login!');
      return;
    }
  
    const encryptedPassword = await bcrypt.hash(password, 10);
  
    const newUser : User = {
      id: '',
      avatar,
      name,
      address,
      email: email.toLowerCase(),
      password: encryptedPassword,
      city: '',
      phone: '',
      lat: 0,
      lng: 0
    }
  
    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenReponse(dbUser));
   
  }));
  
  const generateTokenReponse = (user : User) => {
    const token = jwt.sign({
      id: user.id, email:user.email
    },process.env.SECRET_JWT_SEED!,{
      expiresIn:"30d"
    });
  
    return {
      id: user.id,
      avatar: user.avatar,
      email: user.email,
      name: user.name,
      address: user.address,
      token: token
    };
  }
  export default authRouter;