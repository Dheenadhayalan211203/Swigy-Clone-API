const mongoose=require('mongoose');
const users=new mongoose.Schema({
    
    username:{
        type : String,
        required : true
    
    },
    email : {
        type:String, 
        unique :true ,
        required :true
       
    },
    phonenumber :{
        type : String,
        

    },
    password :{
        type:String,
        required : true
    }
    


})



const restarunt=new mongoose.Schema({
    
    name:{
        type : String,
        required : true
    
    },
    avgRating : {
        type : Number
        
    },
    costForTwo :{
        type : String,
        required : true
    },
    cuisines :{
        type : Array
        
    },
    areaName : {
        type:String,
        required : true
    }


})
const  Users =  mongoose.model( "users",users);

const  Restarunt =  mongoose.model( "restaurant",restarunt);
module.exports={Restarunt,Users} ;
