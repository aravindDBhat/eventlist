const express=require("express");
const bodyparser= require("body-parser");
const request=require("request");
const app=express();
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
var array=["A","B","C"];
app.get("/",function(req,res){
//res.sendFile(__dirname+"/views/list.ejsl");
  var date=new Date();
  var option={
    weekday:"long",
    day:"numeric",
    month:"long"
  };
  var day=date.toLocaleString("en-US",option);
  res.render("list",{day1:day ,array:array});

});
app.post("/",function(req,res){
  var newevent=req.body.new;
  if( newevent.startsWith(" ")||newevent.length<1){
  res.redirect("/");
}else{
  array.push(newevent);
  console.log("succussfully added item "+newevent);
  res.redirect("/");
}
})

app.post("/delete",function(req,res){
  var checked=req.body.check;
    console.log("succussfully deleted item "+array[checked]);
   array.splice(checked,1);
  res.redirect("/");
})
app.listen(process.env.port || 3000,function(){
console.log("success");

})
