# ASP.NET and React Project Overview

This project integrates a React frontend with an ASP.NET REST API, focusing on authentication, data management, and interaction between frontend and backend.

<img src="https://github.com/Martenere/NotPointless/blob/main/Login.png" alt="drawing" width="600"/>

## Current Features

- **Authentication**: Supports user authentication.
- **CRUD Operations**: Enables Create, Read, Update, and Delete operations on data.
- **JWT Tokens**: Manages JWT token creation and endpoint authorization.
- **Data Interaction**: Allows data visualization and insertion via the frontend.

## Future Enhancements

- **Account Creation**: Implement account creation on the frontend.
- **Tokens in frontend**: Enhance frontend to acquire and use JWT tokens.
- **Move from in memory DB to postgre**: To allow for persistent data storage
- **Dockerization**

## Test Run

**Requirements**: Ensure `dotnet` and `node` are installed.

**Installation**:
- Run `npm ci` in the `/react/` directory.
- Install backend dependencies in `/aspnet/`.

**Launching Servers**:
- Execute `launch_apps.bat`.

**Access**:
- Go to [http://localhost:3000/](http://localhost:3000/).
