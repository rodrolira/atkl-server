// import multer from 'multer';
// import multerS3 from 'multer-s3';
// import client from '../../s3.js';
// import cloudinary from '../../config/cloudinary.js';
// import dotenv from 'dotenv';

// dotenv.config();

// const bucketName = process.env.AWS_BUCKET_NAME
// const upload = multer({
//     storage: multerS3({
//         s3: client,
//         bucket: bucketName,
//         acl: 'public-read', // Permitir acceso público a los archivos subidos
//         metadata: (req, file, cb) => {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: (req, file, cb) => {
//             const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
//             cb(null, fileName); // Generar un nombre único para cada archivo
//         },
//     }),
// });


// export default upload;
