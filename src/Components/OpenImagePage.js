// OpenImagePage.js
import React from 'react';
import OpenImage from './Openimage';
import { useParams } from 'react-router-dom';

// OpenImagePage.js

const OpenImagePage = () => { 
    const { imageUrl, fileName } = useParams();  //coming from url   
  
    return (
      <div> 
        <OpenImage imageUrl={imageUrl} fileName = {fileName} />       
      </div> 
    );
}; 
  
  export default OpenImagePage;
  
