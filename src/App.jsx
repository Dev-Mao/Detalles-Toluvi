
import Wall from './pages/Wall';
import NewProduct from './pages/NewProduct';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Wall />} />
        <Route path="/admin" element={<NewProduct />} />
      </Routes>
    </>
  );
}

export default App