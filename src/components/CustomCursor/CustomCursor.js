import gsap from "gsap";
import customCursorStyles from "./CustomCursor.module.css";

export function initCursor() {
    // Создаем курсор
    const cursor = document.createElement("div");
    cursor.id = "customCursor";
    cursor.className = customCursorStyles.cursor;
    document.body.querySelector("#smooth-content").appendChild(cursor);

    let cursorX = 0;
    let cursorY = 0;

    // Функция для обновления позиции курсора
    const updateCursorPosition = () => {
        gsap.to(cursor, {
            duration: 1, // Настраиваем плавность (чем меньше, тем быстрее)
            top: cursorY,
            left: cursorX,
            ease: "power3.out",
            delay: "0.05"
        });
    };

    // Следим за движением мыши
    document.addEventListener("mousemove", (e) => {
        cursorX = e.pageX;
        cursorY = e.pageY;
        updateCursorPosition();
    });

    // Функция для инициализации кастомного курсора при наведении на элемент
    function initCustomCursorWhenHoverAnElement(element, customCursorContent) {
        element.addEventListener("mouseenter", () => {
            cursor.style.opacity = 1; // Показываем курсор

            // Очищаем содержимое курсора перед добавлением нового
            cursor.innerHTML = "";

            // Добавляем контент внутрь курсора (может быть любой элемент)
            cursor.appendChild(customCursorContent);
        });
        element.addEventListener("mouseleave", () => {
            cursor.style.opacity = 0; // Скрываем курсор

            // Очищаем содержимое курсора
            cursor.innerHTML = "";
        });

        customCursorContent.addEventListener("mouseenter", (e) => {
            cursor.style.opacity = 1;
        })
    }

    // initializeCursorsHere

}