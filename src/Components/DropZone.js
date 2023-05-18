// DropZone.js
import React, { useState, useRef, useEffect } from "react";
import "./DropZone.css";
import { FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DropZone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

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

  const imageRef = useRef(null);
  useEffect(() => {
    if (imageRef.current) {
      const imageElement = imageRef.current;
      const originalWidth = imageElement.naturalWidth;
      const originalHeight = imageElement.naturalHeight;
      console.log("Original Width:", originalWidth);
      console.log("Original Height:", originalHeight);
    }
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    const imageUrl = URL.createObjectURL(file);

    navigate(`/open-image/${encodeURIComponent(imageUrl)}/${encodeURIComponent(file)}`);//takes to the route(app.js)
  }; 

  const handleBrowseFiles = (e) => {
    const file = e.target.files[0];
   
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log("imageUrl is here", file.name);
      navigate(`/open-image/${encodeURIComponent(imageUrl)}/${encodeURIComponent(file)}`);
    }
  };
  

  return (
    <div
      className={`drop-zone ${isDragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="drop-zone-content">
        <>
          <div>
            <br></br>
            <br></br>
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
  );
};

export default DropZone;
