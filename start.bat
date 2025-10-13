@echo off
echo Starting User Authentication App...
echo.

echo Starting Flask backend...
start "Flask Backend" cmd /k "cd backend && python app.py"

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting React frontend...
start "React Frontend" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Make sure MongoDB is running before using the app!
echo.
pause
