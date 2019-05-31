require('./DB/mongoose');
const User = require('./Model/users');
const Items = require('./Model/items')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const path = require('path');
const multer = require('multer');
app.use(express.json());
app.use(cors());
app.use("/images",express.static("images"))
app.use(bodyParser.urlencoded({ extended: false }));

//for registering new users to database
app.post("/register_user",function(req,res){
    var mydata = new User(req.body);
    mydata.save().then(function(){ 
        res.send("registered..")
    }).catch(function (e){
        res.send(e);
    });
})

//for adding products details to server
app.post("/addItems",function(req,res){

    var itemname= req.body.itemName;
    var itemprice = req.body.itemPrice;
    var itemDesc = req.body.itemDescription;
    var itemImage = req.body.itemImage;

    console.log(itemname,itemprice,itemDesc,itemImage);
    var itemsdata= new Items({
        itemName:itemname,
        itemPrice:itemprice,
        itemDescription:itemDesc,
        itemImage:itemImage
    })  
    itemsdata.save().then(function(){
        console.log("Added");
    }).catch(function(e){
        res.send(e);
    });

});


//fetching items from database
app.get("/getItems",function(req,res){
    Items.find().then(function(items){
        res.send(items);
        }).catch(function(e){
         res.send(e)
        });
})

//LOgin code
app.post('/loginUser',function(req,res){
    console.log("connected");
    console.log(req.body);

    var uname=req.body.username;
    var pass=req.body.password;
    
    User.find({'username':uname, 'password':pass}).countDocuments(function(err,number){
        if(number!=0){
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json('login');
        
        }
        else{
            res.send('username and password mismatch');
            console.log('Username and password mismatch');
        }
    })
})

//Storage and name changed to store in database
var storage = multer.diskStorage({
    destination: "images",
    filename: function(req, file, callback) {
        const ext = path.extname(file.originalname);
        callback(null, "aashish" + Date.now() + ext);
    }

});
//verifying image type
var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { return cb(new Error("You can upload only image files!"), false); }
    cb(null, true);
};

//upload code
var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 10000000
    }
});

//uploading image into database and fetching name to UI
app.post('/uploadImage', upload.single('ImageName'), (req, res) => {
    res.json(req.file.filename);
})



app.listen(3000);