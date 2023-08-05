import { Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/books" element={<MainPage />} />
    </Routes>
  );
}

export default App;
