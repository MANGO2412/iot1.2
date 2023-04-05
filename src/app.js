const express = require('express')
const path = require('path')
const app = express()



//public static 
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports=app;