const express = require('express');
const Router = express.Router();
const fetchUser = require('../middleWare/fetchUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//Route 1 - Fetch all the notes of user using : GET "/api/notes/fetchAllNotes" login required
Router.get('/fetchAllNotes',fetchUser,async (req,res)=>{
    try {
        const notes = await Note.find({user : req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Opps something went wrong internally!!");
    }
    
})

//Route 2 - Add a new notes using : POST "/api/notes/addNotes" login required
Router.post('/addNotes',fetchUser,[
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('description','description should be atleast minimum 5 charachters').isLength({ min: 5 }),
],async (req,res)=>{
    try {
            const{title,description,tag} = req.body;
            //Return a bad request and error if the entered field is not valid
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({
                title,description,tag, user : req.user.id
            });
            const savedNotes = await note.save();

            res.json(savedNotes);
        } 
    catch (error) {
    console.error(error.message);
    res.status(500).send("Opps something went wrong internally!!");   
    }
})

//Route 3 - Update an existing notes using : POST "/api/notes/updateNotes" login required
Router.put('/updateNotes/:id',fetchUser,async (req,res)=>{
    const {title, description,tag} = req.body;

    try {
    
    //Create a new note object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not Allowed")}

    if(note.user.toString() !== req.user.id){
        res.status(401).send("Unauthorized Access")
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote},{new : true})
    res.json({note});
        
} catch (error) {
    console.error(error.message);
    res.status(500).send("Opps something went wrong internally!!");     
}
})

//Route 4 - Delete an existing notes using : delete "/api/notes/deleteNotes" login required
Router.delete('/deleteNotes/:id',fetchUser,async (req,res)=>{
    
    try {
    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not Allowed")}

    if(note.user.toString() !== req.user.id){
        res.status(401).send("Unauthorized Access")
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success" : "Note is been deleted successfully",note : note});

} 
catch (error) {
    console.error(error.message);
    res.status(500).send("Opps something went wrong internally!!");      
}
})


module.exports = Router