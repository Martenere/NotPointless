@echo off
setlocal

:: Define paths to ASP.NET and React directories
set "aspnetPath=.\aspnet\restAPI-AspNet"
set "reactPath=.\react"

:: Check if the ASP.NET dependencies need to be restored
if not exist "%aspnetPath%\bin" if not exist "%aspnetPath%\obj" (
  echo Restoring ASP.NET dependencies...
  cd /d %aspnetPath%
  dotnet restore
) else (
  echo ASP.NET dependencies are already restored.
)

:: Launch ASP.NET app in a new cmd window
start cmd /k "cd /d %aspnetPath% && dotnet run restAPI-AspNet.csproj"

:: Check if the React dependencies need to be installed
if not exist "%reactPath%\node_modules" (
  echo Installing React dependencies...
  cd /d %reactPath%
  npm ci
) else (
  echo React dependencies are already installed.
)

:: Launch React app in a new cmd window
start cmd /k "cd /d %reactPath% && npm run dev"

endlocal
