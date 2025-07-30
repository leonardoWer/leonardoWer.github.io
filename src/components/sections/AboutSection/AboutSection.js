import styles from "./AboutSection.module.css";
import {createAboutTile} from "s/components/AboutTile/AboutTile.js";

import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function createAboutSection() {
    const section = document.createElement("section");
    section.id = "aboutSection";

    section.innerHTML = `
        <div class="container ${styles.aboutContainer}">

          <div class="${styles.aboutTextContainer}">
            <h2 class="title-text">Обо мне</h2>
            <p class="${styles.aboutText}">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet minima quae quam quasi soluta sunt vitae. Animi aut doloribus harum laudantium magnam nam officia possimus provident recusandae reiciendis. A ipsa modi ullam! Expedita libero, odit! Aperiam eaque ipsum officia!
            </p>
          </div>
          
          <div class="${styles.aboutTilesContainer}">
            <div class="${styles.aboutTilesWrapper}"></div>
          </div>

        </div>
    `

    // Получаем ссылки на внутренние элементы, которые будем использовать
    const aboutContainer = section.querySelector(`.${styles.aboutContainer}`); // Используем CSS-модульный класс
    const aboutTextContainer = section.querySelector(`.${styles.aboutTextContainer}`);
    const tilesWrapper = section.querySelector(`.${styles.aboutTilesWrapper}`);

    const tilesData = [
        { title: "Frontend dev", titleElementNumber: 1, location: "left" },
        { title: "Web-designer", titleElementNumber: 2, location: "right" },
        { title: "Android dev", titleElementNumber: 3, location: "left" }
    ];

    // Создаем DOM-элементы плиток с помощью вашего компонента createAboutTile
    const tileElements = tilesData.map((tileData) => {
        return createAboutTile({
            title: tileData.title,
            titleElementNumber: tileData.titleElementNumber,
            location: tileData.location,
        });
    });

    // Добавляем созданные плитки в wrapper
    tileElements.forEach(tileElement => {
        tilesWrapper.appendChild(tileElement);
    });

    // Анимации
    initGsapAnimations(
        aboutContainer,
        aboutTextContainer,
        tileElements  // Передаем массив DOM-элементов плиток
    );

    return section;
}

function initGsapAnimations(aboutContainer, aboutTextContainer, aboutTiles) {

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