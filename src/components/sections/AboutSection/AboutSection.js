import styles from "./AboutSection.module.css";
import {createAboutTile} from "s/components/AboutTile/AboutTile.js";

import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import {findSplitLineTextAndSplitThem, animateSplitLineText} from "s/js/gsap/textAnimations.js";

export function createAboutSection() {
    const section = document.createElement("section");
    section.id = "aboutSection";

    section.innerHTML = `
        <div class="container ${styles.aboutContainer}">

          <div class="${styles.aboutTextContainer}">
            <h2 class="title-text" data-split-text>Обо мне</h2>
            <p class="${styles.aboutText}" data-split-text>
              Я студент университета ИТМО<br>Моя цель – создавать впечатляющие<br>и удобные веб-решения
              <br>Учеба на направлении<br>"Мобильные и сетевые технологии"<br>дает мне прочную техническую базу,<br>а мои хобби – спорт и музыка<br>развивают креативность и организованность
              <br>Творческий подход и разносторонность<br>позволяют мне находить<br>нестандартные решения<br>и создавать действительно<br>уникальные продукты.
            </p>
          </div>
          
          <div class="${styles.aboutTilesContainer}">
            <div class="${styles.aboutTilesWrapper}"></div>
          </div>

        </div>
    `

    // Элементы, которые будем использовать
    const aboutContainer = section.querySelector(`.${styles.aboutContainer}`);

    const aboutTitle = section.querySelector('.title-text');
    const aboutDescription = section.querySelector(`.${styles.aboutText}`);

    const tilesWrapper = section.querySelector(`.${styles.aboutTilesWrapper}`);

    // Тайлы
    let tileElements;

    function initTiles() {
        const tilesData = [
            { title: "Frontend dev", titleElementNumber: 1, location: "left" },
            { title: "Web-designer", titleElementNumber: 2, location: "right" },
            { title: "Android dev", titleElementNumber: 3, location: "left" }
        ];

        // Создаем DOM-элементы плиток с помощью вашего компонента createAboutTile
        tileElements = tilesData.map((tileData) => {
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
    }
    initTiles();

    // Анимации
    initGsapAnimations(aboutContainer, tileElements, aboutTitle, aboutDescription);

    return section;
}

function initGsapAnimations(aboutContainer, aboutTiles, aboutTitle, aboutDescription) {

    const animationDuration = 3000; // Продолжительность анимации
    const tileDelay = 0.1; // Промежуток между появлением плиток

    // Анимации текста
    document.fonts.ready.then(() => {
        // Анимации текста
        findSplitLineTextAndSplitThem(aboutContainer);

        animateSplitLineText({
            textEl: aboutTitle,
            scrollTrigger: {
                trigger: aboutTitle,
                start: "top 80%",
            },
            duration: 1
        });

        animateSplitLineText({
            textEl: aboutDescription,
            scrollTrigger: {
                trigger: aboutDescription,
                start: "center 80%",
                markers: true,
            },
            duration: 1
        });
    })

    // Анимация плиток
    const tilesTl = gsap.timeline();
    aboutTiles.forEach((tile, index) => {
        tilesTl.fromTo(tile, {
            yPercent: 100
        }, {
            yPercent: -165,
            autoAlpha: 1,
            ease: "power2.out",
            delay: index * tileDelay, // Задержка для появления по очереди
        }, 0);
    });

    // Тригер для плиток
    ScrollTrigger.create({
        trigger: aboutContainer,
        start: "top top",
        end: `+=${animationDuration}`,
        pin: aboutContainer,
        pinSpacing: true,
        scrub: true,
        animation: tilesTl,
    })

}