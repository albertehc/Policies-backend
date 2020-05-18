# Policies-backend

## Installation & Run
*Install:*
### `npm i or yarn install`
*Production:*
### `npm start or yarn start`
*Development:*
### `npm run build or yarn run build`

## Description

Backend with Express, Json web token, Cookies, Express-validator, Cords, Bcryptjs, Cookie parser.
If you want to implement a real DATABASE you can add on /models/DB.js the querys from your DB
All configs have default settings, if you want to change something rename .env.example to .env and change what you want

## Schemas

clients: [
  {
    id: String,
    name: String,
    email: String,
    passwod: String,
    role: String
  }
]

policies: [
  {
    id: String,
    amountInsured: Number,
    email: String,
    inceptionDate: Date,
    installmentPayment: Boolean,
    clientId: String
  }
]
## Postman Collection

You can import policies.json on POSTMAN to test all API Responses

## API Endpoints

- GET /api/clients/id/:id
  - 200 OK
  - 401 Invalid Token / Unauthorized
  - 404 Not Found
  - 500 Server error
- GET /api/clients/name/:name
  - 200 OK
  - 401 Invalid Token / Unauthorized
  - 404 Not Found
  - 500 Server error
- GET /api/policies/name/:name
  - 200 OK
  - 401 Invalid Token / Unauthorized
  - 404 Not Found
  - 500 Server error
- GET /api/policies/policy/:policy
  - 200 OK
  - 401 Invalid Token / Unauthorized
  - 404 Not Found
  - 500 Server error
- GET /api/auth/me - Check auth
  - 200 OK
  - 400 Validation error
  - 401 Invalid Token / Unauthorized
  - 500 Server error
- POST /api/signup - Register
  Body: { "password": "12345678", "email": "email@email.com", "name": "username" }
  - 200 OK
  - 400 Validation error
  - 500 Server error
- POST /api/auth - Login
  Body: { "password": "12345678", "email": "email@email.com" }
  - 200 OK
  - 400 Validation error
  - 500 Server error
- POST /api/auth/logout - Logout
  Body: { "password": "12345678" }
  - 200 OK
  - 400 Validation error
  - 500 Server error
- PUT /api/auth - Edit user info
  Body: { "oldPassword": "old password", "email": "email@email.com", "name": "username" password: "new password" }
  - 200 OK
  - 400 Validation error
  - 401 Invalid Token / Unauthorized
  - 500 Server error
- DELETE /api/auth - Delete user
  Body: { "password": "password" }
  - 200 OK
  - 400 Validation error
  - 401 Invalid Token / Unauthorized
  - 500 Server error
