import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { UserModel } from '../models/user';
import nodemailer from 'nodemailer';

const userRouter = Router();

userRouter.get('/findAll',asyncHandler(async (req, res) => {
      const users = await UserModel.find();
      res.send(users);
    })
);

userRouter.get('/:userId',asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.params.userId);
    res.send(user);
  })
);

userRouter.put('/:id',asyncHandler(async(req,res) => {
  const id = req.params.id
  const user = await UserModel.findByIdAndUpdate(id, req.body)  
   res.send(user)
  })
);

userRouter.delete('/:id',asyncHandler(async(req,res) => {
  const id = req.params.id
  const user = await UserModel.findByIdAndDelete(id);  
   res.send(user)
}));

userRouter.post('/envioCorreo',asyncHandler(async(req,res) => {

  let body = req.body;

  let config = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    }
  });

  const opciones = {
    from: process.env.MAIL_USERNAME, // sender address
    to: body.email,
    subject: body.asunto,
    text: body.mensaje
  };

  config.sendMail(opciones,function(error,result) {

    if (error) return res.json({ok:false,msg:error});
    return res.json({
      ok: true,
      msg: result
    })
  })
    
}));

export default userRouter;