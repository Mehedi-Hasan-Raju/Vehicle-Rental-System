# 🚗 Vehicle Rental System API

A backend REST API for managing a Vehicle Rental System built with **Node.js**, **Express.js**, **TypeScript**, and **PostgreSQL**. The system provides secure authentication, role-based authorization, vehicle management, user management, and booking management.

---

# 📌 Features

- User Registration & Login
- JWT Authentication
- Role-Based Authorization (Admin & Customer)
- Vehicle Management
- User Management
- Booking Management
- Vehicle Availability Tracking
- Automatic Booking Price Calculation
- Password Hashing using bcrypt
- PostgreSQL Database

---

# 🛠️ Technology Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- bcryptjs
- JSON Web Token (JWT)

---

# 📂 Project Structure

```
src/
│
├── config/
│
├── middleware/
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── vehicles/
│   └── bookings/
│
├── routes/
│
└── server.ts
```

---

# 📊 Database Schema

## Users

| Field | Description |
|--------|-------------|
| id | Auto Generated |
| name | User Name |
| email | Unique Email |
| password | Hashed Password |
| phone | Phone Number |
| role | admin / customer |

---

## Vehicles

| Field | Description |
|--------|-------------|
| id | Auto Generated |
| vehicle_name | Vehicle Name |
| type | car / bike / van / SUV |
| registration_number | Unique Registration Number |
| daily_rent_price | Daily Rent Price |
| availability_status | available / booked |

---

## Bookings

| Field | Description |
|--------|-------------|
| id | Auto Generated |
| customer_id | User ID |
| vehicle_id | Vehicle ID |
| rent_start_date | Booking Start Date |
| rent_end_date | Booking End Date |
| total_price | Calculated Rent |
| status | active / cancelled / returned |

---

# 🔐 Authentication

Passwords are encrypted using **bcrypt**.

After login, users receive a **JWT Token**.

Include the token in every protected request.

```
Authorization: Bearer <your_token>
```

---

# 👥 User Roles

## Admin

- Manage Users
- Manage Vehicles
- View All Bookings
- Return Bookings

## Customer

- Register
- Login
- View Vehicles
- Create Booking
- View Own Bookings
- Cancel Own Booking

---

# 🌐 API Endpoints

## Authentication

| Method | Endpoint | Access |
|----------|-------------------------|----------|
| POST | /api/v1/users | Public (Register) |
| POST | /api/v1/auth/login | Public |

---

## Users

| Method | Endpoint | Access |
|----------|----------------------------|-------------|
| GET | /api/v1/users | Admin |
| PUT | /api/v1/users/:userId | Admin / Own |
| DELETE | /api/v1/users/:userId | Admin |

---

## Vehicles

| Method | Endpoint | Access |
|----------|--------------------------------|-----------|
| POST | /api/v1/vehicles | Admin |
| GET | /api/v1/vehicles | Public |
| GET | /api/v1/vehicles/:vehicleId | Public |
| PUT | /api/v1/vehicles/:vehicleId | Admin |
| DELETE | /api/v1/vehicles/:vehicleId | Admin |

---

## Bookings

| Method | Endpoint | Access |
|----------|--------------------------------|--------------------|
| POST | /api/v1/bookings | Customer / Admin |
| GET | /api/v1/bookings | Role Based |
| PUT | /api/v1/bookings/:bookingId | Role Based |

---

# 📖 Booking Workflow

### Create Booking

- Checks vehicle availability
- Validates booking dates
- Calculates total rental cost
- Creates booking
- Updates vehicle status to **booked**

---

### Get Bookings

- Admin can view all bookings.
- Customer can view only their own bookings.

---

### Update Booking

Customer:

- Can cancel booking before rental starts.

Admin:

- Can mark booking as **returned**.

After cancellation or return:

- Vehicle status changes back to **available**.

---

# 🚀 Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=vehicle_rental

JWT_SECRET=your_secret_key
```

Run the project

```bash
npm run dev
```

---

# 📌 Business Rules

- Email must be unique.
- Passwords are stored in hashed format.
- Registration numbers must be unique.
- Vehicle must be available before booking.
- Rent end date must be after rent start date.
- Booking price is calculated automatically.
- Vehicle status changes automatically during booking and return.
- Vehicles with active bookings cannot be deleted.
- Users with active bookings cannot be deleted.

---

# 📄 License

This project is developed for educational purposes.
