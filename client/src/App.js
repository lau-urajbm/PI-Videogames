
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home.jsx';
import Detalle from './components/Detalle/Detalle';
import Creation from './components/Creation/Creation';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/home' element={<Home />}/>
      <Route path='home/:idVideogame' element={<Detalle/>}/>
      <Route path='/videogame' element={<Creation />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
