const { Camera, closeQuietly } = require('../src');
const path = require('path');
const camera = new Camera();

camera.initialize();

console.log('Camera =>', camera);

const cameraFile = camera.captureImage();

// cameraFile.save(path.join(__dirname, 'capture.jpg'));

closeQuietly(cameraFile);
closeQuietly(camera);