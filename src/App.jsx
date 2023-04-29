import Navbar from './Component/Navbar';
import './App.css';
import Banner from './Component/Banner';
import MovieList from './Component/MovieList';
import Fav from './Component/Fav';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import MoviePage from './Component/MoviePage';
// import FavPage from './Component/FavPage';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route
           path="/" exact element={<MoviePage/>}/>
        
        <Route
          path="/fav"
          element={<Fav/>}
        />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
