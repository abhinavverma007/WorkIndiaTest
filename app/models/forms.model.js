var dbConn = require('./../../config/db.config');

var agents=function(agent){
    this.agent_id=agent.agent_id;
    this.title=agent.title;
    this.description=agent.description;
    this.category=agent.category;
    this.due_date=new Date();

};

agents.create = function (id,newEmp, result) {
    dbConn.query("INSERT INTO agentform set ?", newEmp, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      console.log(res.insertId);
      result(null, res.insertId);
    }
    });
    };