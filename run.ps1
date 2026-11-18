# Laser AI Runner Script
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Starting Laser AI Feedback Intelligence Platform" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

$root = $PSScriptRoot

Write-Host "`n[1/2] Starting Python FastAPI Backend on http://localhost:8000 ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend'; .\venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

Write-Host "`n[2/2] Starting React + Vite Frontend on http://localhost:5173 ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\frontend'; npm run dev"

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host "  Laser AI is running!" -ForegroundColor Green
Write-Host "  - Interactive Dashboard:  http://localhost:5173" -ForegroundColor White
Write-Host "  - Interactive API Docs:   http://localhost:8000/docs" -ForegroundColor White
Write-Host "========================================================`n" -ForegroundColor Green
