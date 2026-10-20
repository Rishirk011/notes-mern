import notesModel from "../models/notesModel.js";
import asyncHandler from "express-async-handler";

export const categories = (asyncHandler(async (req,res) => {

    const category = await notesModel.aggregate([
        { $match : {user: req.user._id }},
        { $group : {_id : '$category' }},
        { $sort : { _id: -1 }}
    ]);

    res.status(200).json(category);

}))