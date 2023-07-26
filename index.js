const fs = require("fs");
const express = require("express")
const path = require("path");
const folderpath = path.join(__dirname,'task');
const app = express();
const port = 5001

app.get('/', (req, res) =>  {
    res.send("write :/createfile to createfile and /readfiles to read data")
});
app.get("/createfile",(req,res) => {
  try{
    const content = new Date().toString().replace(/[:.]/g,'-');
    const filename = `${content}.txt`;
    const filepath = path.join(folderpath,filename);
    fs.writeFileSync(filepath,content);
    res.status(200).json({
      message : `filename:${filename} path : ${folderpath}` 
    });
}catch (err){
  res.status(500).json({Error})
}
});
app.get("/readfiles",(req,res) => {
try{
  fs.readdir(folderpath,(err,data)=>{
    if(err){
      res.status(500).json({Error})
      return;
    }
    const texts = data.filter((file)=>file.endsWith(".txt"))
    res.status(200).json({data : texts});
  })
}catch(err){
  res.status(500).json({Error});
}
});

  app.listen(port,err=>{
    if(err){console.log(err)}
    else{console.log(`port is running${port}`)}
  })