# Dockerized Express.js CRUD Application

A simple CRUD (Create, Read, Update, Delete) application built with Express.js, using Docker for containerization. It includes user registration, login, and management features, backed by a PostgreSQL database.

## Features

- User authentication (registration, login) with JWT
- User management (list, view, update, delete)
- Role-based authorization (admin vs regular users)
- Containerized with Docker and Docker Compose
- PostgreSQL database for data persistence

## Prerequisites

- Docker
- Docker Compose

## Setup

1. Clone the repository
```bash
git clone https://github.com/Johnnyevans32/Dockerized-Express-CRUD-App.git
cd expressjs
```

2. Create an environment file
```bash
cp env.example .env
```

3. Build and start the application
```bash
docker-compose up --build
```

This will:
- Start the PostgreSQL database on port `5432`
- Build and run the Express.js application on port `3000`

Visit `http://localhost:3000` to access the application.

## Project Structure

- `src/index.js`: Entry point of the Express.js application
- `src/models/`: Database models using Sequelize ORM
- `src/controllers/`: API controllers for handling requests
- `src/routes/`: API route definitions
- `src/middleware/`: Custom middleware functions
- `src/config/`: Configuration files
- `Dockerfile`: Container configuration for the Express.js application
- `docker-compose.yml`: Multi-container setup for the application and database

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Authenticate a user and get a token

### Users (protected routes, require authentication)
- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get a specific user
- `PUT /api/users/:id`: Update a user
- `DELETE /api/users/:id`: Delete a user (admin only)

## Notes

- The first registered user is automatically assigned admin privileges
- Regular users can only update their own information
- Only admins can delete other users
- The application uses JWT for authentication with a 24-hour token validity
- Database data is persisted in a Docker volume 