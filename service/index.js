app.use(express.json()); 
const port = process.argv.length > 2 ? process.argv[2] : 4000; 
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const authCookieName = 'token'; 

let users = [];
 
app.use(express.static('public'));
var apiRouter = express.Router();
app.use(`/api`, apiRouter);   
app.use(cookieParser()); 
 
// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('username', req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.username, req.body.password);  
    setAuthCookie(res, user.token); 
    res.send({ username: user.username });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('username', req.body.username);
  if (user) { 
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token); 
      res.send({ username: user.username});
      return;
    } 
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});
  
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
apiRouter.get('/messages', verifyAuth, async(_req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user) return res.status(401).send({ msg: 'Unauthorized' }); 
  // Expecting req.body.message to contain the new message
  res.send(user.messages);
});

//submitMessages
apiRouter.post('/message', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user) return res.status(401).send({ msg: 'Unauthorized' });
  const { message } = req.body;
  if (!message) return res.status(400).send({ msg: 'No message provided' });
  user.messages.push(message); 
  res.send(user.messages); 
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });  
});  

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});  


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