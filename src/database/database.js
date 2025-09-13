const { PrismaClient } = require('./client');


const db=new PrismaClient({
    log:[
        "query","info","error","warn"
    ]
});

module.exports={db};