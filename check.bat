@echo off
REM Check unifie (lint + typecheck + build) - equivalent de make check sur Windows
cd frontend
call pnpm check
if errorlevel 1 (
  echo Check FAILED
  exit /b 1
)
echo OK - Tous les checks ont reussi.
