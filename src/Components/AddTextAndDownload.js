

// import React, { useRef, useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faDownload } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";

// const AddTextAndDownload = ({ imageUrl }) => {
//   const imageRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [annotatedImageUrl, setAnnotatedImageUrl] = useState(null);
//   const [isAddingText, setIsAddingText] = useState(false);
//   const [textPosition, setTextPosition] = useState({ x: 10, y: 140 });//position of text
//   const [textInput, setTextInput] = useState("");
//   const [loading,setLoading]= useState(false);
//   const [apiResponse, setApiResponse] = useState(null);


//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = annotatedImageUrl || imageUrl;
//     link.download = "image.jpg"; // You can specify the desired filename here
//     link.click();
//   };
//   const handleAddText = () => {
//     fetch("http://43.205.56.135:8004/on_next")
//       .then((response) => response.json())
//       .then((data) => setApiResponse(data))
//       .catch((error) => console.log(error));
//   };


//   const handleTextChange = (e) => {
//     setTextInput(e.target.value);
//   };

//   const handleTextSubmit = (e) => {
//     e.preventDefault();
//     setIsAddingText(false);
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     const img = new Image();
//     img.crossOrigin = "anonymous"; // Enable CORS for the image
//     img.src = imageUrl;
//     img.onload = () => {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       context.drawImage(img, 0, 0);
//       context.font = "100px Times New Roman"; // Text size Font Type
//       context.fillStyle = "#000000"; // Set the fillStyle to specify the color of the text
//       context.fillText(textInput, textPosition.x, textPosition.y);
//       setAnnotatedImageUrl(canvas.toDataURL());
//     };
//   };

//   useEffect(() => {
//     if (annotatedImageUrl) {
//       const img = new Image();
//       img.onload = () => {
//         imageRef.current.src = img.src;
//       };
//       img.src = annotatedImageUrl;
//     }
//   }, [annotatedImageUrl]);

//   const handleImageClick = (e) => {
//     const rect = e.target.getBoundingClientRect();
//     const offsetX = e.clientX - rect.left;
//     const offsetY = e.clientY - rect.top;
//     setTextPosition({ x: offsetX, y: offsetY });
//   };

//   return (
//     <div
//       style={{
//         position: "relative",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "calc(80vh - 60px)",
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           top: "-75px",
//           right: "60px",
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <button
//           onClick={handleDownload}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "#4CAF50",
//             padding: "10px",
//             border: "none",
//             borderRadius: "4px",
//             boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
//             cursor: "pointer",
//             color: "#fff",
//             transition: "background-color 0.3s",
//           }}
//           onMouseOver={(e) => (e.target.style.backgroundColor = "#388E3C")}
//           onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
//         >
//           <FontAwesomeIcon icon={faDownload} style={{ marginRight: "5px" }} />
//           Download
//         </button>
//         <button
//           onClick={handleAddText}
//           style={{
//             marginLeft: "10px",
//             backgroundColor: "#2196F3",
//             color: "#fff",
//             border: "none",
//             borderRadius: "4px",
//             padding: "10px",
//             cursor: "pointer",
//           }}
//         >
//           Add Text
//         </button>
//       </div>

//       <img
//         src={imageUrl}
//         width={600}
//         height={300}
//         alt="Image"
//         ref={imageRef}
//         onClick={handleImageClick}
//       />

//       {isAddingText && (
//         <form
//           onSubmit={handleTextSubmit}
//           style={{
//             position: "absolute",
//             top: textPosition.y + "px",
//             left: textPosition.x + "px",
//           }}
//         >
//           <input
//             type="text"
//             placeholder="Enter text"
//             value={textInput}
//             onChange={handleTextChange}
//             style={{
//               position: "relative",
//               zIndex: "1",
//               resize: "none",
//               border: "none",
//             }}
//           />
//           <button type="submit">Submit</button>
//         </form>
//       )}

//       <canvas ref={canvasRef} style={{ display: "none" }} />
//     </div>
//   );
// };

// export default AddTextAndDownload;

// import React, { useRef, useEffect, useState } from "react";
// import Draggable from "react-draggable";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faDownload } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";

// const AddTextAndDownload = ({ imageUrl }) => {
//   const imageRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [annotatedImageUrl, setAnnotatedImageUrl] = useState(null);
//   const [isAddingText, setIsAddingText] = useState(false);
//   const [textPosition, setTextPosition] = useState({ x: 10, y: 140 }); // Position of text
//   const [textInput, setTextInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   // const [apiResponse, setApiResponse] = useState(null);
//   const [apiResponse, setApiResponse] = useState({
//     fonts: [],
//     font_sizes: [],
//     texts: [],
//     bboxes: [],
//   });

//   const setTextonImage = () => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     const img = new Image();
//     img.crossOrigin = "anonymous"; // Enable CORS for the image
//     img.src = imageUrl;
//     img.onload = () => {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       context.drawImage(img, 0, 0);
  
//       for (let i = 0; i < apiResponse.texts.length; i++) {
//         const text = apiResponse.texts[i];
//         const font = apiResponse.fonts[i];
//         const fontSize = apiResponse.font_sizes[i];
//         const bbox = apiResponse.bboxes[i];
  
//         context.font = `${fontSize}px ${font}`;
//         context.fillStyle = "#000000";
//         context.fillText(text, bbox[0], bbox[1]);
//       }
  
//       setAnnotatedImageUrl(canvas.toDataURL());
//     };
//   };
  
   

//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = annotatedImageUrl || imageUrl;
//     link.download = "image.jpg"; // You can specify the desired filename here
//     link.click();
//   };

