#!/usr/bin/env python3
"""
Environment setup script for the authentication app.
This script helps you create your local.env file with secure configuration.
"""

import os
import secrets
import string

def generate_secret_key(length=50):
    """Generate a secure random secret key."""
    alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
    return ''.join(secrets.choice(alphabet) for _ in range(length))

def create_env_file():
    """Create local.env file with secure defaults."""
    env_file = 'local.env'
    
    if os.path.exists(env_file):
        print(f"WARNING: {env_file} already exists!")
        print("Overwriting existing file...")
    
    # Generate secure keys
    jwt_secret = generate_secret_key()
    flask_secret = generate_secret_key()
    
    env_content = f"""# JWT Configuration
JWT_SECRET_KEY={jwt_secret}
FLASK_SECRET_KEY={flask_secret}

# MongoDB Configuration
MONGODB_URL=mongodb://localhost:27017/
MONGODB_DATABASE=auth_app

# Flask Configuration
FLASK_DEBUG=True
FLASK_ENV=development

# CORS Configuration (comma-separated for multiple origins)
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Production MongoDB URL (for MongoDB Atlas)
# MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
"""
    
    with open(env_file, 'w') as f:
        f.write(env_content)
    
    print(f"SUCCESS: Created {env_file} with secure configuration!")
    print("\nConfiguration details:")
    print(f"   - JWT Secret Key: Generated ({len(jwt_secret)} characters)")
    print(f"   - Flask Secret Key: Generated ({len(flask_secret)} characters)")
    print(f"   - MongoDB URL: mongodb://localhost:27017/")
    print(f"   - Database: auth_app")
    print(f"   - CORS Origins: http://localhost:3000,http://127.0.0.1:3000")
    print("\nSecurity notes:")
    print("   - Keep your local.env file secure and never commit it to version control")
    print("   - For production, use environment variables or a secure secret management system")
    print("   - Change the MongoDB URL if using MongoDB Atlas or a remote database")

def main():
    print("Authentication App Environment Setup")
    print("=" * 40)
    print()
    
    create_env_file()
    
    print("\nNext steps:")
    print("   1. Make sure MongoDB is running on your system")
    print("   2. Run 'python app.py' to start the Flask server")
    print("   3. In another terminal, run 'npm start' in the frontend directory")
    print("   4. Open http://localhost:3000 in your browser")

if __name__ == "__main__":
    main()
