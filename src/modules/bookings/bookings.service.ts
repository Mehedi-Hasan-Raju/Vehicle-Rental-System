import { pool } from "../../config/db";

const createBooking = async (
  customerId: string,
  payload: Record<string, unknown>
) => {
  const { vehicle_id, rent_start_date, rent_end_date } = payload;

  // Start Transaction
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Check vehicle
    const vehicleResult = await client.query(
      `SELECT * FROM vehicles WHERE id = $1`,
      [vehicle_id]
    );

    if (vehicleResult.rows.length === 0) {
      throw new Error("Vehicle not found");
    }

    const vehicle = vehicleResult.rows[0];

    // 2. Check availability
    if (vehicle.availability_status !== "available") {
      throw new Error("Vehicle is not available");
    }

    // 3. Check dates
    const start = new Date(rent_start_date as string);
    const end = new Date(rent_end_date as string);

    if (end <= start) {
      throw new Error("End date must be after start date");
    }

    // 4. Calculate total days
    const days = Math.ceil(
      (end.getTime() - start.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    const totalPrice = days * Number(vehicle.daily_rent_price);

    // 5. Create booking
    const bookingResult = await client.query(
      `
      INSERT INTO bookings
      (
        customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        total_price,
        status
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [
        customerId,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        totalPrice,
        "active",
      ]
    );

    // 6. Update vehicle status
    await client.query(
      `
      UPDATE vehicles
      SET availability_status='booked'
      WHERE id=$1
      `,
      [vehicle_id]
    );

    await client.query("COMMIT");

    return bookingResult;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};


const getBookings = async (user: any) => {
  if (user.role === "admin") {
    const result = await pool.query(`SELECT * FROM bookings`);
    return result;
  }

  const result = await pool.query(
    `SELECT * FROM bookings WHERE customer_id = $1`,
    [user.id]
  );

  return result;
};


const updateBooking = async (
  bookingId: string,
  user: any
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const bookingResult = await client.query(
      `SELECT * FROM bookings WHERE id=$1`,
      [bookingId]
    );

    if (bookingResult.rows.length === 0) {
      throw new Error("Booking not found");
    }

    const booking = bookingResult.rows[0];

    // Customer
    if (user.role === "customer") {

      if (booking.customer_id != user.id) {
        throw new Error("Forbidden");
      }

      const today = new Date();
      const startDate = new Date(booking.rent_start_date);

      if (today >= startDate) {
        throw new Error("Booking cannot be cancelled");
      }

      await client.query(
        `UPDATE bookings
         SET status='cancelled'
         WHERE id=$1`,
        [bookingId]
      );

      await client.query(
        `UPDATE vehicles
         SET availability_status='available'
         WHERE id=$1`,
        [booking.vehicle_id]
      );
    }

    // Admin
    if (user.role === "admin") {

      await client.query(
        `UPDATE bookings
         SET status='returned'
         WHERE id=$1`,
        [bookingId]
      );

      await client.query(
        `UPDATE vehicles
         SET availability_status='available'
         WHERE id=$1`,
        [booking.vehicle_id]
      );
    }

    await client.query("COMMIT");

    return await client.query(
      `SELECT * FROM bookings WHERE id=$1`,
      [bookingId]
    );

  } catch (err) {

    await client.query("ROLLBACK");
    throw err;

  } finally {

    client.release();

  }
};


const deleteVehicle = async (id: string) => {

  // Check active booking
  const booking = await pool.query(
    `SELECT * FROM bookings
     WHERE vehicle_id = $1
     AND status = 'active'`,
    [id]
  );

  if (booking.rows.length > 0) {
    throw new Error("Vehicle has an active booking");
  }

  const result = await pool.query(
    `DELETE FROM vehicles
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result;
};

export const bookingServices = {
  createBooking,getBookings,updateBooking,deleteVehicle
};