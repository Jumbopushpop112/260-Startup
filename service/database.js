//mongodb+srv://mhart:<db_password>@slimestartup.8wgs5rb.mongodb.net/?appName=SlimeStartup 
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('users'); 