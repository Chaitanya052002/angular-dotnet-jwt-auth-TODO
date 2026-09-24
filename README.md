# Angular JWT Authentication

A simple Angular + ASP.NET Core project I built to learn Angular and its integration with a .NET Web API.

## Backend

.NET backend repository:

[ASP.NET Core Backend](https://github.com/Chaitanya052002/angular-dotnet-jwt-auth.git)

## What it has

* Login using Reactive Forms
* Form validation
* JWT authentication
* HTTP interceptor for adding the JWT to API requests
* Route guard for protected routes
* Profile page using a protected API
* Logout
* Tasks CRUD
* Loading and error states
* Angular service for API calls

## Tech Used

**Frontend**

* Angular
* TypeScript
* RxJS
* HTML/CSS

**Backend**

* ASP.NET Core Web API
* C#
* Entity Framework Core
* SQLite
* JWT Authentication

## How it works

The user logs in from Angular and the credentials are sent to the ASP.NET Core API.

The API returns a JWT which is stored in the browser. The Angular HTTP interceptor automatically adds the token to requests that need authentication.

The `/profile` and `/tasks` routes are protected by an Angular route guard. The backend also uses `[Authorize]` to protect the API endpoints.

The Tasks page uses the ASP.NET Core API for:

```text
GET     /api/Tasks
POST    /api/Tasks
PUT     /api/Tasks/{id}
DELETE  /api/Tasks/{id}
```

Task data is stored in a SQLite database using Entity Framework Core.

## Run locally

### Angular

```bash
npm install
ng serve
```

Frontend runs on:

`http://localhost:4200`

### ASP.NET Core

Run the API from Visual Studio or:

```bash
dotnet run
```

The current API is configured to run on:

`https://localhost:7225`

## Demo Login

```text
Username: admin
Password: admin123
```

## Project Structure

```text
src/app/
├── guards/
├── interceptors/
├── login/
├── profile/
├── tasks/
├── services/
│   ├── auth.service.ts
│   └── task.service.ts
├── app.routes.ts
├── app.ts
└── app.html
```

This is mainly a learning project for Angular and Angular + ASP.NET Core integration.
