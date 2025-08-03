import styles from "./EllipsLink.module.css"
import {createLink} from "s/components/Links/link.js";

import gsap from "gsap";

export function createEllipsLink({title, onClick, style, size="middle"}) {
    const link = createLink({title: "", onClick: onClick});
    link.classList = styles.ellipsLink;

    // Цвет
    switch (style) {
        case "dark":
            link.classList.add(styles.ellipsLink__dark);
            break;
        case "light":
            link.classList.add(styles.ellipsLink__light);
            break;
    }

    // Размер
    switch (size) {
        case "middle":
            link.classList.add(styles.ellipsLink__middle);
            break;
        case "big":
            link.classList.add(styles.ellipsLink__big);
            break;
    }

    // Текст
    link.innerHTML = `
        <div class=${styles.ellipsLink__textContainer}>
            <span class="${styles.originalText}">${title}</span>
            <span class="${styles.newText}">${title}</span>
        </div>
    `;

    const origTextEl = link.querySelector(`.${styles.originalText}`);
    const newTextEl = link.querySelector(`.${styles.newText}`);
    initHoverAnimations(link, origTextEl, newTextEl);

    return link;
}

function initHoverAnimations(link, origTextEl, newTextEl) {

    const duration = 0.5
    const tl = gsap.timeline({paused: true});
    tl.to(origTextEl, {
        duration: duration,
        yPercent: -100,
        rotationX: -90,
        ease: "power2.inOut",
    }, 0)
        .to(newTextEl, {
            duration: duration,
            yPercent: -100,
            rotationY: 0,
            ease: "power2.inOut",
        }, 0);

    link.addEventListener("mouseenter", () => {
        tl.play()
    });

    link.addEventListener("mouseleave", () => {
        tl.reverse();
    });
}