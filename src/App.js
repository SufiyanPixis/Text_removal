import React from 'react';
import './App.css';
import Headers from './Components/Headers';
import DropZone from './Components/DropZone';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OpenImagePage from './Components/OpenImagePage';

function App() {
  return (
    <div className="black-background">
      <Router>
        <Headers />
        <Routes>
          <Route path="/" element={<DropZone />} />
          <Route path="/open-image/:imageUrl/:fileName" element={<OpenImagePage />} />
        </Routes>  
      </Router> 
    </div>
  );
}

export default App;
