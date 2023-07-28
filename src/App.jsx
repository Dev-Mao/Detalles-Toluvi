
import Wall from './pages/Wall';
import { Routes, Route } from 'react-router-dom';


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Wall />} />

      </Routes>
    </>
  );
}

export default App