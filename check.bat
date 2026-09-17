@echo off
REM Check unifié (lint + typecheck + build) — équivalent de make check sur Windows
setlocal

echo [1/2] Backend: go build...
cd backend
go build ./...
if errorlevel 1 (
  echo Backend build FAILED
  exit /b 1
)
cd ..

echo [2/2] Frontend: pnpm check...
cd frontend
call pnpm check
if errorlevel 1 (
  echo Frontend check FAILED
  exit /b 1
)
cd ..

echo.
echo OK - Tous les checks ont reussi.
exit /b 0
