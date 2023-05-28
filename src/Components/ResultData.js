import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { useLocation } from "react-router-dom";
import { Modal, TextField, Button } from '@mui/material';

const TextBox = ({ bbox, text, font, fontSize }) => {
    const style = {
      position: 'absolute',
      top: `${bbox[1]}px`,
      left: `${bbox[0]}px`,
      width: `${bbox[2] - bbox[0]}px`,
      height: `${bbox[3] - bbox[1]}px`,
      fontSize: `${fontSize}px`,
      fontFamily: font,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'black',
      backgroundColor: 'transparent', 
    };
  
    return (
      <div style={style}>
        {text}
      </div>
    );
  };
  
  const EditTextModal = ({ text, onClose, onSave }) => {
    const [updatedText, setUpdatedText] = useState(text);
  
    const handleSave = () => {
      onSave(updatedText);
      onClose();
    };
  
    return (
      <Modal open={true} onClose={onClose}>
        <div style={{ padding: '1em' }}>
          <TextField value={updatedText} onChange={e => setUpdatedText(e.target.value)} />
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Modal>
    );
  };
  
  const ImageEditor = ({ image, textBoxData }) => {
    const imgRef = useRef();
    const [selectedTextBox, setSelectedTextBox] = useState(null);
    const [updatedTexts, setUpdatedTexts] = useState(textBoxData.texts);
  
    // Check if textBoxData and textBoxData.bboxes exist before mapping
    const bboxes = textBoxData && textBoxData.bboxes ? textBoxData.bboxes : [];
  
    const handleSelectChange = (event) => {
      setSelectedTextBox(event.target.value);
    };
  
    const handleCloseModal = () => {
      setSelectedTextBox(null);
    };
  
    const handleSaveText = (updatedText) => {
      const newUpdatedTexts = [...updatedTexts];
      newUpdatedTexts[selectedTextBox] = updatedText;
      setUpdatedTexts(newUpdatedTexts);
    };
  
    const handleDownload = async () => {
      const canvas = await html2canvas(imgRef.current);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'image.png';
      link.click();
    };
  
    return (
      <div style={{ position: 'relative' }}>
        <div ref={imgRef}>
          <img src={image} alt="Uploaded" style={{ height: '400px', objectFit: 'contain' }} />
          {bboxes.map((bbox, index) => (
            <TextBox
              key={index}
              bbox={bbox}
              text={updatedTexts[index]}
              font={textBoxData.fonts[index]}
              fontSize={textBoxData.font_sizes[index]}
            />
          ))}
        </div>
        {selectedTextBox !== null && (
          <EditTextModal
            text={updatedTexts[selectedTextBox]}
            onClose={handleCloseModal}
            onSave={handleSaveText}
          />
        )}
        <button onClick={handleDownload}>Download</button>
        <select onChange={handleSelectChange}>
          <option value={null}>Select a text box to edit</option>
          {textBoxData.texts.map((text, index) => (
            <option key={index} value={index}>{`Text box ${index + 1}: ${text}`}</option>
          ))}
        </select>
      </div>
    );
  };
  

const ResultData = () => {
  const location = useLocation();
  const { textBoxData, imageUrl } = location.state;
  console.log(location.state)
  return (
    <div>
      <ImageEditor image={imageUrl} textBoxData={textBoxData} />
    </div>
  )
}

export default ResultData
