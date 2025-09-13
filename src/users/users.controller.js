const { db } = require("../database/database");

const controller = require("express").Router();


controller.post("/", async(req, res) => {

    try{
        const {name,email,password}=req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message:"name, email and password are required"
            })
        }

        const user=await db.user.create({
            data:{
                name,
                email,
                password
            }
        })

        return res.status(200).json({
            message:"User created successfully",
            data:user
        })
    }catch(error){
        console.error("Error creating user",error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
})


controller.get("/",async(req,res)=>{
    try{
        const users=await db.user.findMany({
            select:{
                name:true,
                email:true
            }
        })

        return res.status(200).json({
            message:"Users fetched successfully",
            data:users
        })
    }catch(error){
        console.error("Error fetching users",error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
})


controller.delete("/:id", async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        if (isNaN(userId)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const deletedUser = await db.user.delete({
            where: {
                id: userId
            }
        });

        return res.status(200).json({
            message: "User deleted successfully",
            data: deletedUser
        });
    } catch (error) {
        console.error("Error deleting user", error);
        
        // Prisma throws a specific error if the record doesn't exist
        if (error.code === 'P2025') {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});


module.exports = controller;