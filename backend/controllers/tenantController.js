import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const login = (req,res)=>{
    const {email,password} = req.body;
    try {
        db.query("select * from Tenant where email=?",
            [email],
            async(error,result)=>{
                if(!result){
                    return res.status(404).json({message:"Tenant not found"});
                }
                if(error){
                    return res.json(error.message);
                }
                
                const hashedpassword = result[0].password;
                const isPasswordValid = await bcrypt.compare(password,hashedpassword);
                
                if(!isPasswordValid){
                    return res.status(401).json(isPasswordValid);
                }

                const token = jwt.sign({id:result[0].id,email:result[0].email,role:"tenant"},process.env.JWT_SECRET,{expiresIn:'1h'});
                res.json({token, tenantId: result[0].id });
            }
        );
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const createVehicle = (req,res) =>{
    const {tenantId} = req.params;
    const {name ,type, pricePerKm} = req.body;
    try {
        db.query("INSERT INTO Vehicle (tenant_id,name,type,price_per_km) values (?,?,?,?)",
            [tenantId,name,type,pricePerKm],
            (error,result)=>{
                if(error){
                    return res.status(500).json({message:error.message});
                }
                return res.json({message:"Vehicle created successfully"});
            }
        )
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const getVehicle = (req,res) =>{
    const {tenantId} = req.params;
    try {
        db.query("SELECT * FROM Vehicle WHERE tenant_id=?",
            [tenantId],
            (error,result)=>{
                if(error){
                    return res.status(500).json({message:error.message});
                }
                return res.json(result);
            }
        )
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const updateVehicle = (req,res)=>{
    const {tenantId,vehicleId} = req.params;
    const {name, type, price_per_km} = req.body;
    try {
        db.query("UPDATE Vehicle SET name=?, type=?, price_per_km=? WHERE tenant_id=? AND id=?",
            [name,type,price_per_km,tenantId,vehicleId],
            (error,result)=>{
                if(error){
                    return res.status(500).json({message:error.message});
                }
                return res.json({message:"Updated successfully"});
            }
        )
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
}

export const deleteVehicle = (req,res)=>{
    const{tenantId,vehicleId} = req.params;
    try {
        db.query("DELETE FROM Vehicle WHERE tenant_id=? AND id=?",
            [tenantId,vehicleId],
            (error,result)=>{
                if(error){
                    return res.status(500).json({message:error.message});
                }
                return res.json({message:"Deleted successfully"});
            }
        )
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}