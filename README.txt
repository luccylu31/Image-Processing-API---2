# Image Processing API
This is an API for processing and resizing images based on user specifications.
The API uses Express to create and manage endpoints.
Use Sharp to perform image processing operations such as resizing.
Images are saved after being resized in the resize folder.

## Features
- Allows users to specify the filename, width, and height to resize the image.
- Saves resized images to a specified directory on the server.

## Installation
1. Unzip the source folder
2. Install dependencies: 
npm init -y
npm i --save-dev nodemon
npm i --save-dev prettier@2.5.1
npm i --save-dev eslint@8.8.0
npm i --save-dev eslint-plugin-prettier@4.0.0
npm i --save-dev typescript
npm i --save-dev ts-node 
npm i --save-dev @types/node
npm i --save-dev @types/express
npm i --save-dev @types/jasmine
npm i --save-dev @types/supertest


##Usage
1. Start the server:
npm run build
npm run start

2. Send a GET request to the `/api` endpoint with the following query parameters:
- `filename`: The name of the image file to resize.
- `width`: The desired width of the resized image.
- `height`: The desired height of the resized image.

Example: http://localhost:3000/api?filename=encenadaport.jpg&width=300&height=500

3.Unit test with Jasmin
File: "Image-Processing-API\src\tests\indexSpec.ts"
Test case:
    √ 1.responds with resized image when valid parameters are provided
    √ 2.responds with 400 error when filename parameter is missing    
    √ 3.responds with 404 error when file name not exist
    √ 4.responds with 400 error when width or height parameter is missing
    √ 5.responds with resized image when valid parameters are provided




