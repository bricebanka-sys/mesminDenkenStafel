
import ratelimit from "../config/upstash.js";



const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("global_limit"); // Ici, on limite globalement
    if (!success) {
      return res.status(429).json({ message: "Zu viele Anfragen. Versuchen Sie es später erneut." });
    }
    next();
  } catch (error) {
    next(); // En cas d'erreur Upstash, on laisse passer pour ne pas bloquer l'app
  }
};



export default rateLimiter;