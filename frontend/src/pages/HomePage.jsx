
import {useState, useEffect} from "react";
import NoteCard from "../components/NoteCard";
import { toast } from "react-hot-toast";
import RateLimitedUI from "../components/RateLimitedUI";
import Navbar from "../components/Navbar";
import api from "../lib/axios";
import NoteNotFound from "../components/NoteNotFound";








const HomePage = () => {

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);
  
  
  const getNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
      setIsRateLimited(false);
    } catch (error) {
      if (error.response?.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error("Fehler beim Abrufen der Notizen:", error);
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getNotes();
  }, []);

  if (isRateLimited) return <RateLimitedUI />;
  
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto p-4 mt-6">
        {loading ? (
          <div className="text-center text-primary py-10">Laden von Notizen...</div>
        ) : ( 
          <>
            {notes.length === 0 && !loading && !isRateLimited && (
              <NoteNotFound />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map(note => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          </>
        )}
      </main>
      
    </div>
  );
};


export default HomePage;
