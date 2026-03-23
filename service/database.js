//mongodb+srv://mhart:<db_password>@slimestartup.8wgs5rb.mongodb.net/?appName=SlimeStartup 
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('slime'); 
const userCollection = db.collection('user')
const messageCollection = db.collection('messages')

//testing connection function
(async function testConnection() { 
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`); 
    await addUser({ username: "test", password: "123" });
    console.log("Test user added"); 
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1); 
  }
})();  

function getUser(username){
  return userCollection.findOne({username: username});
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user); 
} 

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user }); 
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ username: user.username }, { $unset: { token: 1 } }); 
}

module.exports = {
    getUser,
    getUserByToken, 
    addUser,
    updateUser, 
    updateUserRemoveAuth 
}