# BlogPost Application

A modern full-stack blog application built with React frontend and Django REST API backend, featuring JWT authentication and a beautiful Material-UI design.

## 🚀 Features

### Authentication & User Management
- User registration and login
- JWT token-based authentication
- User profile management
- Protected routes and API endpoints

### Blog Management
- Create, read, update, and delete blog posts
- Rich text content with optional image URLs
- Author-only edit/delete permissions
- Infinite scroll pagination
- Modern card-based post layout

### UI/UX Features
- Responsive Material-UI design
- Modern gradient navbar with icons
- Floating action button for post creation
- User avatars and timestamps
- Hover effects and smooth transitions
- Mobile-friendly design

## 🛠 Technologies Used

### Frontend
- **React** (18+) - UI framework
- **Material-UI (MUI)** - Component library and theming
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Infinite Scroll Component** - Pagination
- **JWT** - Token authentication

### Backend
- **Django** (5.2+) - Web framework
- **Django REST Framework** - API development
- **Simple JWT** - JWT authentication
- **Django CORS Headers** - Cross-origin requests
- **SQLite** - Database (development)

## 📋 Prerequisites

- **Python** (3.10 or higher)
- **Node.js** (16 or higher)
- **npm** (8 or higher)
- **pip** (Python package manager)

## 🔧 Installation & Setup

### Backend Setup (Django)

1. **Navigate to the project root directory:**
   ```bash
   cd BlogPost
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
   ```

4. **Run database migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create a superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the Django development server:**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup (React)

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

## 🌐 Application URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **Django Admin:** http://localhost:8000/admin

## 📡 API Endpoints

### Authentication
```
POST /api/register/          - User registration
POST /api/token/             - Login (obtain JWT tokens)
POST /api/token/refresh/     - Refresh JWT token
GET  /api/user/              - Get current user info
```

### Blog Posts
```
GET    /api/posts/           - List all posts (paginated)
POST   /api/posts/           - Create new post (auth required)
GET    /api/posts/{id}/      - Get specific post
PUT    /api/posts/{id}/      - Update post (author only)
DELETE /api/posts/{id}/      - Delete post (author only)
```

## 📁 Project Structure

```
BlogPost/
├── backend/
│   ├── settings.py          # Django settings
│   ├── urls.py             # Main URL configuration
│   └── wsgi.py
├── blog/                    # Django app
│   ├── models.py           # Post model
│   ├── serializers.py      # DRF serializers
│   ├── views.py            # API views
│   ├── urls.py             # App URLs
│   └── migrations/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # Auth context
│   │   └── App.js
│   ├── package.json
│   └── public/
├── venv/                   # Python virtual environment
├── manage.py
└── README.md
```

## 🎯 Usage Guide

### Getting Started
1. **Register:** Create a new account on the registration page
2. **Login:** Sign in with your credentials
3. **Browse Posts:** View all blog posts on the home page
4. **Create Posts:** Click the floating "+" button to create new posts
5. **Manage Posts:** Edit or delete your own posts using the action buttons

### User Authentication
- JWT tokens are automatically handled by the frontend
- Tokens are stored in localStorage and sent with API requests
- Users can only edit/delete their own posts
- Authentication is required for creating, editing, and deleting posts

### Post Management
- **Create:** Use the floating action button (+ icon) in the bottom right
- **Edit:** Click the "Edit" button on your own posts
- **Delete:** Click the "Delete" button on your own posts
- **View:** All posts are visible to all users (authenticated and anonymous)

## 🔒 Security Features

- JWT token authentication
- CORS protection
- Author-only permissions for post modifications
- Input validation and sanitization
- Protected API endpoints

## 🎨 Design Features

- **Material Design:** Clean, modern UI with Material-UI components
- **Responsive Layout:** Works seamlessly on desktop and mobile devices
- **Gradient Themes:** Beautiful purple-blue gradient color scheme
- **Interactive Elements:** Hover effects, transitions, and animations
- **Typography:** Custom Inter font for improved readability

## 🔧 Development

### Running in Development Mode
1. Start the Django backend: `python manage.py runserver`
2. Start the React frontend: `npm start` (in frontend directory)
3. Both servers will run concurrently

### Database
- Development uses SQLite database
- Database file: `db.sqlite3`
- Admin panel available at `/admin`

## 🚀 Deployment

### Backend Deployment
- Configure production settings in `settings.py`
- Set up proper database (PostgreSQL recommended)
- Configure static files serving
- Set environment variables for security

### Frontend Deployment
- Build the React app: `npm run build`
- Serve static files from the build directory
- Update API endpoints for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Troubleshooting

### Common Issues

**CORS Errors:**
- Ensure `django-cors-headers` is installed and configured
- Check CORS settings in Django settings

**Authentication Issues:**
- Verify JWT settings are correct
- Check token expiration times
- Ensure frontend is sending tokens correctly

**Database Issues:**
- Run migrations: `python manage.py migrate`
- Check database connection settings

**Frontend Build Issues:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for version compatibility issues

## 📞 Support

For questions or issues, please create an issue in the repository or contact the development team.