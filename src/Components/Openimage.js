// OpenImage.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const OpenImage = ({ imageUrl, fileName }) => {
  const [originalDimensions, setOriginalDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [selections, setSelections] = useState([]);
  const [startPosition, setStartPosition] = useState(null);
  const [endPosition, setEndPosition] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setOriginalDimensions({
        width: img.width,
        height: img.height,
      });
    };
  }, [imageUrl]);

  const aspectRatio = originalDimensions.width / originalDimensions.height;
  const adjustedHeight = 400;
  const adjustedWidth = adjustedHeight * aspectRatio;

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      const boundingRect = imageRef.current.getBoundingClientRect();
      const offsetX = e.clientX - boundingRect.left;
      const offsetY = e.clientY - boundingRect.top;
      setStartPosition({ x: offsetX, y: offsetY });
      setEndPosition({ x: offsetX, y: offsetY });
    }  
  }; 

  const handleMouseMove = (e) => {
    if (startPosition) {
      const boundingRect = imageRef.current.getBoundingClientRect();
      const offsetX = e.clientX - boundingRect.left;
      const offsetY = e.clientY - boundingRect.top;
      setEndPosition({ x: offsetX, y: offsetY });
    }
  };
 
  const handleMouseUp = (e) => { 
    if (startPosition && endPosition) {
      const newSelection = {
        x: Math.min(startPosition.x, endPosition.x),
        y: Math.min(startPosition.y, endPosition.y),
        width: Math.abs(endPosition.x - startPosition.x),
        height: Math.abs(endPosition.y - startPosition.y),
      };
      setSelections([...selections,newSelection]); 
    }
    setStartPosition(null);
    setEndPosition(null);
  };

  const handleProcess = () => { 
    const payload = { 
      input_image: fileName, 
      bboxes: selections, 
      dimension: [originalDimensions.width, originalDimensions.height], 
    };
    axios  
      .post('http://43.205.56.135:8004/process-image', payload)        
      .then(response => {
        console.log(response.data); 
        //
        
      })                   
      .catch(error => { 
        console.error(error); 
      });
  };
  return (
    <div
      style={{
        background: '#f2f2f2',
        padding: '50px', 
        borderRadius: '1px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
        }}
      >
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Open Image"
          style={{
            maxWidth: adjustedWidth,
            maxHeight: adjustedHeight,
            cursor: 'crosshair',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
        {selections.map((selection, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              border: '2px solid red',
              left: `${selection.x}px`,
              top: `${selection.y}px`,
              width: `${selection.width}px`,
              height: `${selection.height}px`,
              pointerEvents: 'none',
            }}
          />
        ))}
        {startPosition && endPosition && (
          <div
            style={{
              position: 'absolute', 
              border: '2px dashed red',
              left: `${Math.min(startPosition.x, endPosition.x)}px`,
              top: `${Math.min(startPosition.y, endPosition.y)}px`,
              width: `${Math.abs(endPosition.x - startPosition.x)}px`,
              height: `${Math.abs(endPosition.y - startPosition.y)}px`,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
      <br /> 
      <br />
      <br> </br>
      <button className="btn btn-success" onClick={handleProcess}>
        Process
      </button>
    </div>
  );
};

export default OpenImage;
