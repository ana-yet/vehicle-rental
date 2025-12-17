# 🌐 API Reference

## Vehicle Rental System

← [Back to Main Documentation](README.md)

This document provides the complete API reference for the Vehicle Rental System, including endpoints, access control, request formats, and response structures.

---

## 🔐 Authentication Endpoints

### 1️⃣ User Registration

- **Access:** Public
- **Description:** Register a new user account

**Endpoint**

```

POST /api/v1/auth/signup

```

**Request Body**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "phone": "01712345678",
  "role": "customer"
}
```

**Success Response (201 Created)**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "01712345678",
    "role": "customer"
  }
}
```

---

### 2️⃣ User Login

- **Access:** Public
- **Description:** Authenticate user and return JWT token

**Endpoint**

```
POST /api/v1/auth/signin
```

**Request Body**

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Success Response (200 OK)**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "<jwt_token>",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "01712345678",
      "role": "customer"
    }
  }
}
```

---

## 🚗 Vehicle Endpoints

### 3️⃣ Create Vehicle

- **Access:** Admin only
- **Description:** Add a new vehicle

**Endpoint**

```
POST /api/v1/vehicles
```

**Headers**

```
Authorization: Bearer <jwt_token>
```

**Request Body**

```json
{
  "vehicle_name": "Toyota Camry 2024",
  "type": "car",
  "registration_number": "ABC-1234",
  "daily_rent_price": 50,
  "availability_status": "available"
}
```

**Success Response (201 Created)**

```json
{
  "success": true,
  "message": "Vehicle created successfully",
  "data": {
    "id": 1,
    "vehicle_name": "Toyota Camry 2024",
    "type": "car",
    "registration_number": "ABC-1234",
    "daily_rent_price": 50,
    "availability_status": "available"
  }
}
```

---

### 4️⃣ Get All Vehicles

- **Access:** Public
- **Description:** Retrieve all vehicles

**Endpoint**

```
GET /api/v1/vehicles
```

**Success Response (200 OK)**

```json
{
  "success": true,
  "message": "Vehicles retrieved successfully",
  "data": []
}
```

---

### 5️⃣ Get Vehicle by ID

- **Access:** Public
- **Description:** Retrieve vehicle details by ID

**Endpoint**

```
GET /api/v1/vehicles/:vehicleId
```

**Success Response (200 OK)**

```json
{
  "success": true,
  "message": "Vehicle retrieved successfully",
  "data": {
    "id": 2,
    "vehicle_name": "Honda Civic 2023",
    "type": "car",
    "registration_number": "XYZ-5678",
    "daily_rent_price": 45,
    "availability_status": "available"
  }
}
```

---

### 6️⃣ Update Vehicle

- **Access:** Admin only
- **Description:** Update vehicle details

**Endpoint**

```
PUT /api/v1/vehicles/:vehicleId
```

**Headers**

```
Authorization: Bearer <jwt_token>
```

**Request Body**

```json
{
  "daily_rent_price": 55,
  "availability_status": "available"
}
```

**Success Response (200 OK)**

```json
{
  "success": true,
  "message": "Vehicle updated successfully",
  "data": {}
}
```

---

### 7️⃣ Delete Vehicle

- **Access:** Admin only
- **Description:** Delete vehicle (only if no active bookings exist)

**Endpoint**

```
DELETE /api/v1/vehicles/:vehicleId
```

**Success Response (200 OK)**

```json
{
  "success": true,
  "message": "Vehicle deleted successfully"
}
```

---

## 👥 User Endpoints

### 8️⃣ Get All Users

- **Access:** Admin only
- **Description:** Retrieve all users

**Endpoint**

```
GET /api/v1/users
```

---

### 9️⃣ Update User

- **Access:** Admin or Own Profile
- **Description:** Update user details

**Endpoint**

```
PUT /api/v1/users/:userId
```

---

### 🔟 Delete User

- **Access:** Admin only
- **Description:** Delete user (only if no active bookings exist)

**Endpoint**

```
DELETE /api/v1/users/:userId
```

---

## 📅 Booking Endpoints

### 1️⃣1️⃣ Create Booking

- **Access:** Customer or Admin
- **Description:** Create a new booking

**Endpoint**

```
POST /api/v1/bookings
```

**Headers**

```
Authorization: Bearer <jwt_token>
```

**Request Body**

```json
{
  "customer_id": 1,
  "vehicle_id": 2,
  "rent_start_date": "2024-01-15",
  "rent_end_date": "2024-01-20"
}
```

---

### 1️⃣2️⃣ Get All Bookings

- **Access:** Role-based
  - **Admin:** all bookings
  - **Customer:** own bookings only

**Endpoint**

```
GET /api/v1/bookings
```

---

### 1️⃣3️⃣ Update Booking

- **Access:** Role-based
- **Description:** Cancel or return a booking

**Endpoint**

```
PUT /api/v1/bookings/:bookingId
```

**Request Body**

```json
{
  "status": "cancelled"
}
```

**OR**

```json
{
  "status": "returned"
}
```

---

## 📌 Standard Response Format

### Success

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Error message"
}
```

---

## 🔒 Authentication Header Format

```
Authorization: Bearer <jwt_token>
```

## ⚠️ Important Business Rules

- Vehicles cannot be double-booked
- Active bookings block deletion of users and vehicles
- Booking price = `daily price × number of days`
- Vehicle status updates automatically based on booking status
