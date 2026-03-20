# AZUNO Technologies - Full Stack Software House Website

A modern, full-featured website for a software house built with React (Vite), Node.js/Express, MongoDB, and Cloudinary.

## Features

✅ **Modern Tech Stack**

- Frontend: React 18 + Vite + TypeScript + Tailwind CSS
- Backend: Node.js + Express + MongoDB
- Image Storage: Cloudinary
- Authentication: JWT

✅ **Complete CMS Admin Panel**

- Manage site settings, logo, company info
- Edit hero section content
- CRUD operations for services, projects, team, blog, testimonials
- Upload images to Cloudinary
- View and manage contact form submissions

✅ **Dynamic Content Management**

- All website content editable from admin panel
- React Icons integration for dynamic service icons
- Real-time updates without code changes

✅ **Comprehensive Pages**

- Home
- Services
- Technologies (with tech stack showcase)
- About
- Portfolio
- Pricing
- Blog
- Careers
- Contact

✅ **Modern Features**

- Dark/Light theme toggle
- Responsive design
- Animated transitions (Motion)
- SEO optimized
- Fast performance

---

## Project Structure

```
AZUNOWeb/
├── public/                  # Static assets (logo, favicon)
├── server/                  # Backend API
│   ├── src/
│   │   ├── config/         # Cloudinary config
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth & upload middleware
│   │   └── index.js        # Server entry point
│   ├── package.json
│   └── README.md
├── src/                     # Frontend React app
│   ├── components/
│   │   ├── admin/          # Admin panel components
│   │   ├── pages/          # Page components
│   │   └── ui/             # Reusable UI components
│   ├── contexts/           # React contexts
│   ├── App.tsx
│   ├── routes.ts
│   └── main.tsx
├── .env                     # Environment variables
├── package.json
└── README.md
```

---

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account

### 1. Install Dependencies

#### Frontend

```bash
npm install
```

#### Backend

```bash
cd server
npm install
```

### 2. Environment Variables

The root `.env` file contains all configuration:

```env
# Database
MONGODB_URI=mongodb+srv://azunotechnologies_db_user:GQeyhRJotS98kuVx@azuno.0knci4h.mongodb.net/?appName=Azuno

# JWT Auth
JWT_SECRET=f8d9e2c7a1b4f6e3d5c8a9b2e4f7d6c9a1b3e5f7d8c9a2b4e6f8d9c1a3e5f7
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=dhww31v0g
CLOUDINARY_API_KEY=845716946798846
CLOUDINARY_API_SECRET=EhhmIpnj9rjdIdt4yip79oIglts

# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN_LOCAL=http://localhost:3000,http://localhost:5173
```

### 3. Start Development Servers

#### Terminal 1 - Frontend (Vite)

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

#### Terminal 2 - Backend API

```bash
cd server
npm run dev
```

Backend runs on: `http://localhost:5000`

### 4. Create Admin User

After starting the backend, create your admin account:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@azunotech.com",
    "password": "your_secure_password"
  }'
```

Or use the admin login page at: `http://localhost:5173/admin/login`

---

## Usage

### Accessing the Admin Panel

1. Navigate to `http://localhost:5173/admin/login`
2. Login with your credentials
3. Access the dashboard at `http://localhost:5173/admin/dashboard`

### Admin Panel Features

#### Site Settings Tab

- Change company name
- Update tagline
- Upload logo
- Edit contact information
- Manage social media links
- Set default theme

#### Hero Section Tab

- Edit hero title, subtitle, description
- Set call-to-action text and link
- Upload hero background image

#### Services Tab

- Add/Edit/Delete services
- Upload service images
- Set service icons (React Icons)
- Reorder services

#### Projects Tab

- Add/Edit/Delete portfolio projects
- Upload project images
- Mark projects as featured
- Add technologies used
- Include case study details

#### Team Tab

- Add/Edit/Delete team members
- Upload member photos
- Link social profiles
- Reorder team members

#### Blog Tab

- Create/Edit/Delete blog posts
- Upload featured images
- Set categories and tags
- Mark posts as featured
- Publish/unpublish posts

#### Testimonials Tab

- Add/Edit/Delete testimonials
- Upload client photos
- Set ratings (1-5 stars)
- Reorder testimonials

#### Contacts Tab

- View all contact form submissions
- Mark as read/replied
- Delete submissions

---

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register admin user
- `POST /api/auth/login` - Login

### Site Settings

- `GET /api/site-settings` - Get settings (public)
- `PUT /api/site-settings` - Update settings (protected)

### Hero

- `GET /api/hero` - Get hero content (public)
- `PUT /api/hero` - Update hero content (protected)

### Services

- `GET /api/services` - List all services
- `POST /api/services` - Create service (protected)
- `PUT /api/services/:id` - Update service (protected)
- `DELETE /api/services/:id` - Delete service (protected)

### Projects

- `GET /api/projects` - List projects (?featured=true, ?category=Web)
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Team

- `GET /api/team` - List team members
- `POST /api/team` - Create member (protected)
- `PUT /api/team/:id` - Update member (protected)
- `DELETE /api/team/:id` - Delete member (protected)

### Blog

- `GET /api/blog` - List posts (?featured=true, ?category=AI)
- `POST /api/blog` - Create post (protected)
- `PUT /api/blog/:id` - Update post (protected)
- `DELETE /api/blog/:id` - Delete post (protected)

### Testimonials

- `GET /api/testimonials` - List testimonials
- `POST /api/testimonials` - Create testimonial (protected)
- `PUT /api/testimonials/:id` - Update testimonial (protected)
- `DELETE /api/testimonials/:id` - Delete testimonial (protected)

### Contact

- `POST /api/contact` - Submit form (public)
- `GET /api/contact` - List submissions (protected)
- `PUT /api/contact/:id` - Update status (protected)
- `DELETE /api/contact/:id` - Delete submission (protected)

### Upload

- `POST /api/upload` - Upload image to Cloudinary (protected)
- `DELETE /api/upload/:publicId` - Delete image (protected)

---

## Technologies Used

### Frontend

- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Motion (Framer Motion)** - Animations
- **React Router** - Routing
- **React Icons** - Icon library
- **Radix UI** - Accessible components
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **Cloudinary** - Image hosting
- **Multer** - File uploads
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin requests

---

## Building for Production

### Frontend

```bash
npm run build
```

Output: `dist/` directory

### Backend

```bash
cd server
NODE_ENV=production node src/index.js
```

---

## Customization

### Changing Colors

Edit `tailwind.config.js` to customize the color scheme.

### Adding New Pages

1. Create component in `src/components/pages/`
2. Add route in `src/routes.ts`
3. Add navigation link in `src/components/Navigation.tsx`

### Adding New API Endpoints

1. Create route file in `server/src/routes/`
2. Create model in `server/src/models/` (if needed)
3. Import and use in `server/src/index.js`

---

## Support

For issues or questions:

- Email: hello@azunotech.com
- GitHub Issues: [Your repo URL]

---

## License

Proprietary - AZUNO Technologies © 2025

---

## Credits

Developed by AZUNO Technologies Team
