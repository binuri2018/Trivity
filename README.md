# User Authentication App

A full-stack user authentication application built with React frontend, Flask backend, and MongoDB database.

## Features

- User registration and login
- JWT-based authentication
- Protected routes and dashboard
- Responsive design with modern CSS
- Password hashing with bcrypt
- MongoDB database integration

## Project Structure

```
trivity2/
├── backend/
│   ├── app.py              # Flask application
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json        # Node.js dependencies
└── README.md
```

## Prerequisites

- Python 3.7+
- Node.js 14+
- MongoDB (local installation or MongoDB Atlas)

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Set up environment configuration:
   ```bash
   python setup_env.py
   ```
   This creates a `local.env` file with secure keys and configuration.

6. Start MongoDB service (if using local MongoDB)

7. Run the Flask application:
   ```bash
   python app.py
   ```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/profile` - Get user profile (protected)
- `GET /api/dashboard` - Get dashboard data (protected)

## Usage

1. Start both the backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Register a new account or login with existing credentials
4. Access the protected dashboard after authentication

## Technologies Used

### Backend
- Flask - Web framework
- Flask-CORS - Cross-origin resource sharing
- Flask-Bcrypt - Password hashing
- Flask-JWT-Extended - JWT token management
- PyMongo - MongoDB driver

### Frontend
- React - UI library
- React Router - Client-side routing
- Axios - HTTP client
- CSS3 - Styling with modern features

### Database
- MongoDB - NoSQL database

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes
- CORS configuration
- Input validation
- Environment-based configuration
- Secure secret key generation
- Configuration separation for different environments

## Development

To modify the application:

1. Backend changes: Edit files in the `backend/` directory
2. Frontend changes: Edit files in the `frontend/src/` directory
3. Both servers support hot reloading during development

## Production Deployment

For production deployment:

1. Set environment variables for JWT secret key
2. Configure MongoDB connection string
3. Build the React app: `npm run build`
4. Use a production WSGI server for Flask (e.g., Gunicorn)
5. Configure reverse proxy (e.g., Nginx)

## License

This project is for educational purposes.
