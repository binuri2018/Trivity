import os
from dotenv import load_dotenv

# Load environment variables from local.env file
load_dotenv('local.env')

class Config:
    # JWT Configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # 1 hour in seconds
    
    # MongoDB Configuration
    MONGODB_URL = os.getenv('MONGODB_URL', 'mongodb://localhost:27017/')
    MONGODB_DATABASE = os.getenv('MONGODB_DATABASE', 'auth_app')
    
    # Flask Configuration
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'flask-secret-key-change-in-production')
    DEBUG = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    
    # CORS Configuration
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(',')

class DevelopmentConfig(Config):
    DEBUG = True
    MONGODB_URL = os.getenv('MONGODB_URL', 'mongodb://localhost:27017/')

class ProductionConfig(Config):
    DEBUG = False
    MONGODB_URL = os.getenv('MONGODB_URL')  # Must be set in production

class TestingConfig(Config):
    TESTING = True
    MONGODB_DATABASE = 'auth_app_test'
    MONGODB_URL = os.getenv('MONGODB_URL', 'mongodb://localhost:27017/')

# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
