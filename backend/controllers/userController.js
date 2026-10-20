import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";


export const registerUser = (asyncHandler(async (req,res) => {

    const {name,email,password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("invalid credentials");
    }

    const existsUser = await userModel.findOne({email});

    if(existsUser){
        res.status(400);
        throw new Error("user already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const user = await userModel.create({
        name,
        email,
        password:hash
    });

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        });
    }
    else{
        res.status(400);
        throw new Error("invalid user data");
    }


}));

export const loginUser = (asyncHandler(async (req,res) => {

    const {email,password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("invalid credentials");
    }

    const user = await userModel.findOne({email});

    if(user && (await bcrypt.compare(password,user.password))){
        
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        });

    }
    else{
        res.status(401);
        throw new Error("invalid credentials");
    }

}))

export const getProfile = async (req,res) => {

    return res.status(200).json(req.user);

}

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}