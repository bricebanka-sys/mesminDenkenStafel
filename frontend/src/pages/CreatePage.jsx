
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";
import { api } from "../lib/axios";



const CreatePage = () => {


  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault(); // Empêche le rechargement de la page

    // Validation : on retire les espaces vides (trim)
    if (!title.trim() || !content.trim()) {
       toast.error("Alle Felder sind Pflichtfelder");
        return;
    }
    setLoading(true);


    try {
      await api.post("/notes", { title, content });
      toast.success("Notiz erfolgreich erstellt !");
      navigate("/"); // Redirection vers l'accueil
    } catch (error) {
    
      if (error.response?.status === 429) {
        toast.error("Langsam! Sie erstellen Notizen zu schnell.", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Erstellung fehlgeschlagen. Bitte versuchen Sie es später erneut.");
        console.error(error);
      }

    } finally {
      setLoading(false);
    }

  };
   


  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5"/>
            Zurück zu den Notizen
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Neue Notiz erstellen</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Titel</span>
                  </label>
                  <input type="text" placeholder="Titel der Notiz" className="input input-bordered" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Inhalt</span>
                  </label>
                  <textarea placeholder="Schreib deine Notizen hier..." className="textarea textarea-bordered h-32" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                </div>
                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Erstelle Notiz..." : "Notiz erstellen"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
