@echo off
echo Setting up User Authentication App...
echo.

echo Installing Python dependencies...
cd backend
python -m pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Error installing Python dependencies
    pause
    exit /b 1
)

echo.
echo Installing Node.js dependencies...
cd ..\frontend
npm install
if %errorlevel% neq 0 (
    echo Error installing Node.js dependencies
    pause
    exit /b 1
)

echo.
echo Setup completed successfully!
echo.
echo To start the application:
echo 1. Start MongoDB service
echo 2. Run 'python app.py' in the backend directory
echo 3. Run 'npm start' in the frontend directory
echo 4. Open http://localhost:3000 in your browser
echo.
pause
