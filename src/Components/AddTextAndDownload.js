import React, { useRef, useEffect, useState } from 'react';

const AddTextAndDownload = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const [text, setText] = useState('');
  const image = new Image();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    image.onload = () => { 
      canvas.width = 300; 
      canvas.height = 300;
      context.drawImage(image, 0, 0, 300, 300);
    };

    image.src = imageUrl;
  }, [imageUrl]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleDrawText = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.font = '40px Arial';
    context.fillText(text, 50, 50); // adjust these values to change text position
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const imageURI = canvas.toDataURL('image/png');

    let link = document.createElement('a');
    link.download = 'image.png';
    link.href = imageURI;
    link.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <canvas ref={canvasRef} style={{ margin: 'auto' }} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <input type="text" value={text} onChange={handleTextChange} />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleDrawText}>Add Text</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default AddTextAndDownload;

