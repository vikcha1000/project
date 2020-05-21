async function getResponce() {

    //получаем ответ от сервера
    let response = await fetch('https://json.medrating.org/users/');
    let response2 = await fetch('https://json.medrating.org/albums');
    let response3 = await fetch('https://json.medrating.org/photos');



    // получаем тело ответа
    let content = await response.json();
    let content2 = await response2.json();
    let content3 = await response3.json();


    var myP = document.getElementById("myP");
    //получить HTML содержимое элемента, имеющего id="myP"
    myP.innerHTML;
    //изменить HTML содержимое элемента, имеющего id="myP"


    //выводим все данные users
    for (let index = 0; index < content.length; index++) {

        myP.innerHTML += `<li class="user">${content[index].name}`

        //выводим все данные albums, который соответствуют users
        for (let index2 = 0; index2 < content2.length; index2++) {

            if (content2[index2].userId == content[index].id) {

                myP.innerHTML += `<li class="album_${index} album">  ${content2[index2].title} </li>`;


                //выводим все данные photoes, который соответствуют albums
                for (let index3 = 0; index3 < content3.length; index3++) {

                    if (content3[index3].albumId == content2[index2].id) {

                        myP.innerHTML += `<div class="photo_${index2} photo"><img src = "images/star.png" class="star"><img src="${content3[index3].thumbnailUrl}" data-src="${content3[index3].url}" class="image" title = "${content3[index3].title}"></div>`;
                    }

                };
            };

        };




    };


    //цикл, позволяющий скрываьб/открывать блок фотографий при нажатии на альбом
    for (let index2 = 0; index2 < 100; index2++) {


        //оборачиваем все фотографии в тэг 
        $(".photo_" + index2).wrapAll("<ul class='photo__list'></ul>");

        var coll = document.getElementsByClassName(`album_${index2}`);
        var col2 = document.getElementsByClassName("photo__list");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }

    };



    //вывод большого изображения при нажатии на маленькое с эффектами
    $(".image").click(function() { // Событие клика на маленькое изображение
        var img = $(this); // Получаем изображение, на которое кликнули
        var src = img.attr('data-src'); // Достаем из этого изображения путь до картинки
        $("body").append("<div class='popup'>" + //Добавляем в тело документа разметку всплывающего окна
            "<div class='popup_bg'></div>" + // Блок, который будет служить фоном затемненным
            "<img src='" + src + "' class='popup_img' />" + // Само увеличенное фото
            "</div>");
        $(".popup").fadeIn(400); // Медленно выводим изображение
        $(".popup_bg").click(function() { // Событие клика на затемненный фон	   
            $(".popup").fadeOut(400); // Медленно убираем всплывающее окно
        });
    });


    //при нажатии на звезду около фотографии, она окрашивается
    $(".star").click(function() {
        $(this).toggleClass('selected');
    });

}




//вызов функции
getResponce();