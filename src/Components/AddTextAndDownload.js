import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const AddTextAndDownload = ({ imageUrl }) => {
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [annotatedImageUrl, setAnnotatedImageUrl] = useState(null);
  const [isAddingText, setIsAddingText] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 10, y: 140 });//position of text
  const [textInput, setTextInput] = useState("");

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = annotatedImageUrl || imageUrl;
    link.download = "image.jpg"; // You can specify the desired filename here
    link.click();
  };

  const handleAddText = () => {
    setIsAddingText(true);
  };

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    setIsAddingText(false);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous"; // Enable CORS for the image
    img.src = imageUrl;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      context.font = "100px Times New Roman"; // Text size Font Type
      context.fillStyle = "#000000"; // Set the fillStyle to specify the color of the text
      context.fillText(textInput, textPosition.x, textPosition.y);
      setAnnotatedImageUrl(canvas.toDataURL());
    };
  };

  useEffect(() => {
    if (annotatedImageUrl) {
      const img = new Image();
      img.onload = () => {
        imageRef.current.src = img.src;
      };
      img.src = annotatedImageUrl;
    }
  }, [annotatedImageUrl]);

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setTextPosition({ x: offsetX, y: offsetY });
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(80vh - 60px)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-75px",
          right: "60px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleDownload}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#4CAF50",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            color: "#fff",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#388E3C")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        >
          <FontAwesomeIcon icon={faDownload} style={{ marginRight: "5px" }} />
          Download
        </button>
        <button
          onClick={handleAddText}
          style={{
            marginLeft: "10px",
            backgroundColor: "#2196F3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Add Text
        </button>
      </div>

      <img
        src={imageUrl}
        width={600}
        height={300}
        alt="Image"
        ref={imageRef}
        onClick={handleImageClick}
      />

      {isAddingText && (
        <form
          onSubmit={handleTextSubmit}
          style={{
            position: "absolute",
            top: textPosition.y + "px",
            left: textPosition.x + "px",
          }}
        >
          <input
            type="text"
            placeholder="Enter text"
            value={textInput}
            onChange={handleTextChange}
            style={{
              position: "relative",
              zIndex: "1",
              resize: "none",
              border: "none",
            }}
          />
          <button type="submit">Submit</button>
        </form>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default AddTextAndDownload;
