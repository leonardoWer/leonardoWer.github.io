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
        <h1 class="${styles.headerContainer__title}" data-split-text>Левахин<br>Лев</h1>
        
        <img class="${styles.headerContainer__img}" src="/img/me-title.png" alt="Levakhin Lev">
        
        <p class="${styles.headerContainer__description}" data-split-text>Создаю современные веб-приложения<br>Frontend разработка, Web дизайн, Android разработка<br>Помогу воплотить ваши идеи в жизнь</p>
    `;

    // Элементы
    const headerTitle = headerContainer.querySelector(`.${styles.headerContainer__title}`);
    const headerDescription = headerContainer.querySelector(`.${styles.headerContainer__description}`);
    const headerImg = headerContainer.querySelector(`.${styles.headerContainer__img}`);

    // Анимации
    initGsapAnimations(headerContainer, headerTitle, headerDescription, headerImg);

    return headerContainer;
}

function initGsapAnimations(headerContainer, headerTitle, headerDescription, headerImg) {
    // Получаем элементы которые нужно делить
    const splitLineTextData = headerContainer.querySelectorAll('[data-split-text]');

    // Делим текст
    splitLineTextData.forEach(textEl => {
        initSplitLineText(textEl);
    });

    // Начальные параметры
    gsap.set(headerTitle, {
        xPercent: 20,
        yPercent: 20,
    })
    gsap.set(headerImg, {
            scale: 1.05,
            opacity: 0,
            xPercent: -5,
            yPercent: -8,
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

        // Стандартная анимация описания
        const descriptionTextTl = getAnimatedSplitLineTextTl({textEl: headerDescription, duration: 1.5})

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
                1
            )
            .fromTo(levAnotherLetters,
                { ...splittedTextFromParams },
                { ...splittedTextToParams, stagger: stagger},
                1
            )
            .to(headerTitle, {
                xPercent: 0,
                yPercent: 0,
                ease: "power1.inOut",
                duration: 1.2
            }, 2.5)
            .to(headerImg, {
                scale: 1,
                opacity: 1,
                ease: "power1.out",
                duration: 1.8,
                xPercent: 0,
                yPercent: 0,
            }, 2.5)
            .add(descriptionTextTl);
    })
}