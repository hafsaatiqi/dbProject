const mongoose= require ('mongoose')
    mongoose.connect('mongodb://localhost:27017/library')
mongoose.connection.on('connected' , ()=>{console.log('connected to mongodb')})

mongoose.connection.on('error', (err)=>{console.error('connection error: ', err);})
module.export=mongoose