const express = require('express')
const app = express()
const fsD = require('fs')
const cors = require('cors')
const port = process.env.PORT || 3400
app.use(express.json())
app.use(cors({
    origin:'*',
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE'
}))

app.listen(port,()=>{
    console.log("Server listening on PORT:",port)
})

app.get('/api/getJsonDataFile',(req,res,next)=>{
    try {
        const readData = fsD.readFileSync('./data/temp.json',(err,data)=>{
            if(err!=null){
                return err
            }
        })
        res.json({"data":JSON.parse(readData)})
    } catch (error) {
        res.send({"message":"server error"})
    }
})


app.post('/api/postJsonDataFile',(req,res,next)=>{
    try {
        fsD.writeFile('./data/temp.json',JSON.stringify(req.body,null),(error)=>{
            if(error!=null){
                return error
            }
            res.send({"message":"data successfully inserted"})
        })
    } catch (error) {
        console.log("error ",error)
    }
})