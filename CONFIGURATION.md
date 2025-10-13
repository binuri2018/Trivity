# Configuration Guide

## Environment Configuration

This project uses a secure configuration system that separates sensitive data from the codebase.

### Files Created

1. **`backend/config.py`** - Configuration classes for different environments
2. **`backend/local.env`** - Local environment variables (not committed to git)
3. **`backend/env.example`** - Example environment file for reference
4. **`backend/setup_env.py`** - Script to generate secure configuration
5. **`.gitignore`** - Ensures sensitive files are not committed

### Configuration Structure

```python
# Development Configuration
JWT_SECRET_KEY=generated-secure-key
FLASK_SECRET_KEY=generated-secure-key
MONGODB_URL=mongodb://localhost:27017/
MONGODB_DATABASE=auth_app
FLASK_DEBUG=True
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Security Features

- **Automatic Key Generation**: The setup script generates cryptographically secure keys
- **Environment Separation**: Different configurations for development, testing, and production
- **Git Protection**: Sensitive files are automatically ignored by git
- **CORS Configuration**: Configurable allowed origins for cross-origin requests

### Setup Process

1. **Run the setup script**:
   ```bash
   cd backend
   python setup_env.py
   ```

2. **The script will**:
   - Generate secure JWT and Flask secret keys
   - Create a `local.env` file with all necessary configuration
   - Provide security recommendations

3. **For production**:
   - Use environment variables instead of files
   - Set `FLASK_ENV=production`
   - Use a secure MongoDB connection string
   - Generate new secret keys

### MongoDB Configuration

#### Local MongoDB
```env
MONGODB_URL=mongodb://localhost:27017/
```

#### MongoDB Atlas (Cloud)
```env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_SECRET_KEY` | Secret key for JWT token signing | Generated |
| `FLASK_SECRET_KEY` | Flask session secret key | Generated |
| `MONGODB_URL` | MongoDB connection string | `mongodb://localhost:27017/` |
| `MONGODB_DATABASE` | Database name | `auth_app` |
| `FLASK_DEBUG` | Enable Flask debug mode | `True` |
| `FLASK_ENV` | Flask environment | `development` |
| `CORS_ORIGINS` | Allowed CORS origins | `http://localhost:3000` |

### Production Deployment

For production deployment:

1. **Set environment variables**:
   ```bash
   export JWT_SECRET_KEY="your-production-secret-key"
   export MONGODB_URL="your-production-mongodb-url"
   export FLASK_ENV="production"
   export FLASK_DEBUG="False"
   ```

2. **Use a production WSGI server**:
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

3. **Configure reverse proxy** (Nginx example):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://127.0.0.1:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

### Security Best Practices

1. **Never commit sensitive files** to version control
2. **Use strong, unique secret keys** for each environment
3. **Rotate keys regularly** in production
4. **Use HTTPS** in production
5. **Limit CORS origins** to only necessary domains
6. **Monitor and log** authentication attempts
7. **Use environment variables** in production instead of files

### Troubleshooting

#### Common Issues

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running
   - Check the connection string
   - Verify network connectivity

2. **CORS Errors**:
   - Check `CORS_ORIGINS` configuration
   - Ensure frontend URL is included

3. **JWT Token Issues**:
   - Verify `JWT_SECRET_KEY` is set
   - Check token expiration settings

4. **Environment Not Loading**:
   - Ensure `local.env` file exists
   - Check file permissions
   - Verify `python-dotenv` is installed
