import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes.js';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';



// Connection string for MongoDB Atlas:

//mongodb+srv://nfonzongmesmin_db_user:oc1bcEg4sIAHz3cn@cluster0.qlhpiz4.mongodb.net/notes_db?appName=Cluster0


//oc1bcEg4sIAHz3cn

// nfonzongmesmin_db_user
// IP address (87.163.104.59)

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();


app.use(cors({
  origin: "http://localhost:5173", // L'URL de votre Frontend
}));

// Middleware pour parser le JSON dans les requêtes entrantes
app.use(express.json());
// Appliquer le middleware de limitation de débit à toutes les requêtes
app.use(rateLimiter);


// // Middleware personnalisé pour logger chaque requête entrante
// app.use((req, res, next) => {
//     console.log(`Neue Anfrage : [${req.method}] ${req.url}`);
//     next(); // Très important : passe à la fonction suivante
// });


// On utilise les routes définies dans notesRoutes.js pour tout ce qui commence par /api/notes
app.use("/api/notes", notesRoutes);



// Bereitstellung der Frontend-Builds im Produktionsmodus

const __dirname = path.resolve();

// Configuration spécifique à la Production
if (process.env.NODE_ENV === "production") {
  // Définir le dossier 'dist' du frontend comme dossier statique
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Pour toute route qui n'est pas une API, renvoyer l'index.html du frontend
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
} else {
  // En développement, on active le CORS car les domaines sont différents
  app.use(cors());
}
// Démarrer le serveur.





connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server gestartet auf Port: ${PORT}`);
    });
}).catch(err => {
    console.error("Fehler bei der Verbindung zur MongoDB-Datenbank", err);
});
