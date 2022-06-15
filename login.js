const mysql = require('mysql')

var express = require('express')

var app = express()
const bodyparser = require('body-parser')

app.use(bodyparser.json())
var cors = require('cors')
app.use(cors())
app.use(cors({
    origin: '*'
}));

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "srivani"

})
mysqlConnection.connect((err) => {
    if (!err)
        console.log("db connected successfully")
    else
        console.log('db connection failed:' + JSON.stringify(err, undefined, 2))

})
app.get('/logininfo', (req, res) => {


    let query = "select *from  logintable "
    mysqlConnection.query(query, function (err, data) {
        if (!err)

            res.send(data)

        else {
            console.log(err)
        }
    })
}
)
app.post('/logininfo', (req, res) => {

    console.log("incoming values", req.body.UserName, req.body.PhoneNumber, req.body.Email, req.body.Message)
    let query = "insert into logintable (UserName,PhoneNumber,Email,Message) values ('" + req.body.UserName + "','" + req.body.PhoneNumber + "','" + req.body.Email + "','" + req.body.Message + "')"

    console.log("query values", query)
    let result = mysqlConnection.query(query, function (err, data) {
        if (!err)

            res.send(data)

        else {
            console.log(err)
        }
    })
}
)

app.listen('7452', ((req, res) => {
    console.log('server started at port number 7452');

}))




