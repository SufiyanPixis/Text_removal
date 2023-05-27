import Draggable from "react-draggable";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const findColor = (color) => {
  return color;
};
const Overlay = ({
  overlay,
  setCurrentBox,
  handleOverlay,
  currentBox,
  setTextOverlay,
  afterFile,
  dimension,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3F3F40",
      }}
    >
      <div
        id="preview"
        style={{
          backgroundImage: `url(${URL.createObjectURL(afterFile)})`,
          backgroundSize: "cover",
          width: dimension.x + "px",
          height: dimension.y + "px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        {overlay.map((box, index) => (
          <Draggable
            bounds="#preview"
            position={{
              x: box.x,
              y: box.y,
            }}
            onStop={(e, data) => {
              e.stopPropagation();
              const { x, y } = data;
              handleOverlay("UPDATE_OVERLAY_POSITION", { x, y, index });
              setCurrentBox(index);
              setTextOverlay(box.text);
            }}
            key={index}
            axis="both"
          >
            <Tooltip
              title={
                <IconButton>
                  <DeleteIcon onClick={() => handleOverlay("DELETE_BOX", {index})} style={{color:"red",backgroundColor:"#eeee"}}/>
                </IconButton>
              }
              style={{
                border:
                  currentBox === index
                    ? "1px solid #ffff"
                    : "1px solid black",
                display: "block",
                color: findColor(box.color),
                fontSize: box.fontSize + "px",
                fontFamily: box.fontFamily,
                position:"absolute"
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentBox(index);
                  setTextOverlay(box.text);
                }}
              >
                {box.text}
              </div>
            </Tooltip>
          </Draggable>
        ))}
      </div>
    </div>
  );
};
export default Overlay;
