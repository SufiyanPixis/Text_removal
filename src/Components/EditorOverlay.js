// import { Button } from "@mui/material";
// import TextField from "@mui/material/TextField";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import InputLabel from "@mui/material/InputLabel";
// import { ColorPicker, useColor } from "react-color-palette";
// import "react-color-palette/lib/css/styles.css";
// import Tooltip from "@mui/material/Tooltip";
// import {FONTS} from "../utils";
// import React from 'react';


// const EditorOverlay = ({
//   handleOverlay,
//   setTextOverlay,
//   textOverlay,
//   overlay,
//   currentBox,
// }) => {
//   const [color, setColor] = useColor("hex", "#121212");
//   return (
//     <div className="editorContainerOverlay">
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//         }}
//       >
//         <TextField
//           id="outlined-basic"
//           variant="standard"
//           placeholder="enter text"
//           rows={2}
//           onChange={(e) => {
//             overlay.length > 0 &&
//               currentBox !== null &&
//               handleOverlay("UPDATE_OVERLAY_PROPERTY", e.target.value, "text");
//             setTextOverlay(e.target.value);
//           }}
//           value={textOverlay}
//           defaultValue={textOverlay}
//         />
//         <Button
//           variant="contained"
//           style={{ transform: "translateY(10px)" }}
//           onClick={() => handleOverlay("ADD_TEXT")}
//         >
//           ADD TEXT
//         </Button>
//       </div>
//       <div style={{ display: "flex", flexDirection: "column" }}>
//         <div>
//           <FormControl fullWidth variant="standard">
//             <Select
//               value={
//                 overlay.length !== 0 && currentBox !== null
//                   ? overlay[currentBox].fontFamily
//                   : null
//               }
//               defaultValue={
//                 overlay.length !== 0 && currentBox !== null
//                   ? overlay[currentBox].fontFamily
//                   : null
//               }
//               label="font size"
//               size="small"
//               onChange={(e) =>
//                 handleOverlay(
//                   "UPDATE_OVERLAY_PROPERTY",
//                   e.target.value,
//                   "fontFamily"
//                 )
//               }
//               placeholder="font family"
//             >
//               <MenuItem disabled={true}>Font Family</MenuItem>
//               {FONTS.map((font, index) => (
//                 <MenuItem value={font.value} key={index}>
//                   {font.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </div>
//         <div style={{ minWidth: "100px" }}>
//           <TextField
//             id="standard-basic"
//             variant="standard"
//             placeholder="font size"
//             onChange={(e) =>
//               handleOverlay(
//                 "UPDATE_OVERLAY_PROPERTY",
//                 e.target.value,
//                 "fontSize"
//               )
//             }
//             type="number"
//             value={(overlay.length !== 0 && currentBox !== null) ? overlay[currentBox].fontSize : ""}
//           />
//         </div>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         <div>
//           <Tooltip
//             title={
//               <ColorPicker
//                 width={230}
//                 height={200}
//                 hideHSV
//                 hideRGB
//                 dark
//                 color={color}
//                 onChange={(e) => {
//                   setColor(e);
//                   handleOverlay(
//                     "UPDATE_OVERLAY_PROPERTY",
//                     e.hex,
//                     "color"
//                   );
//                 }}
//               />
//             }
//           >
//             <Button
//               style={{
//                 textTransform: "capitalize",
//                 textAlign: "left",
//                 width: "55px",
//                 height: "55px",
//                 borderRadius: "50%",
//               }}
//               variant="contained"
//             >
//               Color
//             </Button>
//           </Tooltip>
//         </div>
//         <div style={{ transform: "translateX(6px)" }}>
//           <Button
//             style={{
//               textTransform: "capitalize",
//               textAlign: "left",
//               width: "55px",
//               height: "55px",
//               borderRadius: "50%",
//             }}
//             variant="contained"
//           >
//             <CloudDownloadIcon
//               style={{
//                 color: "#ffff",
//                 fontSize: "30px",
//                 cursor: "pointer",
//                 transform: "translateX(20px)",
//                 transform: "translateY(0px)",
//               }}
//               onClick={() => handleOverlay("DOWNLOAD")}
//             />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default EditorOverlay;

