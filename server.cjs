const express=require('express');
const  app = express();
const bodyparser=require('body-parser')

const mongoose=require('mongoose')
const cors=require('cors')
const {Users,Restarunt}=require('./schema.cjs')
app.use(bodyparser.json())
app.use(cors())
const port =process.env.PORT||8000
 async function connectToDb()
 {
    try{
   await mongoose.connect('mongodb+srv://Dheena:dheena123@cluster0.ser6ewc.mongodb.net/swiggey?retryWrites=true&w=majority')

   app.listen(port,function ()
   {console.log(`server is running on ${port}`)})
    }catch(error){
        console.log(error)
        console.log('Error in connecting to the database')
    }
   
 }
 connectToDb()

 app.post('/signup',async function(req,res){

   try{
    await Users.create ({'username': req.body.username ,
        'email':req.body.email,
        'phonenumber':req.body.phonenumber,
        'password':req.body.password
    
    })
         res.status(201).json({"status":"success","message":"User created"})
   }

   catch (error){

     res.status(500).json({"status":"failure","message":"Internal server error"})
   }

 })

app.post("/login",async function(req,res){
    try {
        const login = await Users.findOne({
            'email':req.body.email,
            'password':req.body.password
        })
        if(login)
        
        {
            res.status(200).json({"message":"Valid user"})
        }
        else{
            res.status(401).json({"message":"InValid user"})
        }
    }
    catch{
        res.status(500).json({"message":"Internal Server error"})
    }
})

app.post('/add-restarunts',async function(request,response){
  
    try
    {
        await Restarunt.create({
            "name": request.body.name ,
            "areaName":request.body.areaName,
            "avgRating":request.body.avgRating,
            "cuisines":request.body.cuisines,
            "costForTwo":request.body.costForTwo
        })
        response.json({
            "status":"succesfull",
            "message":"Restarunt Added"
        })
    }
    catch(error)
    {
        response.json({
            "status":"unsuccesfull",
            "message":"Restarunt did'nt added" + error
        })
    }

})

app.get('/get-restarunts-details',async function(request,response){
    try{
        const restarunts_details= await Restarunt.find()
        response.status(200).json(restarunts_details)
    }
    catch(error)
    {
        response.status(500).json({
            "status":"Unsecesfull",
            "Message":"Internal Error"
        })
        
    }
})

app.delete('/delete-restarunts/:id', async function(request,response){
    try{
        await Restarunt.findByIdAndDelete(request.params.id)
        response.status(200).json({"status":"Succesfull", "Message":"Deleted Successfully"});
    }
    catch(error)
    {
        response.status(500).json({"status":"Unsuccessful","Message":"ID not found"});
    }
})




