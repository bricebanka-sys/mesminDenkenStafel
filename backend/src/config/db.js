import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB erfolgreich Verbunden !");
    } catch (error) { 
        console.error(`Verbindungsfehler : ${error.message}`);
        process.exit(1); // 1 signifie arrêt suite à un échec
    }
};