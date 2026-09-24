# .NET Backend i developed for learning Angular
https://github.com/Chaitanya052002/angular-dotnet-jwt-auth.git

# Angular JWT Authentication

A simple Angular + ASP.NET Core project I built to understand Angular and its integration with a .NET Web API.

## What it has

* Login page using Reactive Forms
* JWT authentication
* HTTP interceptor for adding the token to API requests
* Route guard for the profile page
* Profile page calling a protected API
* Logout
* Basic form validation

## Tech Used

**Frontend**

* Angular
* TypeScript
* HTML/CSS
* RxJS

**Backend**

* ASP.NET Core Web API
* C#
* JWT

## How it works

The user logs in from Angular and the credentials are sent to the ASP.NET Core API.

The API returns a JWT which is stored in the browser. The Angular interceptor adds the token to requests to protected endpoints.

The `/profile` route is protected by an Angular route guard, and the backend also checks the JWT using `[Authorize]`.

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
├── services/
├── app.routes.ts
├── app.ts
└── app.html
```

This is mainly a learning project for Angular and Angular + ASP.NET Core integration.
