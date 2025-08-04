import gsap from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {SplitText} from "gsap/SplitText"
import {TextPlugin} from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin);

// Разделённый на строки текст (Анимация появления из под себя)

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

// Все элементы с текстом (для анимации отдельно их)
export function getLineContentData(splittedIntoLinesTextEl) {
    return splittedIntoLinesTextEl.querySelectorAll('.line-content');
}
// Находит все элементы в родителе и сплитит их
export function findSplitLineTextAndSplitThem(parentEl) {
    const splitLineTextData = parentEl.querySelectorAll('[data-split-text]');

    // Делим текст
    splitLineTextData.forEach(textEl => {
        initSplitLineText(textEl);
    });
}

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

// Просто анимирует
export function animateSplitLineText({ textEl, duration=0.5, scrollTrigger = null }) {
    const lines = getLineContentData(textEl);

    // Ошибки
    if (!lines || lines.length === 0) {
        console.warn("No lines found in textEl: ", textEl);
        return;
    }

    const toParams = { ...splittedTextToParams };

    // Добавляем scrollTrigger, если он передан
    if (scrollTrigger) {
        toParams.scrollTrigger = scrollTrigger;
    }

    // Анимируем
    gsap.fromTo(
        lines,
        { ...splittedTextFromParams },
        { ...toParams, duration: duration,}
    );
}

// Возвращает tl с анимацией
export function getAnimatedSplitLineTextTl({ textEl, duration=0.5, scrollTrigger = null }) {
    const lines = getLineContentData(textEl);

    // Ошибки
    if (!lines || lines.length === 0) {
        console.warn("No lines found in textEl: ", textEl);
        return;
    }

    const toParams = { ...splittedTextToParams };

    const tl = gsap.timeline({scrollTrigger: scrollTrigger});

    // Анимируем
    tl.fromTo(
        lines,
        { ...splittedTextFromParams },
        { ...toParams, duration: duration}
    );

    return tl;
}

