import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '../../../.env');

dotenv.config({ path: envPath });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? '✓ Loaded' : '✗ Missing',
  api_key: process.env.CLOUDINARY_API_KEY ? '✓ Loaded' : '✗ Missing',
  api_secret: process.env.CLOUDINARY_API_SECRET ? '✓ Loaded' : '✗ Missing'
});

export default cloudinary;
