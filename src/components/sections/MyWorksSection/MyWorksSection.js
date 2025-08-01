import styles from './MyWorksSection.module.css'
import {createWorkTile} from "s/components/WorkTile/WorkTile.js";

import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const photoPath = "/img/works/"

export function createMyWorksSection() {
    const section = document.createElement("section");
    section.id = "myWorksSection";

    section.innerHTML = `
        <div class="container ${styles.myWorks__top}">
          <div class="${styles.myWorksTop__bg}"></div>
          <div class="${styles.myWorksTop__contentContainer}">
              <h2 class="${styles.myWorksTitle}">Мои работы</h2>
              <div class="${styles.myWorksTop__previewContainer}"></div>
          </div>
        </div>

        <div class="${styles.myWorks__bottom}">
          <div class="${styles.myWorksBottom__textContainer}">
            <span class="${styles.myWorksBottomTextContainer__title}">Каждый проект</span>
            <span class="${styles.myWorksBottomTextContainer__uniq}">уникален</span>
          </div>
          <div class="${styles.myWorksBottom__workTilesContainer}"></div>
        </div>
    `

    // Элементы верхней части
    const topContainer= section.querySelector(`.${styles.myWorks__top}`);
    const topContentContainer = section.querySelector(`.${styles.myWorksTop__bg}`);
    const titleText = section.querySelector(`.${styles.myWorksTitle}`);
    const worksTopPreviewContainer = section.querySelector(`.${styles.myWorksTop__previewContainer}`);

    // Элементы нижней части
    const bottomContainer = section.querySelector(`.${styles.myWorks__bottom}`);
    const workTilesContainer = section.querySelector(`.${styles.myWorksBottom__workTilesContainer}`);
    const bottomTextContainer = section.querySelector(`.${styles.myWorksBottom__textContainer}`);

    // Мои работы
    const myWorksData = [
        {
            name: "Spider-Man-Movies",
            titleImg: "spider-man-movies.png",
            stack: ["vite", "gsap"],
            link: "leonardoWer.github.io/Spider-Man-Movie",
        },
        {
            name: "basketball-courts",
            titleImg: "basketball-courts.png",
            stack: ["vite", "gsap", "ymaps API"],
            link: "leonardoWer.github.io/basketball-courts",
        },
        {
            name: "Петербург Бенуа",
            titleImg: "benua-hsitmo.png",
            stack: ["vanilla", "ymaps API"],
            link: "http://benua.hsitmo.ru",
        },
    ];

    const myWorksPreviewTilesData = []

    myWorksData.forEach(work => {
        // Верхняя часть
        const previewTile = createWorkPreviewTile({img: work.titleImg})
        myWorksPreviewTilesData.unshift(previewTile);
        worksTopPreviewContainer.appendChild(previewTile);

        // Нижняя часть
        const workTile = createWorkTile({
            title: work.name,
            titleImg: photoPath + work.titleImg,
            stack: work.stack,
            link: work.link});
        workTilesContainer.appendChild(workTile);
    })

    initWorksTopGsapAnimations(topContainer, topContentContainer, titleText, worksTopPreviewContainer, myWorksPreviewTilesData);
    initWorksBottomGsapAnimations(bottomContainer, workTilesContainer, bottomTextContainer);

    return section;
}

function createWorkPreviewTile({img}) {
    const tile = document.createElement("div");
    tile.className = styles.myWorksTopPreviewContainer__itemWrapper;
    tile.innerHTML = `
    <img class="${styles.myWorksTopPreviewContainer__item}" src="${photoPath + img}" alt="${img}">
    `;

    return tile;
}

function initWorksTopGsapAnimations(topContainer, topBg, titleText, myWorksTopPreviewContainer, myWorksPreviewTilesData) {

    // 1. Анимация фона (управляемая ScrollTrigger)
    gsap.fromTo(topBg, {
        height: "30vw",
        width: "30vw",
    }, {
        height: "130vw",
        width: "130vw",
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: topContainer,
            start: "top 55%",
            end: "bottom bottom",
            scrub: true,
            toggleActions: "play none none reverse"
        }
    });

    // 2. Анимация текста и контейнера (запускается после анимации фона)
    const fadeInTl = gsap.timeline();
    fadeInTl.fromTo(titleText, {
        opacity: 0
    }, {
        ease: "power1.inOut",
        opacity: 1, duration: 1
    })

    const previewContainerFadeInTl = gsap.timeline()
    previewContainerFadeInTl.from(myWorksTopPreviewContainer, {
        xPercent: -100,
        ease: "power3.inOut",
        duration: 3
    }, 0);

    // 3. Анимация поворота и раздвижения карточек (зависит от прокрутки)
    const tilesRotateAndSpacingTl = gsap.timeline();
    myWorksPreviewTilesData.forEach((tile, index) => {
        tilesRotateAndSpacingTl.to(tile, {
            rotateY: "-30deg",
            xPercent: index * 12,
            rotateX: index * 2,
            ease: "power3.inOut",
            duration: 2,
        }, 0)
    });
    tilesRotateAndSpacingTl.to(myWorksTopPreviewContainer, {
        xPercent: -20,
        duration: 2,
        ease: "power1.inOut",
    }, 0)

    // 4. Анимация подъема и опускания карточек (зависит от прокрутки)
    const tilesFadeOutTl = gsap.timeline();
    myWorksPreviewTilesData.forEach((tile) => {
        tilesFadeOutTl.to(tile, { // Поднимаем
            yPercent: -12,
            duration: 0.5,
            ease: "power2.in",
        }, "+=0.5")
            .to(tile, { // Опускаем
                yPercent: 200,
                scale: 0.8,
                duration: 1.5,
                ease: "power3.in",
            }, "+=0.5");
    });

    // 5. Создаем ScrollTrigger для запуска анимаций плиток и закрепления
    ScrollTrigger.create({
        trigger: topContainer,
        start: "top top",
        end: "+=4500",
        pin: topContainer,
        scrub: true,
        animation: gsap.timeline().add(fadeInTl).add(previewContainerFadeInTl).add(tilesRotateAndSpacingTl).add(tilesFadeOutTl),
    });

}

function initWorksBottomGsapAnimations(bottomContainer, workTilesContainer, textContainer) {
    const tl = gsap.timeline();
    tl.to(workTilesContainer, {
        xPercent: -70,
        ease: "power1.inOut",
        duration: 2
    }, 0)
        .to(textContainer, {
            opacity: 0,
            ease: "power3.in",
            duration: 0.4
        }, 0)

    ScrollTrigger.create({
        trigger: bottomContainer,
        start: "top top",
        end: "+=2000",
        pin: bottomContainer,
        scrub: true,
        animation: gsap.timeline().add(tl),
    });
}