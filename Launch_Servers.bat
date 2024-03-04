@echo off

:: Define paths to ASP.NET and React directories
set "aspnetPath=.\aspnet\restAPI-AspNet"
set "reactPath=.\react"

:: Launch ASP.NET app in a new cmd window
start cmd /k "cd /d %aspnetPath% && dotnet run restAPI-AspNet.csproj"

:: Launch React app in a new cmd window
start cmd /k "cd /d %reactPath% && npm run dev"
