// !joel
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CuidadoPersonal from './components/CuidadoPersonal/CuidadoPersonal.js';
import ServicioSalud from './components/ServicioSalud/ServicioSalud';
import Veterinaria from './components/Veterinaria/Veterinaria';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Turncreated from './components/CreacionTurno/Turncreated';
import Endpage from './components/Endpage/Endpage';
import TurnDetail from './components/TurnDetail/TurnDetail';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route
                        path="/cuidadoPersonal"
                        element={<CuidadoPersonal />}
                    />
                    <Route path="/ServicioSalud" element={<ServicioSalud />} />
                    <Route path="/Veterinaria" element={<Veterinaria />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Turncreated" element={<Turncreated />} />
                    <Route path="/turns" element={<TurnDetail />} />
                    <Route path="/Endpage" element={<Endpage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
