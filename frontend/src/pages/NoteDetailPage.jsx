import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { api } from "../lib/axios";
import { toast } from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import { Trash2Icon } from "lucide-react";


const NoteDetailPage = () => {


  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // État spécifique pour la sauvegarde

  const navigate = useNavigate();

  const { id } = useParams();
  


  useEffect(() => {
    const fetchNode = async () => {

      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Die Notiz kann nicht wiederhergestellt werden.");
        console.error("Fehler beim Abrufen :", error);
      } finally {
        setLoading(false);
      }  
    };
    fetchNode();

  }, [id]);


  const handleDelete = async () => {
    if (!window.confirm("Möchten Sie diesen Eintrag wirklich löschen? ?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note gelöscht.");
      navigate("/");
    } catch (error) {
      console.error("Fehler beim Löschen :", error);
      toast.error("Löschen fehlgeschlagen.");
    }
  };


  const handleSave = async () => {
    // Validation côté client
    if (!note.title.trim() || !note.content.trim()) {
      return toast.error("Titel und Inhalt sind erforderlich.");
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Notiz erfolgreich aktualisiert !");
      navigate("/"); // Redirection après succès
    } catch (error) {
      console.error("Fehler beim Aktualisieren :", error);
      toast.error("Fehler beim Aktualisieren.");
    } finally {
      setSaving(false);
    }
  };


  if (loading) {  
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">       
        <div className="max-w-2xl mx-auto">
          <div className='flex items-center justify-between mb-6'>
            <Link to="/" className="btn btn-ghost flex items-center gap-2">
              <ArrowLeftIcon className="h-5 w-5" />
              Zurück zu den Notizen
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Note Löschen
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Titel der Notiz"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Schreib deine Notizen hier..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>
              <div className="form-control mt-6">
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" disabled={saving} onClick={handleSave}> {saving ? "Speichern..." : "Änderungen Speichern"}</button>
                </div>
              </div>
            </div>
          </div>


        </div>      
      </div>
    </div>
  );
};

export default NoteDetailPage;
