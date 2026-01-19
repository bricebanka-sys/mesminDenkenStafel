

import { Link } from "react-router";
import { PenSquareIcon, SquarePen, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";
import toast from "react-hot-toast";
import { api } from "../lib/axios";


const NoteCard = ({ note, setNotes }) => {

  const handleDelete = async (e, id) => {

    // Empêche la redirection vers la page de détails
    e.preventDefault();

    // Confirmation utilisateur
    if (!window.confirm("Sind Sie sicher, dass Sie diese Notiz löschen möchten? ?")) {
      return;
    }

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Notiz erfolgreich gelöscht");

      // Mise à jour de l'interface (Filtrage de l'état local)
      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Fehler beim Löschen :", error);
      toast.error("Notiz kann nicht gelöscht werden");
    }

  }


  return (
    <Link to={`/note/${note._id}`} className="card bg-base-100 border border-base-content/10 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-t-primary">
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">{formatDate(note.createdAt)}</span>
          <div className="flex items-center gap-1">
              <PenSquareIcon className="size-4" />
             <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, note._id)}>
                <Trash2Icon className="size-4" />
             </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;