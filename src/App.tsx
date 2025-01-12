import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import HomePage from "./pages/home/HomePage";
import Layout from "./pages/layout/Layout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
