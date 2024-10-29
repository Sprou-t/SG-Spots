import fetchTIHData from "../services/fetchTIHAPI.js";

export const getTIHData = async(req, res) =>{
    try{
        const data = fetchTIHData;
        res.status(200).json({success:true, message :`${data}`});
    }catch(err){
        res.status(500).json({ success: false, message: "server error" });
        console.error(err);
    }
} 
