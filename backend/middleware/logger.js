const {format} = require('date-fns')
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises




const logEvents = async (message, logFilename) =>{
    const logItem = `${format(new Date(), 'MM/dd/yy\t HH:mm:ss')}\t ${uuidv4()} \t${message}\n`

    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fs.promises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fs.promises.appendFile(path.join(__dirname,'..','logs',logFilename),logItem)
    }catch(error){
        console.log(error)
    }
}

const logger = (req,res,next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`,'reqLog.log')
    console.log(`${req.method}\t${req.url}\t${req.headers.origin}`);
    next() 
}

module.exports = logger