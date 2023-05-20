

import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OpenProcessedImage = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null); 
  const [isDrawing, setIsDrawing] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [brushSize, setBrushSize] = useState(20);

  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = newImage || imageUrl;
    image.onload = () => {
      const canvasAspectRatio = image.width / image.height;
      const canvasHeightLimit = 300; // Set the desired height for the image
      const canvasWidthLimit = canvasHeightLimit * canvasAspectRatio;
      canvas.width = canvasWidthLimit;
      canvas.height = canvasHeightLimit;
      canvas.style.width = `${canvasWidthLimit}px`;
      canvas.style.height = `${canvasHeightLimit}px`;
      context.lineCap = "round";
      context.strokeStyle = "rgba(255, 255, 0, 0.8)"; // Yellow with 50% opacity
      context.lineWidth = brushSize;
      contextRef.current = context;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, [imageUrl, newImage, brushSize]);
  
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const createMaskImage = async (imageUrl) => {
    // Create a new canvas and context
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Load the image
    const image = new Image();
    image.src = imageUrl;

    await new Promise((resolve) => {
      image.onload = () => {
        // Set the canvas dimensions to match the image
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw the image onto the canvas
        context.drawImage(image, 0, 0, image.width, image.height);

        resolve();
      };
    });

    // Get the image data from the canvas
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Iterate over each pixel in the image data
    for (let i = 0; i < imageData.data.length; i += 4) {
      // Check if the pixel is non-transparent (i.e., part of the mask)
      if (imageData.data[i+3] !== 0) {
        // Change the color of the pixel to black
        imageData.data[i] = 0; // Red channel
        imageData.data[i + 1] = 0; // Green channel
        imageData.data[i + 2] = 0; // Blue channel
      }
    }

    // Put the image data back onto the canvas
    context.putImageData(imageData, 0, 0);

    // Convert the canvas to a Base64 PNG and return it
    return canvas.toDataURL("image/png");
  };
  // const handleClean = async () => {
  //   const maskImage = await createMaskImage(newImage);
  //   const payload = {
  //     input_image: newImage,
  //     mask: maskImage
  //   };
  
  //   try {
  //     const response = await axios.post('http://43.205.56.135:8004/fix-images', payload);
  //     if (response.data) {
  //       // Assuming the response contains a new image data
  //       const newImageData = response.data.image; // replace 'image' with the actual key of the new image data in the response
        
  //       setNewImage(null); // Temporarily set newImage to null
        
  //       // Use setTimeout to delay setting newImage back to imageUrl
  //       // This ensures that two distinct state updates occur, which will cause two re-renders
  //       setTimeout(() => {
  //         setNewImage(newImageData);
  //       }, 0);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleClean = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    // Temporarily set newImage to null
    setNewImage(null);
  
    // Use setTimeout to delay setting newImage back to imageUrl
    // This ensures that two distinct state updates occur, which will cause two re-renders
    setTimeout(() => {
      setNewImage(imageUrl);
    }, 0); 
  }
  

  const handleNext = () => { 
    // Add your logic for the "Next" button here 
    console.log('im inside the NextButton',newImage);
   
    navigate(`/final-processed-image/${encodeURIComponent(newImage)}`);//takes to the route(app.js)
  };
  
  const handleBrushSizeChange = (event) => {
    const size = Number(event.target.value);
    setBrushSize(size);
    
    // Update the context's line width
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineWidth = size;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(80vh - 60px)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "relative", zIndex: 2, marginBottom: "0px" }}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "300px",
          marginTop: "10px",
        }}
      >
        <label htmlFor="brushSize" style={{color:"#fff"}}>Brush Size:</label>
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={handleBrushSizeChange}
          style={{ width: "200px" }}
        />
        <div style={{ width: 20 }}></div> 
        <button className = "btn btn-success" onClick={handleNext}>
          Next 
        </button>
        <div style={{ width: 20 }}></div>
        <button className = "btn btn-danger" onClick={handleClean}>
          Clean          
        </button>       
      </div>     
    </div>
  );
};

export default OpenProcessedImage;