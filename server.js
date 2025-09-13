const express = require('express');
const router = require('./src/router');

const app = express();
const PORT = 5000;

app.use(express.json());


// Root route
app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use((req, res, next) => {
    console.log("Request received: ", req.url);
    next();
}
);

app.use('/api', router);



// global error handling middleware
app.use((err,req,res,next)=>{
    console.log("err",err.message);
    res.send("Error handled");
})
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});
