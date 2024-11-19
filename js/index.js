function findCost() {
    let price = 0, deadline = 0;
    let cost = [
        [1000, 3000, 5000],
        [2000, 5000, 7000],
        [1000, 2000, 5000],
    ];
    let days = [
        [2, 5, 10],
        [0, 2, 5],
        [1, 2, 3],
    ];

    function calcCostAndDeadline(type) {
        switch (type) {
            case "1":
                price += cost[0][parseInt(type) - 1]
                deadline += days[0][parseInt(type) - 1]
                break;
            case "2":
                price += cost[1][parseInt(type) - 1]
                deadline += days[1][parseInt(type) - 1]
                break;
            case "3":
                price += cost[2][parseInt(type) - 1]
                deadline += days[2][parseInt(type) - 1]
                break;
            default:
                alert("Пожалуйста, выберите вариант из предложенных")
                findCost()

        }
    }

    function getUserInfo() {
        let site_type = prompt("Какой тип сайта вам нужен?\n1 - Сайт-визитка\n2 - Корпоративный сайт\n3 - Интернет магазин");
        calcCostAndDeadline(site_type);
        let design_type = prompt("Какой дизайн сайта вам нужен?\n1 - Шаблонный\n2 - Уникальный\n3 - Очень специализированный");
        calcCostAndDeadline(design_type);
        let adaptive_type = prompt("Сайт какой адаптивности вам нужен?\n1 - Только ПК\n2 - Только мобильные устройства\n3 - ПК + Мобильные устройства");
        calcCostAndDeadline(adaptive_type);
    }

    function getResult() {
        let doFind = confirm("Хотите произвести расчёт стоимости сайта?")
        if (doFind) {
            getUserInfo()
            let again = confirm(`По нашим расчётам, на создание сайта потребуется до ${deadline} дней, а цена составит ${price} рублей`)
            if (!again) {
                let answer = confirm("Хотите произвести подсчёт ещё раз?")
                if (answer) {
                    getResult()
                }
            }
        }

    }

    getResult();
}

// findCost();

// Плавный скрол страницы
$('a[href^="#"]').click(function() {
    let valHref = $(this).attr("href");
    $('html, body').animate({scrollTop: $(valHref).offset().top - 60 + "px"});
});

// Подсвечивание элемента меню
$(window).scroll(() => {
    let scrollDistance = $(window).scrollTop();
    $(".section").each((index, element) => {
        if($(element).offset().top - $("nav").outerHeight() <= scrollDistance ) {
            $(".menu ul li a").each((index, element) => {
                if ($(element).hasClass("active")) {
                    $(element).removeClass("active");
                }
            });
            $('.menu ul li:eq('+ index +')').find('a').addClass('active');
        }
    });
});