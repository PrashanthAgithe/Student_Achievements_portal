const port=4000;
const exp=require('express')
const app=exp();
//extract body of req 
app.use(exp.json())

const jwt=require('jsonwebtoken');
const multer=require('multer');
const path=require('path');
const cors=require('cors');
const bcryptjs=require('bcryptjs')
app.use(cors());
const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://prashanthagithe:prashanth1986@cluster0.msivmjn.mongodb.net/studentachievementsdb').then(()=>console.log("DB connected"))
//sample route
app.get('/',(req,res)=>{
  res.send('express app is running')
})
//image storage engine
const storage=multer.diskStorage({
  destination:'./upload/images',
  filename:(req,file,cb)=>{
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload=multer({storage:storage})

//creating upload
app.use('/images',exp.static('upload/images'))
app.post("/upload",upload.single('image'),(req,res)=>{
  res.json({
    success:1,
    image_url:`http://localhost:${port}/images/${req.file.filename}`
  })
})

//schema for creating achievement
const Achievement=mongoose.model('Achievement',{
  id:{
    type:Number,
    required:true,
  },
  title:{
    type:String,
    required:true,    
  },
  name:{
    type:String,
    required:true,
  },
  department:{
    type:String,
    required:true,
  },
  category:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  image:{
    type:String,
    required:true,
  }
})
//route to add achievement
app.post('/addachievement',async(req,res)=>{
  let achievements=await Achievement.find({});
  let id=1;
  if(achievements.length>0){
    id=achievements[achievements.length -1].id +1; 
  }
  let newachievement=req.body;
  newachievement.id=id;
  let result=await Achievement.insertMany([{...newachievement}])
  res.json({
    success:true,
    name:newachievement.name,
  })
})
//route for getting all achievements
app.get('/allachievements',async(req,res)=>{
  let all_achievements=await Achievement.find({});
  res.send(all_achievements);
})
//route for deleting achievement
app.post('/removeachievement',async(req,res)=>{
  await Achievement.deleteOne({id:req.body.id})
  res.json({
    success:true,
    name:req.body.name
  })
})
//schema for admin
const Admin=mongoose.model('admin',{
  username:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  }
})
//registration for admin

app.post('/register',async(req,res)=>{
  let admin=req.body;
  let check=await Admin.findOne({username:admin.username});
  if(!check){
    admin.password=await bcryptjs.hash(admin.password,6);
    console.log(admin)
    let result=await Admin.insertMany([{...admin}])
    res.json({
      success:true,
      name:admin.username,
    })
  }else{
    res.json({
      success:false,
      error:'Admin already exist'
    })
  }
})
app.post('/login',async(req,res)=>{
  let admin=req.body;
  let dbadmin=await Admin.findOne({username:admin.username})
  if(dbadmin){
    let result=await bcryptjs.compare(admin.password,dbadmin.password);
    if(result){
      res.json({
        success:true,
        message:"login success",
        name:admin.username
      })
    }else{
      res.json({
        success:false,
        message:"invalid password"
      })
    }
  }else{
    res.json({
      success:false,
      message:"Admin not found"
    })
  }
})
//error handling
app.use((err,req,res,next)=>{
  res.send({message:'error',payload:err.message})
})
//assigning port number
app.listen(port,()=>console.log('server on port '+port))