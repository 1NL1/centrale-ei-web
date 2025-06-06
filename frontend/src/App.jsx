import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Layout from './components/Layout/Layout';
import Users from './pages/Users/Users';
import Page_Authentification from './pages/Page_authentification/Page_authentification.jsx';
import Admin from './pages/admin/admin.jsx';
import MoviePage from './pages/MoviePage/MoviePage';
import OnRatingPage from './pages/debut/debut.jsx';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/about" element={<About />} />
        <Route path="/Page_Authentification" element={<Page_Authentification />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/newuser" element={<OnRatingPage />} /> {/* ✅ Ici maintenant */}
      </Routes>
    </Layout>
  );
}

export default App;
