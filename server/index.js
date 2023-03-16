const express = require('express');
const app = express();
const cors =  require('cors')
const mongoose =  require('mongoose')
const bcrypt = require('bcryptjs');
const User =  require('./models/Usermodel')
const jwt = require('jsonwebtoken');
const cookieParser =  require('cookie-parser')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')
const Post = require('./models/Postmodels')

app.use(cors({credentials:true, origin:'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser())



const secret = 'dfmgfgjfkjkjgjf'

const salt = bcrypt.genSaltSync(10);
// Connect to database
mongoose.connect('mongodb+srv://Joseph_Chimebuka:Chimebuka1234@cluster0.f84t311.mongodb.net/?retryWrites=true&w=majority');

//Register user 
app.post('/register', async(req, res)=>{
    const {username, email, password} = req.body;

    // Create new user
    try {
        const userDoc = await User.create({
            username,
            email,
            password:bcrypt.hashSync(password, salt)})
        res.json(userDoc)
    } catch (error) {
        res.status(400).json(error)
    }

}); 


//Login user
app.post('/login', async(req, res)=>{
    const {username, password} = req.body;

    //find users email
    const userDoc =  await User.findOne({username})
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if(passOk){
        jwt.sign({username,id: userDoc._id }, secret,{}, (err,token)=>{
            if(err) throw err;
            res.cookie('token', token).json('ok')
        })
    }else{
        res.status(400).json('Wrong credentials')
    }
})


//User Profile

app.get('/profile', (req, res) =>{
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info)=>{
        if(err) throw err;
        res.json(info)
    })
   res.json(req.cookies)
})


//Request for sending for creating a post
app.post('/post',upload.single('file'), async(req,res)=>{

    //Process for renaming the file
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = (path+'.'+ext)
    fs.renameSync(path, newPath)

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async(err, info)=>{
        if(err) throw err;
        const {title, summary, content} = req.body;
        const postDoc = await Post.create({
            title,  
            summary,
            content,
            cover: newPath,
            author: info.id
        })
        res.json(postDoc)
    })

   })

 
   app.get('/post', async(req, res)=>{
    res.json(await Post.find())
   })
   //App for the backend is listening at port 4000
app.listen(4000); 

console.log('Server running')