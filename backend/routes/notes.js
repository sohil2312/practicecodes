const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const request = require('request');
const { default: mongoose } = require("mongoose");


const app = express();

//fetchnotes
router.get("/fetchnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});
//adnotes
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("discription", "Enter valid dicsription").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, discription, tag } = req.body;
      const errors = validationResult(req);
      console.log('adding note')
      //if errors available return bad request
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        discription,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
           console.error(error.message);
              
    }
  }
);
//updatenote
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const {title, discription,tag }= req.body;
  const newNote ={}
  if(title){newNote.title= title}
  if(discription){newNote.discription=discription}
  if(tag){newNote.tag=tag}
  let note = await Notes.findById(req.params.id);
  if(!note){
    return res.status(400).send("not found")
  }
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("not allowed")
  }
  note = await Notes.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id.trim()),{$set:newNote},{new:true})
  res.json({note})
});
//deletenote
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
 try {
  
 
  let note = await Notes.findById(req.params.id);
  if(!note){
    return res.status(400).send("not found")
  }
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("not allowed")
  }
  note = await Notes.findByIdAndDelete(req.params.id)
  res.json("deleted successfully" );
} catch (error) {
  res.status(500).send("some error occured");
} 
});
module.exports = router;
