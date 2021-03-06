const express = require('express');
const fs = require('fs');
//const bodyParser = require('body-parser');
const app = express();
//var iconv  = require('iconv').iconv; //인코딩을 변환 해주는 모듈, 필자는 iconv보다 iconv-lite를 선호한다.
//const charset = require('charset') //해당 사이트의 charset값을 알 수 있게 해준다.
const port = process.env.PORT || 5000;
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
const data = fs.readFileSync("./client/src/config/db-config.json");
/*
// db-config.json
{
    "host"     : "localhost",
    "user"     : "tester",
    "password" : "1234",
    "port"     : 3306,
    "database" : "example"
}
*/
app.listen(port, () => console.log(`Listening on port ${port}`));
const conf = JSON.parse(data);
const mysql = require('mysql');
const multer = require('multer');   //multer 라이브러리 중복되지 않는 형태로 업로드
const upload = multer({dest: './upload'})

const conn = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})
//conn.connect();

//test
app.get('/api/list', (req, res) => {
    conn.query("SELECT * FROM MYTABLE", (err, rows, fields) => {
        res.send(rows);
    })
     
});
app.get('/api/date', (req, res) => {
    conn.query("SELECT NOW() as now", (err, rows, fields) => {
        res.send(rows);
    })
});
app.get('/query/:id', (req, res) => {
    res.send({"id":req.query.id,"name":req.query.name, "path":req.params.id});
});

app.use('/image', express.static('./upload'));
app.post('/api/list', upload.single('image'), (req, res) =>{
    let sql = 'INSERT INTO MYTABLE values (null,?,?,?)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let email = req.body.email;
    let params = [name, email, image];
    conn.query(sql, params, (err, rows, fields) =>{
        res.send(rows);
    });
});

// demo
//sigungu list
app.get('/address', (req, res) => {
    conn.query("SELECT id, sigungu from address group by sigungu", (err, rows, fields) => {
        res.send(rows);
    })
});
//dong list
app.get('/address/:sigungu', (req, res) => {
    conn.query(`SELECT (@ROWNUM:=@ROWNUM+1) as num, list.id, list.sigungu, list.dong  from (SELECT * from address where sigungu='${req.params.sigungu}' group by dong) list, (SELECT @ROWNUM := 0) R limit 20`, (err, rows, fields) => {
        res.send(rows);
    })
});
//street list
app.get('/address/:sigungu/:dong', (req, res) => {
    conn.query(`SELECT * from address where sigungu='${req.params.sigungu}' and dong='${req.params.dong}' group by street limit 10`, (err, rows, fields) => {
        res.send(rows);
    })
});
//table list
app.get('/address/:sigungu/:dong/:street', (req, res) => {
    conn.query(`SELECT * from address where sigungu='${req.params.sigungu}' and dong='${req.params.dong}' and street='${req.params.street}'`, (err, rows, fields) => {
        res.send(rows);
    })
});