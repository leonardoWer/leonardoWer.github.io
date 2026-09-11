import styles from "./Header.module.css"

import gsap from "gsap"
import {SplitText} from "gsap/SplitText";

gsap.registerPlugin(SplitText)

import {initSplitLineText, getLineContentData, getAnimatedSplitLineTextTl, splittedTextToParams, splittedTextFromParams} from "s/js/gsap/textAnimations.js";

export function createHeader() {
    const headerContainer = document.createElement("div");
    headerContainer.id = "homeSection";
    headerContainer.className = styles.headerContainer;
    headerContainer.innerHTML = `
        <h1 class="${styles.headerContainer__title}" data-split-text>Левахин Лев</h1>
        
        <img class="${styles.headerContainer__img}" src="/img/leonardoWer__header.png" alt="Levakhin Lev">
    `;

    // Элементы
    const headerTitle = headerContainer.querySelector(`.${styles.headerContainer__title}`);
    const headerImg = headerContainer.querySelector(`.${styles.headerContainer__img}`);

    // Анимации
    initGsapAnimations(headerContainer, headerTitle, headerImg);

    return headerContainer;
}

function initGsapAnimations(headerContainer, headerTitle, headerImg) {
    // Получаем элементы которые нужно делить
    const splitLineTextData = headerContainer.querySelectorAll('[data-split-text]');

    // Делим текст
    splitLineTextData.forEach(textEl => {
        initSplitLineText(textEl);
    });

    // Начальные параметры
    gsap.set(headerTitle, {
        yPercent: 20,
    })
    gsap.set(headerImg, {
        opacity: 0
    })

    // Создаём таймлайн
    const fadeInTl = gsap.timeline({
        scrollTrigger: {
            trigger: headerContainer,
            start: "top 5%",
        }
    });

    document.fonts.ready.then(() => {
        // Получаем имя и фамилию
        const titleLines = getLineContentData(headerTitle);
        const levakhinText = titleLines[0];
        const lev = titleLines[1];

        const levakhinSplitText = new SplitText(levakhinText, {type: "chars"});
        const levSplitText = new SplitText(lev, {type: "chars"});

        const levakhinFirstLetter = levakhinSplitText.chars[0];
        const levakhinAnotherLetters = levakhinSplitText.chars.slice(1);

        const levFirstLetter = levSplitText.chars[0];
        const levAnotherLetters = levSplitText.chars.slice(1);

        // Параметры поднимания
        const stagger = 0.2;

        // Анимация
        fadeInTl.fromTo(levakhinFirstLetter,
            { ...splittedTextFromParams },
            { ...splittedTextToParams, duration: 1},
            0
            )
            .fromTo(levFirstLetter,
                { ...splittedTextFromParams },
                { ...splittedTextToParams, duration: 1 },
                0
            )
            .fromTo(levakhinAnotherLetters,
                { ...splittedTextFromParams },
                { ...splittedTextToParams, stagger: stagger, duration: 0.2},
                0.5
            )
            .fromTo(levAnotherLetters,
                { ...splittedTextFromParams },
                { ...splittedTextToParams, stagger: stagger},
                0.5
            )
            .to(headerTitle, {
                yPercent: 0,
                ease: "power1.inOut",
                duration: 1.2
            }, 1.8)
            .to(headerImg, {
                opacity: 1,
                ease: "power1.out",
                duration: 1.2
            }, 1.8)
    })

    // Параллакс
    gsap.to(headerContainer, {
        yPercent: 10,
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: headerContainer,
            start: "40% 20%",
            scrub: 1,
        }
    })
}