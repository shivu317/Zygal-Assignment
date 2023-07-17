import React, { useRef } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
  
    let hexData = '';
  
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const hex = rgbToHex(r, g, b);
      hexData += `0x${hex}`;
      if ((i + 4) % (canvas.width * 4) !== 0) {
        hexData += ', ';
      } else {
        hexData += ', \n';
      }
    }
  
    const blob = new Blob([hexData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'canvas_data.txt';
    link.click();
  };
  

  
  const rgbToHex = (r, g, b) => {
    const componentToHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={16}
        height={34}
        style={{ border: '1px solid black' }}
      />
      <br />
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Canvas;
