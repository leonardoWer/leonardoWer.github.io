import styles from './MyWorksSection.module.css'
import {createWorkTile} from "s/components/WorkTile/WorkTile.js";
import {createEllipsLink} from "s/components/Links/EllipsLink/EllipsLink.js";
import {linksData} from "s/js/utils/linksData.js";

import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {SplitText} from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

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
        
        <div class="${styles.viewAllWorksContainer}"></div>
    `

    // Элементы верхней части
    const topContainer= section.querySelector(`.${styles.myWorks__top}`);
    const topContentContainer = section.querySelector(`.${styles.myWorksTop__bg}`);
    const titleText = section.querySelector(`.${styles.myWorksTitle}`);
    const worksTopPreviewContainer = section.querySelector(`.${styles.myWorksTop__previewContainer}`);

    // Элементы нижней части
    const bottomContainer = section.querySelector(`.${styles.myWorks__bottom}`);
    const workTilesContainer = section.querySelector(`.${styles.myWorksBottom__workTilesContainer}`);
    const bottomContainerTextElements = section.querySelector(`.${styles.myWorksBottom__textContainer}`).querySelectorAll('span');

    const viewAllWorksContainer = section.querySelector(`.${styles.viewAllWorksContainer}`)

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

    // Заполняем контентом

    // Мои работы
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
    initWorksBottomGsapAnimations(bottomContainer, workTilesContainer, bottomContainerTextElements);

    // Посмотреть все работы
    createViewAllWorksContent(viewAllWorksContainer);

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

function initWorksBottomGsapAnimations(bottomContainer, workTilesContainer, bottomContainerTextElements) {
    // Разбиваем текст
    const splitText1 = new SplitText(bottomContainerTextElements[0], {type: "words"})
    const splitText2 = new SplitText(bottomContainerTextElements[1], {type: "words"})

    const tl = gsap.timeline();
    tl.to(workTilesContainer, {
        xPercent: -70,
        ease: "power1.inOut",
        duration: 2
    }, 0)
        .to(splitText2.words, {
            opacity: 0,
            stagger: 0.1,
            ease: "power3.in",
            duration: 0.2
        }, 0)
        .to(splitText1.words.reverse(), {
            opacity: 0,
            stagger: 0.1,
            ease: "power3.in",
            duration: 0.2
        }, 0.1)


    ScrollTrigger.create({
        trigger: bottomContainer,
        start: "top top",
        end: "+=2000",
        pin: bottomContainer,
        scrub: true,
        animation: gsap.timeline().add(tl),
    });
}

function createViewAllWorksContent(parent) {
    // Данные
    const leftText = "Я умею"
    const linkData = {
        title: "see all works",
        onClick: {
            link: linksData.portfolio,
            hoverTitle: "Visit my portfolio",
        },
        style: "dark"
    }
    const rightText = "не только это"

    // Создаём элемент
    const contentWrapper = document.createElement("div");
    contentWrapper.className = styles.viewAllWorksContainer__contentWrapper;

    // Текст слева
    const textLeftSpan = document.createElement("span");
    textLeftSpan.textContent = leftText;
    textLeftSpan.className = styles.viewAllWorksContainer__leftText;

    // Ссылка на портфолио
    const linkEl = createEllipsLink(linkData);

    // Текст справа
    const textRightSpan = document.createElement("span");
    textRightSpan.textContent = rightText;
    textRightSpan.className = styles.viewAllWorksContainer__rightText;

    // Добавляем элементы
    contentWrapper.appendChild(textLeftSpan);
    contentWrapper.appendChild(linkEl);
    contentWrapper.appendChild(textRightSpan);

    // Добавляем в родителя
    parent.appendChild(contentWrapper);

    // Анимации
    const splitText1 = new SplitText(textLeftSpan, { type: "chars" });
    const splitText2 = new SplitText(textRightSpan, { type: "chars" });
    const wordDelay = 0.05;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: parent,
            start: "center bottom",
            end: "bottom bottom",
            scrub: true,
        }
    });
    tl.from(splitText1.chars, {
        opacity: 0,
        stagger: wordDelay,
        ease: "power3.in",
    })
        .from(splitText2.chars, {
            opacity: 0,
            stagger: wordDelay,
            ease: "power3.in",
    }, "<")
}