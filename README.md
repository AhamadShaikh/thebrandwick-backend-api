# thebrandwick-backend-api
**User Authentication API**
This repository contains the code for a basic user authentication API built using Node.js, Express, MongoDB (assumed as the database), and JSON Web Tokens (JWT) for user authentication. The API provides endpoints for user registration and login.

**Table of Contents**
Features
Installation
Usage
API Endpoints
Dependencies
Configuration
Security Considerations
Contributing
License

**Features**
1. User Registration: Allows users to register with a unique email and securely store their password using bcrypt for hashing.
2. User Login: Provides a login endpoint for existing users to authenticate themselves. Uses bcrypt to compare the entered password with the stored hashed password.
3. JWT Authentication: Generates a JSON Web Token upon successful login, which can be used for subsequent authorized requests. Also, includes a refresh token for extended authentication.

**API Endpoints**

**User Registration**

**Endpoint: POST /register**

Request Body:
{
  "name":"xyz",
  "username":"abc",
  "phone":123456789,
  "email": "user@example.com",
  "password": "securepassword"  
}

**User Login**

**Endpoint: POST /login**

Request Body:
{
  "email": "user@example.com",
  "password": "securepassword"
}

