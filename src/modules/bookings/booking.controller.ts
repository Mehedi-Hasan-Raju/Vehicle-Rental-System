import { Request, Response } from "express";
import { bookingServices } from "./bookings.service"; 

const createBooking = async (req: Request, res: Response) => {
  try {
    // Logged in user
    const customerId = req.user?.id;

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await bookingServices.createBooking(
      customerId,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingControllers = {
  createBooking,
};