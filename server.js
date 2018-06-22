const express=require('express');
const app=express();
const bodyparser =  require('body-parser');
const fs=require('fs');

// app.use(express.json);
// app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.get('/',function(req,res){
    // console.log('hello');
    // res.send("hi");
     res.sendFile(__dirname + '/\public/\index2.html');
});


app.get('/json',function(req,res){
    var content='';
fs.readFile('data.txt','utf-8',function(err,data){
if(err){
    console.log(err);
    
}
content=data;
res.send(content);

});

});


app.post('/json',function(req,res){
var recdata=req.body.key;
console.log("post "+recdata);

fs.writeFile('data.txt',recdata,function(err){
    if(err){
        console.log(err);
        
    }
    res.redirect('/');
});

})

app.listen(3000, function(){
    console.log(('server started'));    
});