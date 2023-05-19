// import React, { useRef, useEffect, useState } from 'react';
// import axios from 'axios';

// const OpenProcessedImage = ({ imageUrl }) => {
//   const canvasRef = useRef(null);
//   const contextRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [newImage,setnewImage] = useState(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     canvas.width = 300 * 2;
//     canvas.height = 300 * 2;
//     canvas.style.width = `${400}px`;
//     canvas.style.height = `${400}px`;

//     const context = canvas.getContext('2d');
//     context.scale(2, 2);
//     context.lineCap = "round";
//     context.strokeStyle = "rgba(255, 255, 0, 0.5)"; // Yellow with 50% opacity
//     context.lineWidth = 20; // Increased line width
//     contextRef.current = context;

//     // Load image and draw it on the canvas
//     const image = new Image();
//     image.src = imageUrl;
//     image.onload = () => {
//       // Draw image as 300x300 pixels square
//       context.drawImage(image, 0, 0, 400, 400);
//     };
//   }, [imageUrl]);

//   const startDrawing = ({ nativeEvent }) => {
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.beginPath();
//     contextRef.current.moveTo(offsetX, offsetY);
//     setIsDrawing(true);
//   };

//   const finishDrawing = () => {
//     contextRef.current.closePath();
//     setIsDrawing(false);
//   };

//   const draw = ({ nativeEvent }) => {
//     if (!isDrawing) {
//       return;
//     }
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.lineTo(offsetX, offsetY);
//     contextRef.current.stroke();
//   };

//   const handleNext = () => {
//     // Add your logic for the "Next" button here
//   };

//   const handleClear = async () => {
//     console.log("hello im in HandleClear");
//     const canvas = canvasRef.current;
//     const context = contextRef.current;
//     //creat new canvas to store mask
//     const maskCanvas = document.createElement('canvas');
//     maskCanvas.width = canvas.width;
//     maskCanvas.height = canvas.height;
//     const maskContext = maskCanvas.getContext('2d');

//     const image = new Image();
//     image.src = imageUrl;
//     await new Promise((resolve) =>{
//         image.onload = () => {
//             maskContext.drawImage(image,0,0,canvas.width , canvas.height);
//             resolve();
//         };
//     });
//     const originalData = context.getImageData(0, 0, canvas.width, canvas.height);
//     const maskData = maskContext.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
//     // Create the mask image by setting non-highlighted pixels to black
//   for (let i = 0; i < originalData.data.length; i += 4) {
//     if (originalData.data[i + 3] === 0) { // If the alpha value is 0 (transparent), it's not highlighted
//       maskData.data[i] = 0; // Set red to 0
//       maskData.data[i + 1] = 0; // Set green to 0
//       maskData.data[i + 2] = 0; // Set blue to 0
//     }
//   }
//   // Put the mask image data back onto the mask canvas
//   maskContext.putImageData(maskData, 0, 0);

//   // Convert the mask canvas to a Base64 PNG
//   const maskImageData = maskCanvas.toDataURL();

//   const newImageUrl = imageUrl;
//    setnewImage(newImageUrl);

// //   OpenProcessedImage(newImageUrl);
// //   <OpenProcessedImageFunction imageUrl={newImageUrl}/>

//   // Send the mask image data to the API
// //   axios.post('http://your-api-endpoint', { image: maskImageData })
// //     .then(response => {
// //       // Extract the new image URL from the response
// //       const newImageUrl = response.data.newImageUrl;

// //       // Pass the new image URL to displayFinalimage function
// //       OpenProcessedImageFunction(newImageUrl);
// //       // Clear the original canvas
// //       context.clearRect(0, 0, canvas.width, canvas.height);
// //     })
// //     .catch(error => {
// //       // Handle any errors
// //       console.log(error);
// //     });

//   };

//   return (
//     newImage == null ?
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "calc(80vh - 60px)" }}>
//       <canvas
//         ref={canvasRef}
//         style={{ position: "relative", zIndex: 2, marginBottom: "0px" }}
//         onMouseDown={startDrawing}
//         onMouseUp={finishDrawing}
//         onMouseMove={draw}
//       />
//       <div style={{ display: "flex", justifyContent: "space-between", width: "300px", marginTop: "10px" }}>
//         <button onClick={handleNext}>Next</button>
//         <button onClick={handleClear}>Clear</button>
//       </div>
//     </div>
//     :
//     <>
//     <img src={newImage} width={300} alt='ProcessedImage'/>
//     </>

