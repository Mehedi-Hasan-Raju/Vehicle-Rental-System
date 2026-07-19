import { Request,Response } from "express";
import { usersServices } from "./users.service"; 


const createUser = async (req:Request, res:Response)=>{
    const {name,role, email, password, phone} = req.body;

    try{
        const result = await usersServices.createUser(req.body);
       
        res.status(201).json({
            success: true,
            message: 'data inserted successfully',
            data: result.rows[0]
        })
       
        
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const getUser =  async(req:Request, res:Response)=> {
    try{
        const result = await usersServices.getUser()

        res.status(200).json({
            success: true,
            message: 'user data fetched successfully',
            data: result.rows,
        })

    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        })
    }
}

const getSingel = async(req : Request, res: Response) =>{
    // console.log(req.params.id);
   try{
    const result = await usersServices.getSingel(req.params.id as string);
    if(result.rows.length === 0 ){
        res.status(404).json({
            success: false,
            message: 'user not found',
        })
    }else{
        res.status(200).json({
            success: true,
            message: 'user data fetched successfully',
            data: result.rows[0]
        })
    }
   }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        })
   }
}

const updateUser = async(req : Request, res: Response) =>{
    // console.log(req.params.id);
    const {name, email} = req.body;
   try{
    const result = await usersServices.updateUser(name, email, req.params.id as string);
    if(result.rows.length === 0 ){
        res.status(404).json({
            success: false,
            message: 'user not found',
        })
    }else{
        res.status(200).json({
            success: true,
            message: 'user data updated successfully',
            data: result.rows[0]
        })
    }
   }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        })
   }
}

const deleteUser = async(req : Request, res: Response) =>{
    // console.log(req.params.id);
   try{
    const result = await usersServices.deleteUser(req.params.id as string);
    if(result.rows.length === 0 ){
        res.status(404).json({
            success: false,
            message: 'user not found',
        })
    }else{
        res.status(200).json({
            success: true,
            message: 'user data deleted successfully',
            data: null,
        })
    }
   }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        })
   }
}


export const usersController= {
    createUser,getUser,getSingel,updateUser,deleteUser
};




