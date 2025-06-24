import { Route, Routes } from 'react-router-dom';

import Home from './pages/home/Home';
import Calculator from './pages/simulator/Simulator';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
        </Routes>
    );
}

export default App;
