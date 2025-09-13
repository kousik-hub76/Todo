const {db} = require("../database/database.js");
const controller = require("express").Router();


// controller.post("/", async(req, res) => {

//     const { title, description } = req.body;
//     if (!title || !description) {
//         return res.status(400).json({
//             message: "Title and description are required"
//         })
//     }
//     const todo = await db.todos.create({
//         data: {
//             title,
//             description
//         }
//     })

//     res.status(200).json({
//         message: "Todo created successfully",
//         data:todo
//     })
// })

controller.post("/", async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }

        const todo = await db.todo.create({
            data: {
                title,
                description
            }
        });

        return res.status(201).json({
            message: "Todo created successfully",
            data: todo
        });

    } catch (error) {
        console.error("Error creating todo:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

controller.get("/", async (req, res) => {
    try {
        const todos = await db.todo.findMany({
            select: {
                title: true,
                description: true
            }
        });

        return res.status(200).json({
            message: "Todos fetched successfully",
            data: todos
        });

    } catch (error) {
        console.error("Error fetching todos:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

controller.delete("/:id",async (req,res)=>{
    try{
        const todoId=parseInt(req.params.id);

        if(isNaN(todoId)){
            return res.status(400).json({
                message:"Invalid todo id"
            })
        }

        const deletedTodos=await db.todo.delete({
            where:{
                id:todoId
            }
        })

        return res.status(200).json({
            message:"Todos deleted successfully",
            data:deletedTodos
        })
    }catch(error){
        console.error("Error deleting todo".error);
        if(error.code === 'p2025'){
            return res.status(404).json({
                message:"Data not found"
            })
        }
        return res.status(500).json({
            message:"Internal server error"
        })
    }
})

controller.put("/:id",async (req,res)=>{
    try{
        const {id}=req.params;
        const {title,description}=req.body;

        if(!title || !description){
            return res.status(400).json({
                message:"Title and description are required"
            })
        }

        const existingTodo=await db.todo.findUnique({
            where:{id:Number(id)}
        })

        if(!existingTodo){
            return res.status(404).json({
                message:"Todo not found"
            })
        }

        const updatedTodo=await db.todo.update({
            where:{id:Number(id)},
            data:{title,description}
        })

        return res.status(200).json({
            message:"Todo updated successfully!",
            data:updatedTodo
        })
    }catch(error){
        console.error("Error updating todo",error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
})
/**
 * middleware -> controller(req handler) -> service(business logic) -> repository (db queries)
 */

module.exports = controller;