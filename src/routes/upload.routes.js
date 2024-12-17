import express from 'express'
import { uploadFile, readFile } from '../../s3.js'
import formidable from 'formidable';

const router = express.Router()
const upload = formidable({
    multiples: false, // Only one file
    uploadDir: './uploads', // Temporary directory
    keepExtensions: true, // Keep the file extension
});

// Endpoint to upload images
router.post('/upload', (req, res) => {
    // Parse the form data and handle file upload
    upload.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).send({ error: 'File upload failed' });
        }

        // Check if the image file is present
        const file = files['image'][0];  // Get the first file from the 'image' field
        if (!file) {
            return res.status(400).send({ error: 'No image file uploaded' });
        }

        // Log the file details for debugging
        console.log('Uploaded file:', file);

        // Call your uploadFile function
        uploadFile(file).then(() => {
            res.status(200).send({ message: 'Image uploaded successfully', file: file });
        }).catch((error) => {
            res.status(500).send({ error: 'Failed to upload to S3', details: error.message });
        });
    });
});

router.get('/read', async (req, res) => {
    try {
        const result = await readFile(req.params.fileName)
        res.send('Archivo encontrado')
    } catch (error) {
        res.send(error.message)
    }
})

export default router