// OpenImagePage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import OpenProcessedImage from './OpenProcessedImage';

// OpenImagePage.js 

const ProcessedImagePage = () => {  
    const { ProcessedimageUrl } = useParams();  //coming from url   
    return (
      <div> 
        <OpenProcessedImage imageUrl={ ProcessedimageUrl}/>       
      </div> 
    );
}; 
  
  export default ProcessedImagePage; 
  
