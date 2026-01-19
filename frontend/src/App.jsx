import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';
import Footer from './components/Footer';




const App = () => {
  return (

    <div className="relative h-full w-full" data-theme="halloween">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        {/* ":id" est un paramètre dynamique */}
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
