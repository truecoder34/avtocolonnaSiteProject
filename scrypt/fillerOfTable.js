// При помощи AJAX без обновления всей страницы выгружаем на сайт уже заполненую таблицу
$(document).on('click', '#sendCode', function() {
  $.post("/checkTrackingCode", {
      trackingCode: $("#placeForTrackNumber").val()
    },
    function(data) {
      // alert('DATA HAS GOTTEN');
      var fullTableFromDB = data; // С сервера прихложит ВСЯ таблица и пишем ее в эту переменную

      if (fullTableFromDB === "ERROR") {
        $(".table").append('<div>\
       По данному трекинг-номеру ничего не найдено\
       </div>\
       <ul>\
        <li>Проверьте кооректнось ввода трекинг-номера</li>\
        <li>Если, введеный трекинг-номер - корректен, информация о грузе еще не добавлена на сайт. Повторите запрос позже.</li>\
      </ul>\
       ')
      } else {
        console.log(fullTableFromDB);
        $(".table").empty();
        $('.table').append('<tr >\
      <th class="text-center">\
        #\
      </th>\
      <th class="text-center">\
        Дата и время\
      </th>\
      <th class="text-center">\
        Состояние груза\
      </th>\
    </tr>')
        fullTableFromDB.forEach(function(el, index) {
          $('.table').append('<tr>\
      <td>' + index + '</td>\
      <td>' + el.dateAndTime + '</td>\
      <td>' + el.stateOfShipment + '</td>\
      </tr>')

        })
      }

    }
  );
});
