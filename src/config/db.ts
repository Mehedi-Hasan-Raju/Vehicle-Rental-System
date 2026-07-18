import { Pool } from 'pg';
import config from '.';
//DB
export const pool = new Pool({
    connectionString: `${config.connectionString}`,
    ssl: {rejectUnauthorized: false},

});
const initDB = async() =>{
    await pool.query(`
           CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY ,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password TEXT NOT NULL,
            phone VARCHAR(20) NOT NULL,
            role VARCHAR(100) NOT NULL ,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     ) `)

await pool.query(`
     CREATE TABLE IF NOT EXISTS Vehicles (
    id SERIAL PRIMARY KEY,

    vehicle_name VARCHAR(100) NOT NULL,

    type VARCHAR(20) NOT NULL
        CHECK (type IN ('car', 'bike', 'van', 'SUV')),

    registration_number VARCHAR(50) NOT NULL UNIQUE,

    daily_rent_price NUMERIC(10,2) NOT NULL
        CHECK (daily_rent_price > 0),

    availability_status VARCHAR(20) NOT NULL DEFAULT 'available'
        CHECK (availability_status IN ('available', 'booked')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);


       await pool.query(`
          CREATE TABLE IF NOT EXISTS Bookings (
    id SERIAL PRIMARY KEY,

    customer_id INT NOT NULL
        REFERENCES Users(id) ON DELETE CASCADE,

    vehicle_id INT NOT NULL
        REFERENCES Vehicles(id) ON DELETE CASCADE,

    rent_start_date DATE NOT NULL,

    rent_end_date DATE NOT NULL
        CHECK (rent_end_date > rent_start_date),

    total_price NUMERIC(10,2) NOT NULL
        CHECK (total_price > 0),

    status VARCHAR(20) NOT NULL
        CHECK (status IN ('active', 'cancelled', 'returned')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       )`);
}




export default initDB;