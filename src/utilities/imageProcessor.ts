const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Function to resize an image
async function resizeImage(inputPath: string, outputPath: string, width: string, height: string) {
  try {
    await sharp(inputPath)
      .resize({ width: parseInt(width), height: parseInt(height) })
      .toFile(outputPath);
    console.log('Image resized successfully');
  } catch (error) {
    console.error('Error resizing image:', error);
    throw error;
  }
}

// Function to check if a file exists
function fileExists(filePath: string) {
  return fs.existsSync(filePath);
}

//module.exports = { resizeImage, fileExists };
export default 
{
  resizeImage,
  fileExists
}
