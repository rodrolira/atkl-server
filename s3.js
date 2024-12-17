import fs from "fs"
import dotenv from "dotenv";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

dotenv.config()

const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWS_REGION = process.env.AWS_REGION

const client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_PUBLIC_KEY, // asegúrate de que el acceso se tome de las variables de entorno
        secretAccessKey: process.env.AWS_SECRET_KEY

    },
});
console.log('AWS_PUBLIC_KEY:', process.env.AWS_PUBLIC_KEY);
console.log('AWS_SECRET_KEY:', process.env.AWS_SECRET_KEY);


async function uploadFile(file) {
    try {
        const stream = fs.createReadStream(file.filepath);

        const uploadParams = {
            Bucket: AWS_BUCKET_NAME,
            Key: file.newFilename,
            Body: stream,
            ContentType: file.mimetype, // Add content type
            ACL: 'public-read', // Set ACL to public-read for public access
        }

        const command = new PutObjectCommand(uploadParams);
        const result = await client.send(command);

        // Clean up the temporary file after upload
        fs.unlink(file.filepath, (err) => {
            if (err) {
                console.error('Error deleting temporary file:', err);
            }
        });

        return result;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }

}

async function readFile(fileName) {
    const command = new GetObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: fileName
    });

    const result = await client.send(command);
    result.Body.pipe(fs.createWriteStream(`./images/${fileName}`));
    return client.send(command);
}

export { uploadFile, readFile };