import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import db from "../config/db.js"

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        db.query("SELECT * FROM Admin WHERE username=?", [username], async (error, result) => {
            if (error) {
                return res.status(500).json({ message: "Internal server error" });
            }
            if (!result || result.length === 0) {
                return res.status(404).json({ message: "Admin not found" });
            }
            
            if(!(password === result[0].password)){
                return res.status(404).json({ message: "Invalid Credentials" });
            }

            const token = jwt.sign({ id: result[0].id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token });
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createTenant = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        db.query("INSERT INTO Tenant (name, email, password) VALUES (?, ?, ?)", 
            [name, email, hashedPassword], 
            (error, result) => {
                if (error) {
                    return res.status(500).json({ message: "Internal server error" });
                }
                return res.status(201).json({ message: "Tenant created successfully" });
            }
        );
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllTenants = async (req, res) => {
    try {
        db.query("SELECT * FROM Tenant", (error, result) => {
            if (error) {
                return res.status(500).json({ message: "Internal server error" });
            }
            return res.json(result);
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateTenant = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        db.query('UPDATE Tenant SET name=?, email=? WHERE id=?', 
            [name, email, id], 
            (error, result) => {
                if (error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.json({ message: "Tenant updated successfully" });
            }
        );
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTenant = async (req, res) => {
    const { id } = req.params;
    try {
        db.query("DELETE FROM Tenant WHERE id=?", 
            [id], 
            (error, result) => {
                if (error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.json({ message: "Tenant deleted successfully" });
            }
        );
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};