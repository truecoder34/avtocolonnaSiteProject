var mysql = require("mysql"); // подключаем модуль mysql
var express = require("express"); // подключаем модуль express (http сервер)
app = express();
var bodyParser = require("body-parser");
var fs = require("fs"); // Подключили бибилиотеку-модуль для работы с файлами
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(__dirname)); // Путь относительно которого нудно искать наши файлы. Задаем папку в которой искать файлики

// Непосредственно блок подсоединения базы данных sql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
/*-----Конец блока подкдючения к sql------*/





/*------реакция на get запрос. Обращаемся к самому сайту и послыаем пользователю нашу верстку.
Делаем это чтобы на сайте прогрузилась вся наша верстка------*/
app.get("/", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(__dirname + "/main.html");
})
/*------Конец этого блока------*/

/*------  необходимая и отображается на сайте требуемая страница ------*/
app.get("/contacts", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(__dirname + "/contacts.html");
})

app.get("/adress", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(__dirname + "/adress.html");
})

app.get("/tracking", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(__dirname + "/tracking.html");
})
/*------Конец этого блока------*/

/*-----Реализуем получение данных о сообщение клиента с сайта (форм для ввода) на сервак. А с сервака идет в sql базу данных-----*/
app.post("/sendMail", function(req, res) {
  /*----Блок подключения непосредственно к нашей базе данных по назанию recievedmail :
    "use recievedmail" - указываем что работаем с этой базой данных----------*/
  con.query("use recievedmail", function(err, result) {
    if (err) throw err;
    console.log("use ok"); // выводим сообщение в консоль, что все хорошо  и к базе данных подключилось
  });
  /*----Конец блока подключения----------*/

  var number = req.body.name + req.body.email + req.body.phone + req.body.subject + req.body.message;
  console.log(number);
  /*обращаемся к базе данных, посылая запрос на вставку записис в базу.
  Сначала прописываем поля, куда вставить, потом непосредственно значения для вставки */
  con.query("INSERT INTO recievedmail (nameOfUser,emailAdress,phoneNumber, themeOfLetter, textOfLetter) VALUES( \"" + req.body.name + "\",\"" + req.body.email + "\",\"" +
    req.body.phone + "\",\"" + req.body.subject + "\",\"" + req.body.message + "\");",
    function(err, result) {
      if (err) throw err;
      console.log("INSERT ok");
    });
  res.setHeader("Content-Type", "text/html");
  res.sendFile(__dirname + "/contacts.html");
})
/*------Конец этого блока------*/


/*-----Реализуем получение данных о трекинг-номере с сайта (форм для ввода) на сервак. А с сервака идем сравнивать в sql базу данных и ищем таблицу с таким же трекинг номером-----*/
app.post("/checkTrackingCode", function(req, res) {
  console.log('checkTrackingCode start', 'req.body.trackingCode = ', req.body.trackingCode);
  var trackingNumber = req.body.trackingCode; // записали считаный трекинг код в отдельную переменую
  var answer;
  var quantityOfRows;
  console.log(trackingNumber); // Выведем считанный трекинг код в консоль для проверки

  /*----Блок подключения непосредственно к нашей базе данных по назанию tracking_info :
    "use tracking_info" - указываем что работаем с этой базой данных----------*/
  con.query("use tracking_info", function(err, result) {
    if (err) {
      console.log("checkTrackingCode use error");
      throw err;
    }
    console.log("checkTrackingCode use ok"); // выводим сообщение в консоль, что все хорошо  и к базе данных подключилось

    /*обращаемся к базе данных, посылая запрос на считывание инофрмации из таблицы и записи в таблицу на сайте .
    Сначала прописываем поля, куда вставить, потом непосредственно значения для вставки */
    // console.log("SELECT * FROM "+ recievedmail+";");
    con.query("SELECT * FROM " + trackingNumber + ";", function(err, result, fields) {
      if (err) {
        console.log("checkTrackingCode SELECT error");
        answer = "ERROR";
        res.send(answer);
      }
      else{
      console.log("checkTrackingCode SELECT ok");
      answer = JSON.stringify(result); // Превратили нашу таболицу в формат JSON
      res.setHeader('Content-Type', 'application/json');
      console.log("checkTrackingCode SEND ok");
      res.send(answer); // отправляем все данные из таблицы
      }
    });



    // res.send(quantityOfRows); // отправляем количество строк в таблице

  });
  /*----Конец блока подключения----------*/

  //  res.sendFile(__dirname +"/tracking.html");
})
/*------Конец этого блока------*/







app.listen(1686);
console.log("run at 1686");
