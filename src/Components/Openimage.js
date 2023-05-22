import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import FormData from "form-data";
import { useNavigate } from "react-router-dom";
import * as markerjs2 from "markerjs2";
import { Oval } from "react-loader-spinner";

const OpenImage = ({ imageUrl, fileName }) => {
  const [originalDimensions, setOriginalDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [markedArea, setMarkedArea] = useState(null);
  const [maState, setaState] = useState(null);
  const [selections, setSelections] = useState([]);
  const [startPosition, setStartPosition] = useState(null);
  const [endPosition, setEndPosition] = useState(null);
  const [folderName, setFolderName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const imageRef = useRef(null);
  const navigate = useNavigate();
  const beforeRef = useRef(null);

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

  const showMarkerAreaBefore = () => {
    if (imageRef.current !== null) {
      const markerArea = new markerjs2.MarkerArea(imageRef.current);
      markerArea.addEventListener("render", (event) => {
        const { selection } = event;
        if (beforeRef.current) {
          beforeRef.current.src = event.dataUrl;
          beforeRef.current.datas = event;
          beforeRef.current.maState = event.state;
          setMarkedArea(selection); // Store the marked area in state
        }
      });
      markerArea.show();
      if (beforeRef.current && beforeRef.current.maState) {
        markerArea.restoreState(beforeRef.current.maState);
      }
    }
  };
  const handleProcess = () => {
    const formData = new FormData();
    formData.append("input_image", fileName);
    formData.append(
      "dimension",
      JSON.stringify([originalDimensions.width, originalDimensions.height])
    );
    // formData.append("bboxes", JSON.stringify(selections)); 
      formData.append("bboxes", JSON.stringify(markedArea)); 


    setFolderName("loading");
    setLoading(true);
    // navigate(`/processed-image/${encodeURIComponent(imageUrl)}`);

    axios 
      .post("http://43.205.56.135:8004/process-image", formData)
      .then((response) => { 
        setLoading(false);
        setFolderName(response.data.folder_name); 
        const ProcessedimageURL = `data:image/jpeg;base64,${response.data.image}`;
        navigate(`/processed-image/${encodeURIComponent(ProcessedimageURL)}`);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        setFolderName("error");
      });
  };

  return ( 
    <div 
      style={{
        background: "#f2f2f2",
        padding: "50px",
        borderRadius: "1px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative" }}>
        {hovered && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Double click to edit
          </div>
        )}
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Open Image"
          style={{
            maxWidth: adjustedWidth,
            maxHeight: adjustedHeight,
          }}
          onDoubleClick={showMarkerAreaBefore}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
        {selections.map(
          (selection, index) =>
            selection && (
              <div
                key={index}
                style={{
                  position: "absolute",
                  border: "2px solid red",
                  left: `${selection.x}px`,
                  top: `${selection.y}px`,
                  width: `${selection.width}px`,
                  height: `${selection.height}px`,
                  pointerEvents: "none",
                }}
              />
            )
        )}
        {startPosition && endPosition && (
          <div
            style={{
              position: "absolute",
              border: "2px dashed red",
              left: `${Math.min(startPosition.x, endPosition.x)}px`,
              top: `${Math.min(startPosition.y, endPosition.y)}px`,
              width: `${Math.abs(endPosition.x - startPosition.x)}px`,
              height: `${Math.abs(endPosition.y - startPosition.y)}px`,
              pointerEvents: "none",
            }}
          />
        )}
      </div>
      <button
        className="btn btn-success mt-3"
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          transition: "background-color 0.3s",
        }}
        onClick={handleProcess}
        disabled={loading}
      >
        {loading ? (
          <Oval color="#ffffff" height={15} width={40} />
        ) : (
          folderName === "loading"
            ? "Wait, your image is under process..."
            : "Process"
        )}
      </button>
    </div>
  );
};

export default OpenImage;


// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import FormData from "form-data";
// import ProcessedImagePage from "./ProcessedImagePage";
// import { useNavigate } from "react-router-dom";

// const OpenImage = ({ imageUrl, fileName }) => {
//   const [originalDimensions, setOriginalDimensions] = useState({
//     width: 0,
//     height: 0,
//   });
//   const [selections, setSelections] = useState([]);
//   const [startPosition, setStartPosition] = useState(null);
//   const [endPosition, setEndPosition] = useState(null);
//   const [folderName, setFolderName] = useState(null);
//   const [isEditingEnabled, setIsEditingEnabled] = useState(false); // New state for enabling/disabling editing
//   const imageRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const img = new Image();
//     img.src = imageUrl;
//     img.onload = () => {
//       setOriginalDimensions({
//         width: img.width,
//         height: img.height,
//       });
//     };
//   }, [imageUrl]);

