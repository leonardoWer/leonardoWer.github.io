export function createLink({ title, onClick }) {
    const link = document.createElement("a");
    link.textContent = title;

    if (onClick && typeof onClick === 'object') {

        // Это внешняя или внутренняя ссылка (открывается в браузере)
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
            link.href = onClick.href;

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