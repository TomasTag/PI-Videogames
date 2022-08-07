import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom" 
import LandingPage from "./components/LandingPage"
import Home from "./components/Home"
import GetDetail from './components/GameDetail';
import GameCreate from './components/GameCreate';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes> 
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/videogame' element={<GameCreate/>}></Route>
          <Route path='/Home/:id' element={<GetDetail/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
//Switch: Envuelve las rutas y las "recorre" renderizando solo la que coincida con el path en URL
export default App;
