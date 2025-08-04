import gsap from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {SplitText} from "gsap/SplitText"
import {TextPlugin} from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin);

export function initSplitLineText(splitLineTextEl) {
    // Заменяем <br> на \n и разбиваем текст на строки
    const text = splitLineTextEl.innerHTML.replace(/<br\s*\/?>/gi, '\n'); // Заменяем <br> на \n
    const lines = text.split('\n');

    // Получаем размер шрифта элемента (в пикселях)
    const fontSize = parseFloat(window.getComputedStyle(splitLineTextEl).fontSize);
    const lineHeight = window.getComputedStyle(splitLineTextEl).lineHeight;

    // Очищаем содержимое элемента
    splitLineTextEl.innerHTML = "";

    // Создаем div для каждой строки
    lines.forEach((line) => {
        // Обёртка
        const lineWrapper = document.createElement("div");
        lineWrapper.style.overflow = "hidden";
        lineWrapper.style.height = `${fontSize * lineHeight}px`; // Устанавливаем высоту, равную размеру шрифта
        lineWrapper.className = "line-wrapper";

        // Текст
        const lineContent = document.createElement("div");
        lineContent.textContent = line; // Добавляем текст строки
        lineContent.className = "line-content";

        // Добавляем элементы
        lineWrapper.appendChild(lineContent);
        splitLineTextEl.appendChild(lineWrapper);
    });
}

export function getLineContentData(splittedIntoLinesTextEl) {
    return splittedIntoLinesTextEl.querySelectorAll('.line-content');
}

// TODO: redesign this
export function initTitleTextAnimation({textEl, duration, stagger, scrollTrigger}) {
    document.fonts.ready.then(() => {
        const splitText = new SplitText(textEl, {type: 'chars'});

        gsap.fromTo(splitText.chars, {
            opacity: 0,
            yPercent: 50,
        }, {
            opacity: 1,
            yPercent: 0,
            stagger: stagger,
            duration: duration,
            ease: "power2.out",
            scrollTrigger: scrollTrigger,
        });
    })
}


// Разделённый на строки текст (Анимация появления из под себя)

// Параметры
export const splittedTextFromParams = {
    opacity: 0,
    yPercent: 100,
}
export const splittedTextToParams = {
    opacity: 1,
    ease: "power2.out",
    yPercent: 0,
};

export function animateSplitLineText({ textEl, duration=0.5, scrollTrigger = null }) {
    const lines = getLineContentData(textEl);

    // Ошибки
    if (!lines || lines.length === 0) {
        console.warn("No lines found in textEl: ", textEl);
        return;
    }
    // Добавляем scrollTrigger, если он передан
    if (scrollTrigger) {
        splittedTextToParams.scrollTrigger = scrollTrigger;
    }

    // Анимируем
    gsap.fromTo(
        lines,
        { ...splittedTextFromParams },
        { ...splittedTextToParams, duration: duration,}
    );
}

export function getAnimatedSplitLineTextTl({ textEl, duration=0.5, scrollTrigger = null }) {
    const lines = getLineContentData(textEl);

    // Ошибки
    if (!lines || lines.length === 0) {
        console.warn("No lines found in textEl: ", textEl);
        return;
    }

    const tl = gsap.timeline({scrollTrigger: scrollTrigger});

    // Анимируем
    tl.fromTo(
        lines,
        { ...splittedTextFromParams },
        { ...splittedTextToParams, duration: duration}
    );

    return tl;
}

