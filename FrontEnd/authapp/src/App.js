import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import Login from './Login/Login';
import Store from './Store/Store';
import AddElement from './addNewElement/AddElement';
import Check from './CheckPage/Check';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route  path="/" element={<Login/>} />
      <Route  path="/Home" element={<Home/>} />
      <Route  path="/Store" element={<Store/>} />
      <Route  path="/newElement" element={<AddElement/>} />
      <Route  path="/CheckPage" element={<Check/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
