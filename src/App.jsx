
import Wall from './pages/Wall';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Wall />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App