import express from 'express';
import path from 'path';
import fs from 'fs';
import imageProcessor from './utilities/imageProcessor';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'images')));

app.use(express.json());

// Endpoint to process and display resized image
app.get('/api', async (req, res) => {
  const { filename, width, height } = req.query as { filename: string; width: string; height: string };
   // Check if filename, width, and height parameters are provided
   if (!filename || !width || !height) {
    return res.status(400).json({ error: 'Filename, width, and height parameters are required' });
  }

  const parsedWidth = parseInt(width, 10);
  const parsedHeight = parseInt(height, 10);

  // Validate width and height parameters
  if (isNaN(parsedWidth) || isNaN(parsedHeight) || parsedWidth <= 0 || parsedHeight <= 0) {
    return res.status(400).json({ error: 'Width and height parameters must be positive integers' });
  }

  const imagePath = path.join(__dirname, '..', 'src', 'images', filename);
  // Check if the image file exists
  if (!imageProcessor.fileExists(imagePath)) {
    return res.status(404).json({ error: 'Image file not found' });
  }

  const outputDir = path.join(__dirname,'resized_images');
  // Check if the outputDir not exists
  if(!imageProcessor.fileExists(outputDir))
  {
    fs.mkdirSync(outputDir);
  }
  
  const resizedImageFilename = `${filename.split('.')[0]}-${parsedWidth}-${parsedHeight}.jpg`;
  const outputPath = path.join(outputDir, resizedImageFilename);

  try {
    // Check if the resized image already exists in the cache
    if (!imageProcessor.fileExists(outputPath)) {
      // Resize the original image and save it to the cache
      await imageProcessor.resizeImage(imagePath, outputPath, width, height);
    }

    // Serve the resized image to the user
    res.sendFile(outputPath);
  } catch (error) {
    console.error('Error serving resized image:', error);
    res.status(500).json({ error: 'Error serving resized image' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export the app variable
export default app; 
