import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Layout from './components/Layout/Layout';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';
import Page_Authentification from './pages/Page_authentification/Page_authentification.jsx';
import Admin from './pages/admin/admin.jsx';
import MoviePage from './pages/MoviePage/MoviePage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="users" element={<Users />} />
        <Route path="about" element={<About />} />
        <Route
          path="Page_Authentification"
          element={<Page_Authentification />}
        />
        <Route path="Admin" element={<Admin />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