import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import Tooltip from "@mui/material/Tooltip";
import { FONTS } from "../utils";
import React from 'react';

const EditorOverlay = ({
  handleOverlay,
  setTextOverlay,
  textOverlay,
  overlay,
  currentBox,
  data
}) => {
  const [color, setColor] = useColor("hex", "#121212");

  const renderTextWithFont = (font, text, fontSize, bbox, index) => {
    const style = {
      position: "absolute",
      top: `${bbox[1]}px`,
      left: `${bbox[0]}px`,
      width: `${bbox[2] - bbox[0]}px`,
      height: `${bbox[3] - bbox[1]}px`,
      fontFamily: font,
      fontSize: `${fontSize}px`,
      color: color.hex
    };

    return (
      <div key={index} style={style}>
        {text}
      </div>
    );
  };

  return (
    <div className="editorContainerOverlay">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TextField
          id="outlined-basic"
          variant="standard"
          placeholder="enter text"
          rows={2}
          onChange={(e) => {
            overlay.length > 0 &&
              currentBox !== null &&
              handleOverlay("UPDATE_OVERLAY_PROPERTY", e.target.value, "text");
            setTextOverlay(e.target.value);
          }}
          value={textOverlay}
          defaultValue={textOverlay}
        />
        <Button
          variant="contained"
          style={{ transform: "translateY(10px)" }}
          onClick={() => handleOverlay("ADD_TEXT")}
        >
          ADD TEXT
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <FormControl fullWidth variant="standard">
            <Select
              value={
                overlay.length !== 0 && currentBox !== null
                  ? overlay[currentBox].fontFamily
                  : null
              }
              defaultValue={
                overlay.length !== 0 && currentBox !== null
                  ? overlay[currentBox].fontFamily
                  : null
              }
              label="font size"
              size="small"
              onChange={(e) =>
                handleOverlay(
                  "UPDATE_OVERLAY_PROPERTY",
                  e.target.value,
                  "fontFamily"
                )
              }
              placeholder="font family"
            >
              <MenuItem disabled={true}>Font Family</MenuItem>
              {FONTS.map((font, index) => (
                <MenuItem value={font.value} key={index}>
                  {font.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{ minWidth: "100px" }}>
          <TextField
            id="standard-basic"
            variant="standard"
            placeholder="font size"
            onChange={(e) =>
              handleOverlay(
                "UPDATE_OVERLAY_PROPERTY",
                e.target.value,
                "fontSize"
              )
            }
            type="number"
            value={(overlay.length !== 0 && currentBox !== null) ? overlay[currentBox].fontSize : ""}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Tooltip
            title={
              <ColorPicker
                width={230}
                height={200}
                hideHSV
                hideRGB
                dark
                color={color}
                onChange={(e) => {
                  setColor(e);
                  handleOverlay(
                    "UPDATE_OVERLAY_PROPERTY",
                    e.hex,
                    "color"
                  );
                }}
              />
            }
          >
            <Button
              style={{
                textTransform: "capitalize",
                textAlign: "left",
                width: "55px",
                height: "55px",
                borderRadius: "50%",
              }}
              variant="contained"
            >
              Color
            </Button>
          </Tooltip>
        </div>
        <div style={{ transform: "translateX(6px)" }}>
          <Button
            style={{
              textTransform: "capitalize",
              textAlign: "left",
              width: "55px",
              height: "55px",
              borderRadius: "50%",
            }}
            variant="contained"
          >
            <CloudDownloadIcon
              style={{
                color: "#ffff",
                fontSize: "30px",
                cursor: "pointer",
                transform: "translateX(20px)",
                transform: "translateY(0px)",
              }}
              onClick={() => handleOverlay("DOWNLOAD")}
            />
          </Button>
        </div>
      </div>
      {data.texts.map((text, index) => (
        renderTextWithFont(
          data.fonts[index % data.fonts.length],
          text,
          data.font_sizes[index % data.font_sizes.length],
          data.bboxes[index],
          index
        )
      ))}
    </div>
  );
};

export default EditorOverlay;
