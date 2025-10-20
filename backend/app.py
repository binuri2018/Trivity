from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
from datetime import datetime, timedelta
import os
from bson import ObjectId
import json
from config import config

app = Flask(__name__)

# Load configuration based on environment
config_name = os.getenv('FLASK_ENV', 'development')
app.config.from_object(config[config_name])

# Initialize extensions with comprehensive CORS configuration
CORS(app, 
     origins=['*'],  # Allow all origins for now
     supports_credentials=True,
     allow_headers=['Content-Type', 'Authorization', 'X-Requested-With'],
     methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
     expose_headers=['Content-Range', 'X-Content-Range'])
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# MongoDB connection using configuration
client = MongoClient(app.config['MONGODB_URL'])
db = client[app.config['MONGODB_DATABASE']]
users_collection = db['users']

class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)

app.json_encoder = JSONEncoder

# Manual CORS handler as backup
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Check if user already exists
        if users_collection.find_one({'email': data['email']}):
            return jsonify({'error': 'User already exists'}), 400
        
        # Hash password
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        
        # Create user
        user = {
            'name': data['name'],
            'email': data['email'],
            'password': hashed_password,
            'created_at': datetime.utcnow()
        }
        
        result = users_collection.insert_one(user)
        user['_id'] = str(result.inserted_id)
        del user['password']
        
        return jsonify({'message': 'User created successfully', 'user': user}), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        # Find user
        user = users_collection.find_one({'email': data['email']})
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Check password
        if not bcrypt.check_password_hash(user['password'], data['password']):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Create access token
        access_token = create_access_token(identity=str(user['_id']))
        
        user['_id'] = str(user['_id'])
        del user['password']
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': user
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        current_user_id = get_jwt_identity()
        user = users_collection.find_one({'_id': ObjectId(current_user_id)})
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        user['_id'] = str(user['_id'])
        del user['password']
        
        return jsonify({'user': user}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    try:
        current_user_id = get_jwt_identity()
        user = users_collection.find_one({'_id': ObjectId(current_user_id)})
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Dashboard data
        dashboard_data = {
            'welcome_message': f'Welcome to your dashboard, {user["name"]}!',
            'user_stats': {
                'total_logins': 1,  # You can implement login tracking
                'account_created': user['created_at'].strftime('%Y-%m-%d'),
                'last_login': datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
            },
            'quick_actions': [
                {'title': 'View Profile', 'action': 'profile'},
                {'title': 'Settings', 'action': 'settings'},
                {'title': 'Logout', 'action': 'logout'}
            ]
        }
        
        return jsonify(dashboard_data), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
