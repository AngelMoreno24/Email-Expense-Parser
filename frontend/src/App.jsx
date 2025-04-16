import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Login from './pages/Login';
import Chart from './pages/Chart';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Home />} /> 
          <Route path="*" element={<NoPage />} />
          <Route path="chart" element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;