//   );

// };

// export default OpenProcessedImage;
//below code is correct for clean button
/*
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../logo.svg'

const OpenProcessedImage = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = newImage || imageUrl;
    image.onload = () => {
      const canvasWidth = image.width;
      const canvasHeight = image.height;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const canvasAspectRatio = canvasWidth / canvasHeight;
      const canvasHeightLimit = 300; // Set the desired height for the image
      const canvasWidthLimit = canvasHeightLimit * canvasAspectRatio;
      canvas.style.width = `${canvasWidthLimit}px`;
      canvas.style.height = `${canvasHeightLimit}px`;
      context.lineCap = "round";
      context.strokeStyle = "rgba(255, 255, 0, 0.8)"; // Yellow with 50% opacity
      context.lineWidth = 20; // Increased line width
      contextRef.current = context;
      context.drawImage(image, 0, 0, canvasWidth, canvasHeight);
    };
  }, [imageUrl, newImage]);

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
    const context = contextRef.current;
    const canvas = canvasRef.current;
    const scaleX = canvas.width / canvas.offsetWidth;
    const scaleY = canvas.height / canvas.offsetHeight;
    const scaledOffsetX = offsetX * scaleX;
    const scaledOffsetY = offsetY * scaleY;
    context.lineTo(scaledOffsetX, scaledOffsetY);
    context.stroke();
  };

  const handleNext = () => { 
    // Add your logic for the "Next" button here
  };
 
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
  };
  

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "calc(80vh - 60px)" }}>
      <canvas
        ref={canvasRef}
        style={{ position: "relative", zIndex: 2, marginBottom: "0px" }}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      />
      <div style={{ display: "flex", justifyContent: "space-between", width: "300px", marginTop: "10px" }}>
        <button onClick={handleNext}>Next</button>
        <button onClick={handleClean}>clean</button>
      </div>
    </div>
  );
};

export default OpenProcessedImage;
*/


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
  // const handleProcess = () => { 
  //   const payload = {  
  //     input_image: fileName,  
  //     bboxes: selections,   
  //     dimension: [originalDimensions.width, originalDimensions.height], 
  //   };
  //   axios   
  //     .post('http://43.205.56.135:8004/process-image', payload)        
  //     .then(response => {
  //       console.log(response.data);
  //       //store response.data.folder_name in useState

  //       const imageBlob = `data:image/jpeg:base64,${response.data.image}`
  //       const ProcessedimageURL = URL.createObjectURL(imageBlob);  
  //       ProcessedImagePage(ProcessedimageURL); 
  //       navigate(`/processed-image/${encodeURIComponent(ProcessedimageURL)}`);//takes to the route(app.js)
  //     }
  //     )                   
  //     .catch(error => { 
  //       console.error(error); 
  //     });
  // };
  const handleClean = async () => {
    const maskImage = await createMaskImage(newImage);
    const payload = {
      input_image: newImage,
      mask: maskImage
    };
  
    try {
      const response = await axios.post('http://43.205.56.135:8004/fix-images', payload);
      if (response.data) {
        // Assuming the response contains a new image data
        const newImageData = response.data.image; // replace 'image' with the actual key of the new image data in the response
        
        setNewImage(null); // Temporarily set newImage to null
        
        // Use setTimeout to delay setting newImage back to imageUrl
        // This ensures that two distinct state updates occur, which will cause two re-renders
        setTimeout(() => {
          setNewImage(newImageData);
        }, 0);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  

  const handleNext = () => { 
    // Add your logic for the "Next" button here 
    console.log('im inside the NextButton',newImage);
    alert("hello")
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
        <button className="btn btn-success" onClick={handleNext}>
          Next 
        </button>
        <div style={{ width: 20 }}></div>
        <button className="btn btn-danger" onClick={handleClean}>
          Clean
        </button>
      </div>
    </div>
  );
};

export default OpenProcessedImage;
