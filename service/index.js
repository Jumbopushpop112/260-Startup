const port = process.argv.length > 2 ? process.argv[2] : 4000; 
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

let users = [];
 
app.use(express.static('public'));
var apiRouter = express.Router();
app.use(`/api`, apiRouter); 
 
app.listen(port, () => {  
  console.log(`Listening on port ${port}`);
});