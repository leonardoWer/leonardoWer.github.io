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
              Я студент университета ИТМО. Моя цель – создавать впечатляющие и удобные веб-решения.
              Учеба на направлении "Мобильные и сетевые технологии" дает мне прочную техническую базу,
              а мои хобби – спорт и музыка – развивают креативность и организованность.
              Творческий подход и разносторонность позволяют мне находить нестандартные решения и создавать действительно уникальные продукты.
            </p>
          </div>
          
          <div class="${styles.aboutTilesContainer}">
            <div class="${styles.aboutTilesWrapper}"></div>
          </div>

        </div>
    `

    // Получаем ссылки на внутренние элементы, которые будем использовать
    const aboutContainer = section.querySelector(`.${styles.aboutContainer}`);
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
    initGsapAnimations(aboutContainer, tileElements);

    return section;
}

function initGsapAnimations(aboutContainer, aboutTiles) {

    const animationDuration = 3000; // Продолжительность анимации
    const tileDelay = 0.1; // Промежуток между появлением плиток

    // 2. Анимация плиток (с использованием Timeline)
    const tl = gsap.timeline();
    aboutTiles.forEach((tile, index) => {
        tl.fromTo(tile, {
            yPercent: 100 //  Начальное положение (вне экрана снизу)
        }, {
            yPercent: -165, //  Сверху экрана
            autoAlpha: 1,   //  Появление плитки
            ease: "power2.out",
            delay: index * tileDelay, // Задержка для появления по очереди
        }, 0); //  0 означает, что все анимации будут выполняться последовательно
    });

    ScrollTrigger.create({
        trigger: aboutContainer,
        start: "top top",
        end: `+=${animationDuration}`,
        pin: aboutContainer,
        pinSpacing: true,
        scrub: true,
        animation: tl,
    })

}