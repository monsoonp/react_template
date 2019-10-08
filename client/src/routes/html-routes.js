//
//const mysql = require('mysql');

module.exports = (app,conn) => {
    app.get('/', function(req, res){
        conn.query('SELECT * FROM mytable', function(err, data){
            (err)? res.send(err): res.json({mytable: data});
        })
        //res.send('Hello from example project');
    });
};