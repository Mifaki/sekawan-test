# Sekawan Test

This is a web application for monitoring and booking vehicles for a mining company. The application enables:

- Booking vehicles for employees
- Multi-level approval for vehicle bookings
- Monitoring vehicle usage
- Exporting booking reports

The application uses **Laravel** for the backend, **MySQL** for the database, and **React** with **Inertia.js** for the frontend.

---

## Requirements

- PHP: `^8.1`
- Composer: `^2.0`
- Node.js: `^18.x`
- NPM: `^9.x`
- MySQL: `^8.x`

---

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/Mifaki/sekawan-test.git
cd sekawan-test
```

### Step 2: Install Dependencies

#### Backend

```bash
composer install
```

#### Frontend

```bash
npm install
```

### Step 3: Environment Configuration

1. Copy the `.env` file:
   ```bash
   cp .env.example .env
   ```
2. Update the `.env` file with your local configuration:

   ```env
   APP_NAME=VehicleBooking
   APP_ENV=local
   APP_KEY=base64:GENERATED_KEY
   APP_DEBUG=true
   APP_URL=http://localhost

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=vehicle_booking
   DB_USERNAME=root
   DB_PASSWORD=your_password

   SESSION_DRIVER=file
   QUEUE_CONNECTION=sync

   VITE_BASE_URL=http://localhost
   ```

### Step 4: Generate Application Key

```bash
php artisan key:generate
```

### Step 5: Run Migrations and Seeders

```bash
php artisan migrate --seed
```

### Step 6: Build Frontend Assets

```bash
npm run dev
```

### Step 7: Start the Development Server

```bash
php artisan serve
```

---

## Physical Data Model
![Relation](https://github.com/user-attachments/assets/4bf04b8d-75a1-4081-942c-ffa6c3bbbfeb)

---

### Database Structure

The database consists of several interconnected tables designed to manage vehicle bookings and maintenance:

#### Core Tables

1. **Users (`users`)**

   - Stores user information, authentication details, and roles
   - Includes fields for name, email, password, and timestamps
   - Supports soft deletes for data retention

2. **Vehicles (`vehicles`)**

   - Manages vehicle information
   - Tracks registration details, type, brand, model
   - Monitors vehicle status and registration expiry
   - Includes manufacturing details (chassis/engine numbers)

3. **Vehicle Bookings (`vehicle_bookings`)**

   - Handles vehicle reservation system
   - Links vehicles with drivers and requesters
   - Manages two-level approval process
   - Tracks booking status, purpose, and passenger count
   - Records rejection reasons if applicable

4. **Vehicle Maintenance (`vehicle_maintenances`)**

   - Tracks vehicle maintenance schedules
   - Records maintenance types and descriptions
   - Monitors maintenance status

5. **Fuel History (`vehicle_fuel_histories`)**
   - Records fuel consumption data
   - Tracks refueling costs and amounts
   - Links to vehicles and drivers

### Relationships

- Users can be drivers, requesters, or approvers
- Vehicles can have multiple bookings, maintenance records, and fuel histories
- Bookings require two-level approval from different users
- Each fuel history entry is linked to both a vehicle and a driver

---

## Notes

Refer to the following usernames and passwords for seeded users (adjust based on your seeds):

| Role    | Username       | email                 | Password |
| ------- | -------------- | --------------------- | -------- |
| Admin   | Admin User     | admin@admin.com       | admin123 |
| Manager | Manager User 1 | manager_1@manager.com | admin123 |
| Manager | Manager User 2 | manager_2@manager.com | admin123 |
