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
 

//create user 
async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user); 

  return user;
}

//find a user by whatever value we want (this can be an email, or a username)
async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict', 
  }); 
}

app.listen(port, () => {  
  console.log(`Listening on port ${port}`);
});