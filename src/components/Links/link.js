import gsap from 'gsap';
import {ScrollToPlugin} from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

export function createLink({ title, onClick, className }) {
    const link = document.createElement("a");

    // Устанавливаем текст ссылки
    link.textContent = title;

    // Класс
    if (className) {link.classList.add(className)}

    // Настраиваем клик
    if (onClick && typeof onClick === 'object') {

        // Это внешняя ссылка (открывается в браузере)
        if (onClick.link) {

            link.href = onClick.link;

            // Устанавливаем параметры
            onClick.target ? link.target = onClick.target : link.target = "_blank";
            onClick.rel ? link.rel = onClick.rel : link.rel = "noopener noreferrer";

            // Если передан, устанавливаем титл (отображается при наведении)
            if (onClick.hoverTitle) {
                link.title = onClick.hoverTitle;
            }

        } else if (onClick.href) {
            // Якорь (перемещение по странице)
            onClick.href ? link.href = onClick.href : link.href = "#";

            link.addEventListener("click", (event) => {
                event.preventDefault(); // Отменяем стандартное поведение ссылки

                const targetId = onClick.href;
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    gsap.to(window, {
                        duration: 0.8,
                        ease: "power3.inOut",
                        scrollTo: {
                            y: targetElement, // Прокручиваем к targetElement
                        },
                    });
                }
            });
        }
    }

    return link;
}

/*
Примеры использования
createLink({
    title: "test 1",
    onClick: {
        link: "https://example.com/",
        target: "_blank",
        hoverTitle: "Visit my tg"
    }
})

createLink({
    title: "test 2",
    onClick: {
        href: "aboutSection",
    }
})
*/