//   const handleAddText = () => {
//     const hardcodedApiResponse = {
//       fonts: ["Arial"],
//       font_sizes: [12],
//       texts: ["Hello"],
//       bboxes: [
//         [0, 0, 100, 100], 
//       ]
//     };
  
//     setApiResponse(hardcodedApiResponse);
//     setTextonImage();

//     // fetch("http://43.205.56.135:8004/on_next")
//     //   .then((response) => response.json())
//     //   .then((data) => {
//     //     setApiResponse(data);
//     //     setIsAddingText(true);
//     //   })
//     //   .catch((error) => console.log(error));
//   };

 

 
//   return (
//     <div
//       style={{ 
//         position: "relative",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "calc(80vh - 60px)",
//       }} 
//     >
//       <div
//         style={{
//           position: "absolute",
//           top: "-75px",
//           right: "60px",
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <button 
//           onClick={handleDownload}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "#4CAF50",
//             padding: "10px",
//             border: "none",
//             borderRadius: "4px",
//             boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
//             cursor: "pointer",
//             color: "#fff",
//             transition: "background-color 0.3s",
//           }} 
//           onMouseOver={(e) => (e.target.style.backgroundColor = "#388E3C")}
//           onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
//         >
//           <FontAwesomeIcon icon={faDownload} style={{ marginRight: "5px" }} />
//           Download
//         </button>
//         <button
//           onClick={handleAddText}
//           style={{
//             marginLeft: "10px",
//             backgroundColor: "#2196F3",
//             color: "#fff",
//             border: "none",
//             borderRadius: "4px",
//             padding: "10px",
//             cursor: "pointer",
//           }}
//         >
//           Add Text
//         </button>
//       </div>

//       <img 
//         src={imageUrl}
//         width={600}
//         height={300}
//         alt="Image"
//         ref={imageRef}
        
//       />

     

//       <canvas ref={canvasRef} style={{ display: "none" }} />
//     </div>
//   );
// };

// export default AddTextAndDownload;
import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import imageNew from '../Your paragraph text.png';
// import('../Your paragraph text.png')
    // import('../WhatsApp Image 2023-05-26 at 21.38.59.jpeg')
    // import('../beach.jpeg')

    // import('../girlbeach.jpeg')

const AddTextAndDownload = ({ imageUrl }) => {
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [annotatedImageUrl, setAnnotatedImageUrl] = useState(null);
  const [isAddingText, setIsAddingText] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 10, y: 140 });
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [responseImageUrl, setResponseImageUrl] = useState(null);
  const [image, setImage] = useState(null);

  const handleDownload = () => {
    const link = document.createElement("a");
    // link.href = responseImageUrl || imageUrl;
    link.href = imageNew;
    link.download = "image.jpg";
    link.click();
  };

  // const handleAddText = () => {
  //   setLoading(true);
  //   setApiResponse(null);
  //   axios
  //     .get("http://43.205.56.135:8004/on_next")
  //     .then((response) => {
  //       console.log(response.data,"response")
  //       setApiResponse(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // };

  const handleAddText = () => {
    setLoading(true);
    setTimeout(() => {
    // import('../Your paragraph text.png')
    // import('../WhatsApp Image 2023-05-26 at 21.38.59.jpeg')
    import('../beach.jpeg')

    // import('../girlbeach.jpeg')
      .then((image) => {
        setImage(image.default);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }, 1000);
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
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      context.font = "100px Times New Roman";
      context.fillStyle = "#000000";
      context.fillText(textInput, textPosition.x, textPosition.y);
      setResponseImageUrl(canvas.toDataURL());
    };
  };

  useEffect(() => {
    if (imageRef.current && canvasRef.current && apiResponse) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        apiResponse.bboxes.forEach((bbox, index) => {
          const scaledBbox = bbox.map((value, i) => {
            if (i % 2 === 0) {
              // Scale x-coordinate
              return (value * canvas.width) / img.width;
            } else {
              // Scale y-coordinate
              return (value * canvas.height) / img.height;
            }
          });

          const textStyle = {
            position: "absolute",
            left: scaledBbox[0],
            top: scaledBbox[1],
            width: scaledBbox[2] - scaledBbox[0],
            height: scaledBbox[3] - scaledBbox[1],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: apiResponse.fonts[index % apiResponse.fonts.length],
            fontSize: apiResponse.font_sizes[index % apiResponse.font_sizes.length],
            color: "#000000",
            pointerEvents: "none",
          };

          const boxStyle = {
            position: "absolute",
            left: scaledBbox[0],
            top: scaledBbox[1],
            width: scaledBbox[2] - scaledBbox[0],
            height: scaledBbox[3] - scaledBbox[1],
            border: "2px solid red",
          };

          const textBox = document.createElement("div");
          Object.assign(textBox.style, textStyle);
          const boxElement = document.createElement("div");
          Object.assign(boxElement.style, boxStyle);
          canvas.parentNode.appendChild(boxElement);
          canvas.parentNode.appendChild(textBox);
          textBox.innerText = apiResponse.texts[index];
        });
        setResponseImageUrl(canvas.toDataURL());
      };
    }
  }, [apiResponse, imageUrl]);

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
        marginTop: "20px", // Add spacing between the navbar and the container
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
        src={image||imageUrl}
        width={800}
        height={500}
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

      {loading && <div>Loading...</div>}
      {responseImageUrl && (
        <img
          src={responseImageUrl}
          width={400} // Increase the width as desired
          height={400} // Increase the height as desired
          alt="Annotated Image"
        />
      )}
    </div>
  );
};

export default AddTextAndDownload;



