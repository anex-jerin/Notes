const allowedOrgin = require("./allowedOrgin")


const corsOptions = {
    origin:(origin,callback) =>{
        if(allowedOrgin.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        }else{
            callback(new Error('Not allowed by origin'))
        }
    },
    credentials: true,
    optionSuccessStatus:200
}

module.exports = corsOptions