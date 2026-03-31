import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log('File received:', file.originalname, 'Type:', file.mimetype);
    
    // Check if it's an image by mimetype
    if (file.mimetype.startsWith('image/')) {
      console.log('File accepted');
      return cb(null, true);
    } else {
      console.log('File rejected - not an image type');
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Upload endpoint
router.post('/', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer error
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size too large. Max 5MB allowed.' });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // Other errors
      return res.status(400).json({ error: err.message });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const imageUrl = `/uploads/${req.file.filename}`;
      console.log('Image uploaded successfully:', imageUrl);
      res.json({ 
        success: true, 
        imageUrl,
        filename: req.file.filename 
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: error.message });
    }
  });
});

export default router;
