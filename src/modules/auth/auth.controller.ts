import { Request, Response, Router } from "express"
import { authServices } from "./auth.service"

const loginUser = async function (req: Request, res: Response) {
    const { email, password} = req.body;

        try{
            const result = await authServices.loginUser(email, password);
           
            res.status(200).json({
                success: true,
                message: 'Login successfully',
                data: result,
            })
           
            
        }catch(err: any){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    
}

export const authController = {
    loginUser,
}