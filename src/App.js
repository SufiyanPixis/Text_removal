import React from 'react';
import './App.css';
import Headers from './Components/Headers';
import DropZone from './Components/DropZone';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OpenImagePage from './Components/OpenImagePage';
import ProcessedImagePage from './Components/ProcessedImagePage';
import AddTextAndDownloadPage from './Components/AddTextAndDownloadPage';

function App() {
  return (
    <div className="black-background">
      <Router>
        <Headers />
        <Routes>
          <Route path="/" element={<DropZone />} /> 
          <Route path="/open-image/:imageUrl" element={<OpenImagePage />} />
          <Route path="/processed-image/:ProcessedimageURL" element={<ProcessedImagePage />} />
          <Route path="/final-processed-image/:newImage" element={<AddTextAndDownloadPage/>} />  
        </Routes>  
      </Router>
    </div>
  );
}

export default App;
