import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initTimeline() {

    const aboutTextContainer = document.querySelector(".about-text-container");
    const aboutTiles = document.querySelectorAll(".about-tile");
    const aboutContainer = document.querySelector(".about-container");

    const animationDuration = 2000; // Продолжительность анимации
    const tileDelay = 0.2; // Промежуток между появлением плиток

    // 1. Закрепление текста
    gsap.to(aboutTextContainer, {
        scrollTrigger: {
            trigger: aboutContainer,
            start: "top top",
            end: `+=${animationDuration}`,
            pin: true,
            pinSpacing: true,
            scrub: true,
        }
    });

    // 2. Анимация плиток (с использованием Timeline)
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: aboutContainer,
            start: "top top",
            end: `+=${animationDuration}`,
            scrub: true,
            pin: false,
            invalidateOnRefresh: true, //  Пересчет при изменении размеров
        }
    });

    aboutTiles.forEach((tile, index) => {
        tl.fromTo(tile, {
            yPercent: 100 //  Начальное положение (вне экрана снизу)
            }, {
            yPercent: -200, //  Сверху экрана
            autoAlpha: 1,   //  Появление плитки
            ease: "power2.out",
            duration: 1, //  Длительность анимации
            delay: index * tileDelay, // Задержка для появления по очереди
        }, 0); //  0 означает, что все анимации будут выполняться последовательно
    });
}