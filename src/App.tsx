import { Route, Routes } from 'react-router-dom';

import Calculator from './pages/calculator/Calculator';
import Home from './pages/home/Home';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
        </Routes>
    );
}

export default App;
