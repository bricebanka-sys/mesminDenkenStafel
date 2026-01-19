import express from 'express';


import { getAllNotes, createNote, updateNote, deleteNote, getNoteById } from '../controllers/notesController.js';

const router = express.Router();

// Notez qu'on ne met plus "/api/notes" ici, car c'est défini globalement
router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);



export default router;