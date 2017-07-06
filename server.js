var mysql = require("mysql"); // подключаем модуль mysql
var express = require("express"); // подключаем модуль express (http сервер)
app = express();
var bodyParser = require("body-parser");
var fs = require("fs"); // Подключили бибилиотеку-модуль для работы с файлами
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(__dirname)); // Путь относительно которого нудно искать наши файлы. Задаем папку в которой искать файлики


/*------реакция на get запрос. Обращаемся к самому сайту и послыаем пользователю нашу верстку.
Делаем это чтобы на сайте прогрузилась вся наша верстка------*/
app.get("/", function(req,res){
  res.setHeader("Content-Type","text/html");
  res.sendFile(__dirname +"/index.html");
})
/*------Конец этого блока------*/

app.get("/contacts", function(req,res){
  res.setHeader("Content-Type","text/html");
  res.sendFile(__dirname +"/contacts.html");
})

app.get("/adress", function(req,res){
  res.setHeader("Content-Type","text/html");
  res.sendFile(__dirname +"/adress.html");
})







app.listen(1686);
console.log("run at 1686");
