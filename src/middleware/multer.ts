import multer from "multer";
import path from "path";
export default multer({
  storage: multer.diskStorage({
    destination: (_, __, callback) => {
      callback(null, path.join(import.meta.dirname, './../../public/uploads'));
    },
    filename: (_, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      callback(null, uniqueSuffix + '-' + file.originalname);
    },
  }),
  fileFilter: (_, file, callback) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg']; // Allowed MIME types
    allowedMimes.includes(file.mimetype) ? callback(null, true) : callback(new Error('Invalid file type!')); // Reject file
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});