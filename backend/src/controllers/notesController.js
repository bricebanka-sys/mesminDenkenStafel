
import Note from "../models/Note.js";



export const getAllNotes = async (_req, res) => {
    
    try{
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);

    } catch(error){
        console.error("Fehler beim Abrufen der Notizen:", error);
        res.status(500).json({ message: "Interner Serverfehler" });
    }

};


// Juste pour récupérer une note par son ID

export const getNoteById = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Notiz nicht gefunden" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Fehler beim Abrufen der Notiz:", error);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
};



export const createNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        const newNote = new Note({ title, content });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Erstellen" });
    }
};



export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: "Notiz nicht gefunden" });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Aktualisieren" });
    }
};



export const deleteNote = async (req, res) => {
    const { id } = req.params;

    try{
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Notiz nicht gefunden" });
        }
        res.status(200).json({ message: "Notizen erfolgreich gelöscht !" });
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Löschen" });
    }
};

