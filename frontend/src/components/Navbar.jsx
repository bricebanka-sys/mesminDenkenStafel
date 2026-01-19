import { Link } from "react-router";

import { PlusIcon, NotebookPen } from "lucide-react";



const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">Mesmin-DenkenStafel</h1>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/create" className="btn btn-primary">
            <PlusIcon className="size-5" />
            <span>Neue Notiz</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;