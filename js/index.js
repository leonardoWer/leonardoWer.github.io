$(document).ready(function(){

    // Загрузчик страницы исчезает после загрузки
    $(".loader_area").css("display", "none");

    // Калькулятор
    function find_cost() {
        let price = parseInt( $("#type_site option:selected").val() ) + parseInt( $("#type_design option:selected").val() ) + parseInt( $("#type_device option:selected").val() );
        let deadline = parseInt( $("#type_site option:selected").attr("days") ) + parseInt( $("#type_design option:selected").attr("days") ) + parseInt( $("#type_device option:selected").attr("days") );
        $(".days .digit").text(deadline);
        $(".price .digit").text(price);
    }
    // При изменении варианта вызываем функцию
    $("select").on("change", function(){
        find_cost();
    });
    find_cost();

});


// Плавный скрол страницы
$('a[href^="#"]').click(function() {
    let valHref = $(this).attr("href");
    $('html, body').animate({scrollTop: $(valHref).offset().top - 60 + "px"});
});



// Уведомление подсчёт цены сайта
// function findCost() {
//     let price = 0, deadline = 0;
//     let cost = [
//         [1000, 4000, 7000],
//         [1000, 3000, 6000],
//         [1000, 2000, 4000],
//     ];
//     let days = [
//         [2, 5, 10],
//         [0, 2, 5],
//         [1, 2, 3],
//     ];
//
//     function calcCostAndDeadline(type) {
//         switch (type) {
//             case "1":
//                 price += cost[0][parseInt(type) - 1]
//                 deadline += days[0][parseInt(type) - 1]
//                 break;
//             case "2":
//                 price += cost[1][parseInt(type) - 1]
//                 deadline += days[1][parseInt(type) - 1]
//                 break;
//             case "3":
//                 price += cost[2][parseInt(type) - 1]
//                 deadline += days[2][parseInt(type) - 1]
//                 break;
//             default:
//                 alert("Пожалуйста, выберите вариант из предложенных")
//                 findCost()
//
//         }
//     }
//
//     function getUserInfo() {
//         let site_type = prompt("Какой тип сайта вам нужен?\n1 - Сайт-визитка\n2 - Корпоративный сайт\n3 - Интернет магазин");
//         calcCostAndDeadline(site_type);
//         let design_type = prompt("Какой дизайн сайта вам нужен?\n1 - Шаблонный\n2 - Уникальный\n3 - Очень специализированный");
//         calcCostAndDeadline(design_type);
//         let adaptive_type = prompt("Сайт какой адаптивности вам нужен?\n1 - Только ПК\n2 - Только мобильные устройства\n3 - ПК + Мобильные устройства");
//         calcCostAndDeadline(adaptive_type);
//     }
//
//     function getResult() {
//         let doFind = confirm("Хотите произвести расчёт стоимости сайта?")
//         if (doFind) {
//             getUserInfo()
//             let again = confirm(`По нашим расчётам, на создание сайта потребуется до ${deadline} дней, а цена составит ${price} рублей`)
//             if (!again) {
//                 let answer = confirm("Хотите произвести подсчёт ещё раз?")
//                 if (answer) {
//                     getResult()
//                 }
//             }
//         }
//
//     }
//
//     getResult();
// }
// findCost();

