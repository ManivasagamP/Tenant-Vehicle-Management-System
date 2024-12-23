import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db =  mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,    
    database:process.env.DB_NAME,
});

db.connect((err)=>{
    if(err){
        console.log("Database connection failed",err.message);
        process.exit(1);
    }else{
        console.log("conneted successfully");
    }
})

export default db;