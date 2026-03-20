# AZUNO Technologies - Backend API

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Variables

The backend reads from the `.env` file in the root directory. Make sure you have:

```
MONGODB_URI=mongodb+srv://azunotechnologies_db_user:GQeyhRJotS98kuVx@azuno.0knci4h.mongodb.net/?appName=Azuno
JWT_SECRET=f8d9e2c7a1b4f6e3d5c8a9b2e4f7d6c9a1b3e5f7d8c9a2b4e6f8d9c1a3e5f7
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=dhww31v0g
CLOUDINARY_API_KEY=845716946798846
CLOUDINARY_API_SECRET=EhhmIpnj9rjdIdt4yip79oIglts
PORT=5000
NODE_ENV=development
CORS_ORIGIN_LOCAL=http://localhost:3000,http://localhost:5173
```

### 3. Start Server

```bash
npm run dev    # Development mode with auto-reload
npm start      # Production mode
```

The server will run on `http://localhost:5000`

### 4. Create Admin User

Send a POST request to `/api/auth/register`:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@azunotech.com",
    "password": "your_secure_password"
  }'
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register admin user
- `POST /api/auth/login` - Login admin user

### Site Settings

- `GET /api/site-settings` - Get site settings (public)
- `PUT /api/site-settings` - Update site settings (protected)

### Hero

- `GET /api/hero` - Get hero content (public)
- `PUT /api/hero` - Update hero content (protected)

### Services

- `GET /api/services` - Get all services (public)
- `GET /api/services/:id` - Get single service (public)
- `POST /api/services` - Create service (protected)
- `PUT /api/services/:id` - Update service (protected)
- `DELETE /api/services/:id` - Delete service (protected)

### Projects

- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/:id` - Get single project (public)
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Team

- `GET /api/team` - Get all team members (public)
- `GET /api/team/:id` - Get single team member (public)
- `POST /api/team` - Create team member (protected)
- `PUT /api/team/:id` - Update team member (protected)
- `DELETE /api/team/:id` - Delete team member (protected)

### Blog

- `GET /api/blog` - Get all blog posts (public)
- `GET /api/blog/:id` - Get single blog post (public)
- `POST /api/blog` - Create blog post (protected)
- `PUT /api/blog/:id` - Update blog post (protected)
- `DELETE /api/blog/:id` - Delete blog post (protected)

### Testimonials

- `GET /api/testimonials` - Get all testimonials (public)
- `GET /api/testimonials/:id` - Get single testimonial (public)
- `POST /api/testimonials` - Create testimonial (protected)
- `PUT /api/testimonials/:id` - Update testimonial (protected)
- `DELETE /api/testimonials/:id` - Delete testimonial (protected)

### Contact

- `POST /api/contact` - Submit contact form (public)
- `GET /api/contact` - Get all submissions (protected)
- `PUT /api/contact/:id` - Update submission status (protected)
- `DELETE /api/contact/:id` - Delete submission (protected)

### Upload

- `POST /api/upload` - Upload image to Cloudinary (protected)
- `DELETE /api/upload/:publicId` - Delete image from Cloudinary (protected)

## Features

✅ MongoDB Atlas integration
✅ Cloudinary image hosting
✅ JWT authentication
✅ RESTful API design
✅ Rate limiting
✅ Security headers (Helmet)
✅ CORS configuration
✅ Request compression
✅ Logging with Morgan
✅ Error handling
✅ Input validation

## Technologies

- **Express.js** - Web framework
- **MongoDB & Mongoose** - Database
- **Cloudinary** - Image hosting
- **JWT** - Authentication
- **Multer** - File uploads
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
