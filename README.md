# 🚗 Vehicle Rental System API

## Live URL:

```

https://vehicle-rental-seven.vercel.app/

```

---

## 📌 Project Overview

The **Vehicle Rental System API** is a backend application designed to manage vehicle rentals with secure authentication and role-based access control.

This system allows:

- **Admins** to manage vehicles, users, and all bookings
- **Customers** to browse vehicles and manage their own bookings
- **Automatic price calculation** and vehicle availability tracking

The API strictly follows **RESTful principles** and provides consistent request and response structures.

---

## ✨ Features

### 🔐 Authentication & Authorization

- User registration and login using JWT
- Secure password hashing with bcrypt
- Role-based access control (Admin & Customer)

### 🚗 Vehicle Management

- Add, update, view, and delete vehicles (Admin only)
- Public access to vehicle listings
- Availability tracking (available, booked)
- Prevent deletion of vehicles with active bookings

### 👥 User Management

- Admin can view, update, and delete users
- Customers can update their own profile
- Users with active bookings cannot be deleted

### 📅 Booking Management

- Create bookings with start and end dates
- Automatic rental price calculation
- Prevents double-booking for overlapping dates
- Role-based booking views:
  - Admin sees all bookings
  - Customer sees only their own bookings
- Booking lifecycle:
  - `active`
  - `cancelled`
  - `returned`
- Vehicle availability updates automatically

---

## 🛠️ Technology Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- bcrypt (password hashing)
- jsonwebtoken (JWT) for authentication

---

## 📁 Project Structure

The project follows a modular and feature-based architecture with clear separation of concerns:

```

src/
│── modules/
│ ├── auth/
│ ├── users/
│ ├── vehicles/
│ ├── bookings/
│
│── middlewares/
│── config/
│── types/
│── app.ts
│── server.ts

```

Each module contains:

- `routes` – API routes
- `controllers` – request handling
- `services` – business logic
- `validators` (if applicable)

---

## 📊 Database Schema

### Users

| Field    | Description       |
| -------- | ----------------- |
| id       | auto-generated    |
| name     |                   |
| email    | unique, lowercase |
| password |                   |
| phone    |                   |
| role     | admin, customer   |

### Vehicles

| Field               | Description         |
| ------------------- | ------------------- |
| id                  |                     |
| vehicle_name        |                     |
| type                | car, bike, van, SUV |
| registration_number | unique              |
| daily_rent_price    |                     |
| availability_status | available, booked   |

### Bookings

| Field           | Description                 |
| --------------- | --------------------------- |
| id              |                             |
| customer_id     |                             |
| vehicle_id      |                             |
| rent_start_date |                             |
| rent_end_date   |                             |
| total_price     |                             |
| status          | active, cancelled, returned |

---

## 🔐 Authentication

All protected routes require a JWT token in the request header:

```

Authorization: Bearer <jwt_token>

```

Tokens are generated during login and validated for every protected request.

---

## 🌐 API Documentation

Detailed API request and response specifications are available here:

📖 **[API Reference](API_REFERENCE.md)** _( or look at the API_REFERENCE.md file)_

All endpoints strictly follow the defined API reference, including:

- URL patterns
- Request body fields
- Response format
- HTTP status codes

---

## ⚙️ Setup & Usage Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ana-yet/vehicle-rental.git
cd vehicle-rental
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/vehicle_rental
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run Database Migrations / Tables

Ensure PostgreSQL is running and tables are created.

### 5️⃣ Start the Server

```bash
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

## 📌 Business Rules Summary

- Booking price = `daily_rent_price × number_of_days`
- Vehicles cannot be double-booked
- Vehicles become `booked` when rental is active
- Vehicles become `available` when booking is cancelled or returned
- Users and vehicles cannot be deleted if active bookings exist

---

## ✅ Status Codes Used

| Code | Description                    |
| ---- | ------------------------------ |
| 200  | Successful request             |
| 201  | Resource created               |
| 400  | Bad request / validation error |
| 401  | Unauthorized                   |
| 403  | Forbidden                      |
| 404  | Resource not found             |
| 500  | Server error                   |

---

## 👨‍💻 Author

**Vehicle Rental System API**

Backend project built using **Node.js**, **TypeScript**, **Express**, and **PostgreSQL**
