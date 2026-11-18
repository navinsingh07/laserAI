@echo off
echo ========================================================
echo   Starting Laser AI Feedback Intelligence Platform
echo ========================================================

echo.
echo [1/2] Starting Python FastAPI Backend on http://localhost:8000 ...
start "Laser AI Backend (FastAPI)" cmd /k "cd /d %~dp0backend && .\venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

echo.
echo [2/2] Starting React + Vite Frontend on http://localhost:5173 ...
start "Laser AI Frontend (Vite)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================================
echo   Laser AI is running!
echo   - Interactive Dashboard:  http://localhost:5173
echo   - Interactive API Docs:   http://localhost:8000/docs
echo ========================================================
pause
