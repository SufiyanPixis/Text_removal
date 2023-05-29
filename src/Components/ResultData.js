// import React, { useState, useEffect, useRef } from 'react';
// import html2canvas from 'html2canvas';
// import { useLocation } from "react-router-dom";
// import { Modal, TextField, Button } from '@mui/material';

// const TextBox = ({ bbox, text, font, fontSize }) => {
//     const style = {
//       position: 'absolute',
//       top: `${bbox[1]}px`,
//       left: `${bbox[0]}px`,
//       width: `${bbox[2] - bbox[0]}px`,
//       height: `${bbox[3] - bbox[1]}px`,
//       fontSize: `${fontSize}px`,
//       fontFamily: font,
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       color: 'black',
//       backgroundColor: 'transparent', 
//     };
  
//     return (
//       <div style={style}>
//         {text}
//       </div>
//     );
//   };
  
//   const EditTextModal = ({ text, onClose, onSave }) => {
//     const [updatedText, setUpdatedText] = useState(text);
  
//     const handleSave = () => {
//       onSave(updatedText);
//       onClose();
//     };
  
//     return (
//       <Modal open={true} onClose={onClose}>
//         <div style={{ padding: '1em' }}>
//           <TextField value={updatedText} onChange={e => setUpdatedText(e.target.value)} />
//           <Button onClick={handleSave}>Save</Button>
//         </div>
//       </Modal>
//     );
//   };
  
//   const ImageEditor = ({ image, textBoxData }) => {
//     const imgRef = useRef();
//     const [selectedTextBox, setSelectedTextBox] = useState(null);
//     const [updatedTexts, setUpdatedTexts] = useState(textBoxData.texts);
  
//     // Check if textBoxData and textBoxData.bboxes exist before mapping
//     const bboxes = textBoxData && textBoxData.bboxes ? textBoxData.bboxes : [];
  
//     const handleSelectChange = (event) => {
//       setSelectedTextBox(event.target.value);
//     };
  
//     const handleCloseModal = () => {
//       setSelectedTextBox(null);
//     };
  
//     const handleSaveText = (updatedText) => {
//       const newUpdatedTexts = [...updatedTexts];
//       newUpdatedTexts[selectedTextBox] = updatedText;
//       setUpdatedTexts(newUpdatedTexts);
//     };
  
//     const handleDownload = async () => {
//       const canvas = await html2canvas(imgRef.current);
//       const dataUrl = canvas.toDataURL('image/png');
//       const link = document.createElement('a');
//       link.href = dataUrl;
//       link.download = 'image.png';
//       link.click();
//     };
  
//     return (
//       <div style={{ position: 'relative' }}>
//         <div ref={imgRef}>
//           <img src={image} alt="Uploaded" style={{ height: '400px', objectFit: 'contain' }} />
//           {bboxes.map((bbox, index) => (
//             <TextBox
//               key={index}
//               bbox={bbox}
//               text={updatedTexts[index]}
//               font={textBoxData.fonts[index]}
//               fontSize={textBoxData.font_sizes[index]}
//             />
//           ))}
//         </div>
//         {selectedTextBox !== null && (
//           <EditTextModal
//             text={updatedTexts[selectedTextBox]}
//             onClose={handleCloseModal}
//             onSave={handleSaveText}
//           />
//         )}
//         <button onClick={handleDownload}>Download</button>
//         <select onChange={handleSelectChange}>
//           <option value={null}>Select a text box to edit</option>
//           {textBoxData.texts.map((text, index) => (
//             <option key={index} value={index}>{`Text box ${index + 1}: ${text}`}</option>
//           ))}
//         </select>
//       </div>
//     );
//   };
  

// const ResultData = () => {
//   const location = useLocation();
//   const { textBoxData, imageUrl } = location.state;
//   console.log(location.state)
//   return (
//     <div>
//       <ImageEditor image={imageUrl} textBoxData={textBoxData} />
//     </div>
//   )
// }

// export default ResultData
import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { useLocation } from "react-router-dom";
import { Modal, TextField, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

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
        <div style={{ padding: '1em' ,marginTop:'7em'}}>
          <TextField style={{border:'2px solid black'}} value={updatedText} onChange={e => setUpdatedText(e.target.value)} />
          <Button className='btn mt-2 btn-outline-primary' onClick={handleSave}>Save</Button>
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
      <>
        <button 
  onClick={handleDownload} 
  className='btn btn-outline-success' 
  style={{ 
    position: 'fixed', 
    top: '80px', 
    right: '30px', 
    height: '50px' // Adjust this to the desired height
    
  }}
>
  <FontAwesomeIcon icon={faDownload} /> Download 
</button>

  
        <div style={{ position: 'relative' }}>
          <div ref={imgRef}>
            <img src={image} alt="Uploaded" style={{ height: '400px', objectFit: 'contain', border: '2px solid black' }} />
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
              style={{marginTop:40}}
              text={updatedTexts[selectedTextBox]}
              onClose={handleCloseModal}
              onSave={handleSaveText}
            />
          )}
        </div>
  
        <div className='d-flex flex-end mt-2'>
          <select onChange={handleSelectChange} className='form-control' style={{marginLeft:30}}>
            <option value={null}>Select a text box to edit</option>
            {textBoxData.texts.map((text, index) => (
              <option key={index} value={index}>{`Text box ${index + 1}: ${text}`}</option>
            ))}
          </select>
        </div>
      </>
    );
  };
  

const ResultData = () => {
  const location = useLocation();
  const { textBoxData, imageUrl } = location.state;
  console.log(location.state)
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column',
    marginTop: '-95px'  //can move image at top
    }}>
      <ImageEditor image={imageUrl} textBoxData={textBoxData} />
    </div>
  )
}

export default ResultData
