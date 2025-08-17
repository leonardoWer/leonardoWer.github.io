import styles from "./MySkillsSection.module.css"
import gsap from "gsap"
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {SplitText} from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function createMySkillsSection() {
    const section = document.createElement("section");
    section.id = "mySkillsSection";
    section.innerHTML = `
        <div class="${styles.mySkillsSectionContentContainer}">
            <p class="${styles.mySkillsSectionContentContainer__text}" data-left>
                Я создаю понятные и красивые интерфейсы, которые обеспечивают безупречный пользовательский опыт на любом устройстве
            </p>
            
            <div class="${styles.mySkillsSectionContentContainer__imgContainer}">
                <img src="/img/me-with-micro-no-bg.png" alt="me with micro">
            </div>
            
            <p class="${styles.mySkillsSectionContentContainer__text}" data-right>
                Моя цель – превратить ваши идеи в эффективные цифровые продукты, приносящие реальную пользу вашему бизнесу
            </p>
        </div>
    `

    // Находим нужные поля
    const contentContainer = section.querySelector(`.${styles.mySkillsSectionContentContainer}`);
    const textElData = section.querySelectorAll(`.${styles.mySkillsSectionContentContainer__text}`);
    const imgContainer = section.querySelector(`.${styles.mySkillsSectionContentContainer__imgContainer}`);

    initGsapAnimations(contentContainer, textElData, imgContainer);

    return section;
}


function initGsapAnimations(contentContainer, textElData, imgContainer) {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: contentContainer,
            start: "top top",
            end: "+=3000px",
            pin: contentContainer,
            scrub: true,
        }
    })

    document.fonts.ready.then(() => {
        const splitText1 = new SplitText(textElData[0], { type: "words" });
        const splitText2 = new SplitText(textElData[1], { type: "words" });
        const wordDelay = 0.1; // Задержка между появлением слов
        const rotationDuration = 1.8; // Длительность поворота

        // 1. Параллельный поворот и появление первого текста:
        tl.to(imgContainer, {
            rotateY: "180deg",
            ease: "sine.in",
            duration: rotationDuration,
        }, 0)
            .from(splitText1.words, {
                opacity: 0,
                stagger: wordDelay,
                duration: rotationDuration / 3,
                ease: "power2.out",
            }, 0);

        // 2.  После завершения первого текста, поворот обратно и появление второго текста:
        tl.to(imgContainer, {
            rotateY: "360deg",
            ease: "sine.in",
            duration: rotationDuration,
        }, `+=${rotationDuration / 3}`)
            .from(splitText2.words, {
                opacity: 0,
                stagger: wordDelay,
                duration: rotationDuration / 3,
                ease: "power2.out",
            }, `-=${rotationDuration}`);
    })
}
