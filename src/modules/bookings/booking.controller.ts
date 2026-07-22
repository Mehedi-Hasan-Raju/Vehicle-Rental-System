import { Request, Response } from "express";
import { bookingServices } from "./bookings.service"; 
import { vehicleServices } from "../vehicles/vehicles.services";

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

const getBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getBookings(req.user);

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateBooking = async (
  req: Request,
  res: Response
) => {
  try {
    const bookingId = Array.isArray(req.params.bookingId)
      ? req.params.bookingId[0]
      : req.params.bookingId;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    const result = await bookingServices.updateBooking(
      bookingId,
      req.user
    );

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const deleteVehicle = async (req: Request, res: Response) => {

    try{

        const {vehicleId} = req.params;

        const result = await vehicleServices.deleteVehicle(vehicleId as string);

        res.status(200).json({
            success:true,
            message:"Vehicle deleted successfully",
            data:result.rows[0]
        });

    }catch(err:any){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

}

export const bookingControllers = {
  createBooking,
  getBookings,
  updateBooking,
  deleteVehicle,
};