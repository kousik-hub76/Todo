const router = require('express').Router();
const userController = require('./users/users.controller.js');
const todoController = require('./todos/todos.controller.js');

// Sample todos route
// router.get("/todos", (req, res) => {
//     res.send("Hello todo lists");
// });

// User routes
// router.get('/users', userController.getAllUsers);
// router.post('/users', userController.createUser);
// router.delete('/users/:id',userController.deleteUser);
// router.get('/todos',userController.getAllTodos);
// router.post('/todos',userController.createTodo);

// router.get('/test',async(req,res)=>{
//     res.send("hello world")
// })



router.use("/users", userController)
router.use("/todos", todoController)





module.exports = router;
