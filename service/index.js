const port = process.argv.length > 2 ? process.argv[2] : 4000; 
const express = require('express');  
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();
const authCookieName = 'token';
let users = []; 
// parse JSON first
app.use(express.json());

// parse cookies before your routes
app.use(cookieParser()); 

// serve static React files
app.use(express.static('public'));

// API router
var apiRouter = express.Router();
app.use('/api', apiRouter);
// CreateAuth a new user 
apiRouter.post('/auth/create', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ msg: 'Username and password are required' });
  } 
  console.log(req.body);    
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
  const now = new Date();
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username: username,
    password: passwordHash,
    messages: [], 
    joinDate: now.toLocaleDateString(), 
    token: uuid.v4(),
  };
  users.push(user); 
  return user;
}

//find a user by whatever value we want (this can be an email, or a username)
async function findUser(field, value) {
  if (!value){
    return null;  
  } 
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
apiRouter.get('/messages', verifyAuth, async(req, res) => { 
  console.log("Cookies:", req.cookies); 
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user){
     return res.status(401).send({ msg: 'Unauthorized' });  
  }
  // Expecting req.body.message to contain the new message
  res.send(user.messages);
});
 
apiRouter.post('/user', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user) return res.status(401).send({ msg: 'Unauthorized' });
  const { username, joinDate } = req.body;
  if (username) user.username = username;
  if (joinDate) user.joinDate = joinDate;
  res.send({
    username: user.username,
    joinDate: user.joinDate
  });
});  
apiRouter.get('/user', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user) return res.status(401).send({ msg: 'Unauthorized' }); 
  res.send({
    username: user.username,
    joinDate: user.joinDate,
  }); 
});
//submitMessages
apiRouter.post('/message', verifyAuth, async (req, res) => {
  const sender = await findUser('token', req.cookies[authCookieName]);
  if (!sender) return res.status(401).send({ msg: 'Unauthorized' });

  const { message, toUsername } = req.body;
  if (!message || !toUsername) return res.status(400).send({ msg: 'Message and recipient required' });

  const recipient = await findUser('username', toUsername);
  if (!recipient) return res.status(404).send({ msg: 'Recipient not found' });

  // Add message to recipient's messages
  recipient.messages.push(`${sender.username}: ${message}`); 

  res.send({ success: true }); 
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });  
});  

// Return the application's default page if the path is unknown
//app.use((_req, res) => {
  //res.sendFile('index.html', { root: 'public' });
//});  
 

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, { 
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: false, 
    httpOnly: true,
    sameSite: 'strict', 
  }); 
}

app.listen(port, () => {  
  console.log(`Listening on port ${port}`);
}); 