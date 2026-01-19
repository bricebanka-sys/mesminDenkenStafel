

import { Link } from "react-router";
import { SearchX, Plus } from "lucide-react";
import { NotebookIcon } from "lucide-react";


const NoteNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">Noch keine Notizen</h3>
      <p className="text-base-content/70">
        Bereit, Ihre Gedanken zu organisieren? Erstellen Sie Ihre erste Notiz, um mit Ihrer Reise zu beginnen.
      </p>
      <Link to="/create" className="btn btn-primary">
        Erstelle deine erste Notiz
      </Link>
    </div>
  );
};


export default NoteNotFound;