//   const aspectRatio = originalDimensions.width / originalDimensions.height;
//   const adjustedHeight = 400;
//   const adjustedWidth = adjustedHeight * aspectRatio;

//   const handleMouseDown = (e) => {
//     if (e.button === 0 && isEditingEnabled) { // Check if editing is enabled
//       const boundingRect = imageRef.current.getBoundingClientRect();
//       const offsetX = e.clientX - boundingRect.left;
//       const offsetY = e.clientY - boundingRect.top;
//       setStartPosition({ x: offsetX, y: offsetY });
//       setEndPosition({ x: offsetX, y: offsetY });
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (startPosition && isEditingEnabled) { // Check if editing is enabled
//       const boundingRect = imageRef.current.getBoundingClientRect();
//       const offsetX = e.clientX - boundingRect.left;
//       const offsetY = e.clientY - boundingRect.top;
//       setEndPosition({ x: offsetX, y: offsetY });
//     }
//   };

//   const handleMouseUp = (e) => {
//     if (startPosition && endPosition && isEditingEnabled) { // Check if editing is enabled
//       const newSelection = {
//         x: Math.min(startPosition.x, endPosition.x),
//         y: Math.min(startPosition.y, endPosition.y),
//         width: Math.abs(endPosition.x - startPosition.x),
//         height: Math.abs(endPosition.y - startPosition.y),
//       };
//       setSelections([...selections, newSelection]);
//     }
//     setStartPosition(null);
//     setEndPosition(null);
//   };

//   const handleProcess = () => {
//     const formData = new FormData();
//     formData.append("input_image", fileName);
//     formData.append(
//       "dimension",
//       JSON.stringify([originalDimensions.width, originalDimensions.height])
//     );
//     formData.append("bboxes", JSON.stringify(selections));

//     setFolderName("loading");

//     const blinkInterval = setInterval(() => {
//       imageRef.current.style.opacity =
//         imageRef.current.style.opacity === "0" ? "1" : "0";
//     }, 300);

//     axios
//       .post("http://43.205.56.135:8004/process-image", formData)
//       .then((response) => {
//         clearInterval(blinkInterval);
//         setFolderName(response.data.folder_name);
//         const ProcessedimageURL = `data:image/jpeg;base64,${response.data.image}`;
//         navigate(
//           `/processed-image/${encodeURIComponent(ProcessedimageURL)}`
//         );
//       })
//       .catch((error) => {
//         clearInterval(blinkInterval);
//         console.error(error);
//         setFolderName("error");
//       });
//   };

//   const handleToggleEditing = () => {
//     setIsEditingEnabled(!isEditingEnabled);
//     setStartPosition(null);
//     setEndPosition(null);
//     setSelections([]);
//   };

//   return (
//     <div
//       style={{
//         background: "#f2f2f2",
//         padding: "50px",
//         borderRadius: "1px",
//         boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           position: "relative",
//         }}
//       >
//         <img
//           ref={imageRef}
//           src={imageUrl}
//           alt="Open Image"
//           style={{
//             maxWidth: adjustedWidth,
//             maxHeight: adjustedHeight,
//             cursor: isEditingEnabled ? "crosshair" : "default", // Set cursor based on editing enabled state
//           }}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//         />
//         {selections.map((selection, index) => (
//           <div
//             key={index}
//             style={{
//               position: "absolute",
//               border: "2px solid red",
//               left: `${selection.x}px`,
//               top: `${selection.y}px`,
//               width: `${selection.width}px`,
//               height: `${selection.height}px`,
//               pointerEvents: "none",
//             }}
//           />
//         ))}
//         {startPosition && endPosition && (
//           <div
//             style={{
//               position: "absolute",
//               border: "2px dashed red",
//               left: `${Math.min(startPosition.x, endPosition.x)}px`,
//               top: `${Math.min(startPosition.y, endPosition.y)}px`,
//               width: `${Math.abs(endPosition.x - startPosition.x)}px`,
//               height: `${Math.abs(endPosition.y - startPosition.y)}px`,
//               pointerEvents: "none",
//             }}
//           />
//         )}
//       </div>
//       <div>
//         <button
//           className="btn btn-success mt-3"
//           style={{
//             backgroundColor: "#4CAF50",
//             color: "white",
//             transition: "background-color 0.3s",
//             marginRight: "10px",
//           }}
//           onClick={handleToggleEditing}
//         >
//           {isEditingEnabled ? "Disable Editing" : "Enable Editing"}
//         </button>
//         <button
//           className="btn btn-success mt-3"
//           style={{
//             backgroundColor: "#4CAF50",
//             color: "white",
//             transition: "background-color 0.3s",
//           }}
//           onClick={handleProcess}
//           disabled={folderName === "loading"}
//         >
//           {folderName === "loading"
//             ? "Wait, your image is under process..."
//             : "Process"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OpenImage;

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import FormData from "form-data";
// import ProcessedImagePage from "./ProcessedImagePage";
// import * as markerjs2 from "markerjs2";

// const OpenImage = ({ imageUrl, fileName }) => {
//   const [originalDimensions, setOriginalDimensions] = useState({
//     width: 0,
//     height: 0,
//   });
//   const [selections, setSelections] = useState([]);
//   const [folderName, setFolderName] = useState(null);
//   const [startPosition, setStartPosition] = useState(null);
//   const [endPosition, setEndPosition] = useState(null);

//   const [isEditingEnabled, setIsEditingEnabled] = useState(false);
//   const [markers, setMarkers] = useState([]);
//   const imageRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const img = new Image();
//     img.src = imageUrl;
//     img.onload = () => {
//       setOriginalDimensions({
//         width: img.width,
//         height: img.height,
//       });
//     };
//   }, [imageUrl]);

//   const aspectRatio = originalDimensions.width / originalDimensions.height;
//   const adjustedHeight = 400;
//   const adjustedWidth = adjustedHeight * aspectRatio;

//   const handleMouseDown = (e) => {
//     if (e.button === 0 && isEditingEnabled) {
//       const boundingRect = imageRef.current.getBoundingClientRect();
//       const offsetX = e.clientX - boundingRect.left;
//       const offsetY = e.clientY - boundingRect.top;
//       setStartPosition({ x: offsetX, y: offsetY });
//       setEndPosition({ x: offsetX, y: offsetY });
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (startPosition && isEditingEnabled) {
//       const boundingRect = imageRef.current.getBoundingClientRect();
//       const offsetX = e.clientX - boundingRect.left;
//       const offsetY = e.clientY - boundingRect.top;
//       setEndPosition({ x: offsetX, y: offsetY });
//     }
//   };

//   const handleMouseUp = (e) => {
//     if (startPosition && endPosition && isEditingEnabled) {
//       const newSelection = {
//         x: Math.min(startPosition.x, endPosition.x),
//         y: Math.min(startPosition.y, endPosition.y),
//         width: Math.abs(endPosition.x - startPosition.x),
//         height: Math.abs(endPosition.y - startPosition.y),
//       };
//       setSelections([...selections, newSelection]);
//     }
//     setStartPosition(null);
//     setEndPosition(null);
//   };

//   const handleProcess = () => {
//     const formData = new FormData();
//     formData.append("input_image", fileName);
//     formData.append(
//       "dimension",
//       JSON.stringify([originalDimensions.width, originalDimensions.height])
//     );
//     formData.append("bboxes", JSON.stringify(selections));

//     setFolderName("loading");

//     const blinkInterval = setInterval(() => {
//       imageRef.current.style.opacity =
//         imageRef.current.style.opacity === "0" ? "1" : "0";
//     }, 300);

//     axios
//       .post("http://43.205.56.135:8004/process-image", formData)
//       .then((response) => {
//         clearInterval(blinkInterval);
//         setFolderName(response.data.folder_name);
//         const ProcessedimageURL = `data:image/jpeg;base64,${response.data.image}`;
//         navigate(
//           `/processed-image/${encodeURIComponent(ProcessedimageURL)}`
//         );
//       })
//       .catch((error) => {
//         clearInterval(blinkInterval);
//         console.error(error);
//         setFolderName("error");
//       });
//   };

//   const handleToggleEditing = () => {
//     setIsEditingEnabled(!isEditingEnabled);
//     setStartPosition(null);
//     setEndPosition(null);
//     setSelections([]);
//   };

//   const handleMarkerArea = () => {
//     if (imageRef.current) {
//       const markerArea = new markerjs2.MarkerArea(imageRef.current);
//       markerArea.addEventListener("render", (event) => {
//         if (imageRef.current) {
//           imageRef.current.src = event.dataUrl;
//         }
//       });
//       markerArea.show();
//     }
//   };

//   useEffect(() => {
//     const img = new Image();
//     img.src = imageUrl;
//     img.onload = () => {
//       setOriginalDimensions({
//         width: img.width,
//         height: img.height,
//       });
//     };

//     imageRef.current.addEventListener("click", handleMarkerArea);

//     return () => {
//       imageRef.current.removeEventListener("click", handleMarkerArea);
//     };
//   }, [imageUrl]);

//   return (
//     <div
//       style={{
//         background: "#f2f2f2",
//         padding: "50px",
//         borderRadius: "1px",
//         boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           position: "relative",
//         }}
//       >
//         <img
//           ref={imageRef}
//           src={imageUrl}
//           alt="Open Image"
//           style={{
//             maxWidth: adjustedWidth,
//             maxHeight: adjustedHeight,
//             cursor: isEditingEnabled ? "crosshair" : "default",
//           }}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//         />
//         {markers.map((marker, index) => (
//           <div
//             key={index}
//             style={{
//               position: "absolute",
//               border: "2px solid red",
//               left: `${marker.left}px`,
//               top: `${marker.top}px`,
//               width: `${marker.width}px`,
//               height: `${marker.height}px`,
//             }}
//           />
//         ))}
//       </div>
//       <div>
//         <button
//           className="btn btn-success mt-3"
//           style={{
//             backgroundColor: "#4CAF50",
//             color: "white",
//             transition: "background-color 0.3s",
//             marginRight: "10px",
//           }}
//           onClick={handleToggleEditing}
//         >
//           {isEditingEnabled ? "Disable Editing" : "Enable Editing"}
//         </button>
//         <button
//           className="btn btn-success mt-3"
//           style={{
//             backgroundColor: "#4CAF50",
//             color: "white",
//             transition: "background-color 0.3s",
//           }}
//           onClick={handleProcess}
//           disabled={folderName === "loading"}
//         >
//           {folderName === "loading"
//             ? "Wait, your image is under process..."
//             : "Process"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OpenImage;

//below code is of Larger image

// import { MarkerArea } from "markerjs2";
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const OpenImage = ({ imageUrl , fileName}) => {

//   const [markers, setMarkers] = useState([]);
//   const imageRef = useRef(null);
//   const [selections, setSelections] = useState([]);
//   const [folderName, setFolderName] = useState(null);
//   const [originalDimensions, setOriginalDimensions] = useState({
//     width: 0,
//     height: 0,
//   });
//   const navigate = useNavigate();
//   useEffect(() => {
//     const img = new Image();
//     img.src = imageUrl;
//     img.onload = () => {
//       setOriginalDimensions({
//         width: img.width,
//         height: img.height,
//       });
//     };
//   }, [imageUrl]);

//   const handleMarkerArea = () => {
//     if (imageRef.current) {
//       const markerArea = new MarkerArea(imageRef.current);
//       markerArea.addEventListener("render", (event) => {
//         setMarkers(event.data.markers);
//       });
//       markerArea.show();
//     }
//   };

//   const handleProcess = () => {
//     const formData = new FormData();
//     formData.append("input_image", fileName);
//     formData.append(
//       "dimension",
//       JSON.stringify([originalDimensions.width, originalDimensions.height])
//     );
//     formData.append("bboxes", JSON.stringify(selections));

//     setFolderName("loading");

//     const blinkInterval = setInterval(() => {
//       imageRef.current.style.opacity =
//         imageRef.current.style.opacity === "0" ? "1" : "0";
//     }, 300);

//     axios
//       .post("http://43.205.56.135:8004/process-image", formData)
//       .then((response) => {
//         clearInterval(blinkInterval);
//         setFolderName(response.data.folder_name);
//         const ProcessedimageURL = `data:image/jpeg;base64,${response.data.image}`;
//         navigate(
//           `/processed-image/${encodeURIComponent(ProcessedimageURL)}`
//         );
//       })
//       .catch((error) => {
//         clearInterval(blinkInterval);
//         console.error(error);
//         setFolderName("error");
//       });
//   };

//   return (
//     <div>
//       <div>
//         <img
//           ref={imageRef}
//           src={imageUrl}
//           alt="Open Image"
//           onDoubleClick={handleMarkerArea}
//         />
//         {markers.length > 0 && (
//           <div>
//             {markers.map((marker, index) => (
//               <div key={index}>{marker.type}</div>
//             ))}
//             <button onClick={handleProcess}>Process</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OpenImage;
