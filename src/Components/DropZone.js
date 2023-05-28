// // DropZone.js
// import React, { useState, useRef, useEffect } from "react";
// import "./DropZone.css";
// import { FaImage } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const DropZone = () => {
//   const [isDragging, setIsDragging] = useState(false);
//   const navigate = useNavigate();
//   const [file, setFile] = useState(null);

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const imageRef = useRef(null);
//   useEffect(() => {
//     if (imageRef.current) {
//       const imageElement = imageRef.current;
//       const originalWidth = imageElement.naturalWidth;
//       const originalHeight = imageElement.naturalHeight;
//       console.log("Original Width:", originalWidth);
//       console.log("Original Height:", originalHeight);
//     }
//   }, []);

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setFile(file);
//       console.log("Input Image:", imageUrl);
//       console.log("file of input-image", file);
//       navigate(`/open-image/${encodeURIComponent(imageUrl)}`, {
//         state: { file: file },
//       });
//     }
//   };

//   const handleBrowseFiles = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setFile(file);
//       console.log("Input Image:", imageUrl);
//       console.log("file of input-image", file);
//       navigate(`/open-image/${encodeURIComponent(imageUrl)}`, {
//         state: { file: file },
//       });
//     }
//   };

//   return (

//     <div 
//       className = {`drop-zone ${isDragging ? "dragging" : ""}`}
      // onDragEnter = {handleDragEnter}
      // onDragLeave = {handleDragLeave}
      // onDragOver = {handleDragOver}
      // onDrop = {handleDrop}
//     >   

//       <div className="drop-zone-content">
//         <>
//           <div>
//             <br></br>
//             <br></br>
//             <label htmlFor="file-input" style={{ outline: "none" }}>
//               <FaImage className="ImageIcon" id="Imageicon" />
//             </label>
//             <input
//               type="file"
//               id="file-input"
//               accept="image/*"
//               style={{ display: "none" }}
//               onChange={handleBrowseFiles} 
//             />
//           </div>

//           <p className="Text_DragandDrop">Drag and drop files here</p>
//         </>
//       </div>
//     </div>
//   );
// };

// export default DropZone;
// DropZone.js

import React, { useState, useRef , useEffect } from "react";
import "./DropZone.css";
import { FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DropZone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const videoRef = useRef(null); // Ref for the video element

  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      // Add any necessary code for the video element, such as setting video source, controlling playback, etc.
    }
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFile(file);
      console.log("Input Image:", imageUrl);
      console.log("file of input-image", file);
      navigate(`/open-image/${encodeURIComponent(imageUrl)}`, {
        state: { file: file },
      });
    }
  };

  const handleBrowseFiles = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFile(file);
      console.log("Input Image:", imageUrl);
      console.log("file of input-image", file);
      navigate(`/open-image/${encodeURIComponent(imageUrl)}`, {
        state: { file: file },
      });
    }
  };

  return (
    <>
      <div className="row container mt-5 p-5">
        <div className="col-md-6" style={{marginLeft:"40px"}}>
          <h1 className="front-text text-center pt-4">Effortlessly Remove Unwanted <span className="span">Elements</span>, <span className="span">Text</span> Perfect Your Image in Seconds.</h1>
        </div>
        <div className="col-md-4">
        <div className="my-vedio">
          <video ref={videoRef} controls>
            <source src={process.env.PUBLIC_URL + "/examplevideo.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        </div>
      </div>
      {/* <div className="d-flex mt-5 p-5 " >
        <div className="front-text">
        <h1 className="line1 text-center font-bold sm:text-left text-xl sm:text-3xl lg:text-5xl">ERASE Text</h1>
        <br />
        <span className="line2">OR</span>
        <br />
        <span className="line3">Replace Text</span>
        <br />
        <span className="line4">in Seconds...</span>
      </div>
        <div className="my-vedio">
          <video ref={videoRef} controls>
            <source src={process.env.PUBLIC_URL + "/examplevideo.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div> */}
      
      <div className="drop-zone-container">
        
        <div className={`drop-zone ${isDragging ? "dragging" : ""}`}>
          <div className="drop-zone-content"
            onDragEnter = {handleDragEnter}
            onDragLeave = {handleDragLeave}
            onDragOver = {handleDragOver}
            onDrop = {handleDrop}
          >

            <>
              <div>
                <br />
                <br />
                <label htmlFor="file-input" style={{ outline: "none" }}>
                  <FaImage className="ImageIcon" id="Imageicon" />
                </label>
                <input
                  type="file"
                  id="file-input"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleBrowseFiles}
                />
              </div>
              <p className="Text_DragandDrop">Drag and drop files here</p>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropZone;

