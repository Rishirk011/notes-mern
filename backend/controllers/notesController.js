import asyncHandler from 'express-async-handler';
import notesModel from '../models/notesModel.js';

export const getNotes = (asyncHandler(async (req,res) => {
    
    const notes = await notesModel.find({user:req.user.id});

    res.status(200).json(notes);
    
}))

export const addNote = (asyncHandler(async (req,res) => {

    const {title,body,category,images,isPinned} = req.body;

    if(!req.user.id){
        res.status(401);
        throw new Error("unauthorized access");
    }

    const note = await notesModel.create({
        user:req.user._id, title, body, category, images, isPinned
    });

    res.status(201).json(note);

}));

export const updateNote = (asyncHandler (async (req,res) => {
    
    if(!req.body || Object.keys(req.body).length === 0){
        res.status(400);
        throw new Error("invalid request body");
    }

    const id = req.params.id;
    const note = await notesModel.findById(id);

    if(!note){
        res.status(404);
        throw new Error("404, not found");
    }

    if(note.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("401, unauthorized access");
    }

    const updatedNote = await notesModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true, runValidators:true}
    );

    res.status(200).json(updatedNote)

}));

export const deleteNote = (asyncHandler (async (req,res) => {
    
    const id = req.params.id;
    const note = await notesModel.findById(id);

    if(!note){
        res.status(404);
        throw new Error("404, not found");
    }

    if(note.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("unauthorized access");
    }

    await notesModel.findByIdAndDelete(id);
    res.status(200).json({id});
    
}))


