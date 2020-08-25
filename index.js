const express = require("express");
const bodyParser = require("body-parser");
var login = require('./app/routes/loginroutes.js');
var mysql=require('mysql');
const PORT=3001 || process.env.PORT;
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'agentworkindia'
  });
  
  // open the MySQL connection
  connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });
// simple route
app.get('/', function(req, res) {
    res.json({ message: 'welcome to our mission' });
});
// register details
app.post('/app/agent/', function (req, res) {
    var postData  = req.body;
    connection.query('INSERT INTO agent SET ?', [postData], function (error, results, fields) {
       if (error) throw error;
       res.json({ status: 'account created',
    status_code: '200' });
       res.end(JSON.stringify(results));
       
     });
 });
// login detials
app.post('/app/agent/auth', function (req, res) {
    var postData  = req.body;
    var aid=postData.agent_id;
    var pw=postData.password;
    connection.query('SELECT * FROM agent WHERE agent_id=? AND password=?', [aid,pw], function (error, results, fields) {
       if (error) {
        res.json({ status: 'failure',
        status_code: '401' });    
       }
       else {
       res.json({ status: 'success',
    status_code: '200' });
       }
       res.end(JSON.stringify(results));
       
     });
 });

app.post('/app/sites/', function (req, res) {
    var postData  = req.body;
    connection.query('INSERT INTO agentform SET ?', [postData], function (error, results, fields) {
       if (error) throw error;
       res.json({ status: 'success',
    status_code: '200' });
       res.end(JSON.stringify(results));
       
     });
 });

 app.get('/app/sites/list/:id', function (req, res) {
    console.log(req);
    connection.query('select * from agentform where agent_id=? ORDER BY due_date ASC', [req.params.id], function (error, results, fields) {
       if (error) throw error;       
       res.end(JSON.stringify(results));
       
     });
 });

// set port, listen for requests
app.listen(PORT, () => {
  console.log("Server is running on port 3001.");
});