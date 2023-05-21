// import React, { useRef, useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faDownload } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import * as markerjs2 from "markerjs2";

// const AddTextAndDownload = ({ imageUrl }) => {
//   const imageRef = useRef(null);
//   const navigate = useNavigate();
//   const [annotatedImageUrl, setAnnotatedImageUrl] = useState(null);
//   let markerArea = null;

  


  

  

//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = annotatedImageUrl || imageUrl;
//     link.download = "image.jpg"; // You can specify the desired filename here
//     link.click();
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
//           top: "-75px", // Adjust the top position to move the button slightly higher
//           right: "60px", // Add right spacing to position the button on the right side
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
//       </div>

//       <img
//         src={annotatedImageUrl || imageUrl}
//         width={600}
//         alt="Image"
//         ref={imageRef}
//       />
//     </div>
//   );
// };

// export default AddTextAndDownload;

import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";


const AddTextAndDownload = ({ imageUrl }) => {
  console.log("im iamgeurl in final page",imageUrl)
  const imageRef = useRef(null);
  const [annotatedImageUrl, setAnnotatedImageUrl] = useState(null);
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = annotatedImageUrl || imageUrl;
    link.download = "image.jpg"; // You can specify the desired filename here
    link.click();
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
          top: "-75px", // Adjust the top position to move the button slightly higher
          right: "60px", // Add right spacing to position the button on the right side
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
      </div>

      <img
        src={annotatedImageUrl || imageUrl}
        width={600}
        alt="Image"
        ref={imageRef}
      />
    </div>
  );
};

export default AddTextAndDownload;
