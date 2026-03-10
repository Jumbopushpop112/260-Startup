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
app.use(cookieParser()); 

//create user 
async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username: username,
    password: passwordHash,
    messages: [], 
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
//verification function  
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

//getMessages
apiRouter.get('/messages', verifyAuth, (_req, res) => {
  res.send(messages); 
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
}); 

//update messages function
async function updateMessages(username, message) {
  const user = await findUser('username', username); 
  if (!user) return null;  
  user.messages.push(message);   
  return user.messages; 
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