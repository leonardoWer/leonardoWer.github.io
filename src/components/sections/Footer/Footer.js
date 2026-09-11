import styles from "./Footer.module.css";
import { createCircleButton } from "s/components/Links/CircleButton/CircleButton.js";
import { createActionButton } from "s/components/Links/ActionButton/ActionButton.js";
import { linksData } from "s/js/utils/linksData.js";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function createFooter() {
    const footerContainer = document.createElement("footer");
    footerContainer.id = "contactsSection";
    footerContainer.className = styles.footer;

    footerContainer.innerHTML = `
        <div class="${styles.footer__inner}">
            <!-- Фото -->
            <div class="${styles.footer__image_wrapper}">
                <img 
                    src="/img/leonardoWer__footer.png" 
                    alt="Footer image"
                    class="${styles.footer__image}"
                    loading="lazy"
                />
                <h2 class="${styles.footer__title}">Контакты</h2>
            </div>

            <!-- Кнопки -->
            <div class="${styles.footer__buttons}">
                <!-- Социальные кнопки (слева) -->
                <div class="${styles.footer__social}">
                    ${createCircleButton({
                        icon: 'fa-vk',
                        link: linksData.vk,
                        label: 'VK'
                    }).outerHTML}
                    ${createCircleButton({
                        icon: 'fa-telegram-plane',
                        link: linksData.tg,
                        label: 'Telegram'
                    }).outerHTML}
                    ${createCircleButton({
                        icon: 'fa-github',
                        link: linksData.git,
                        label: 'GitHub'
                    }).outerHTML}
                </div>

                <!-- Действия (справа) -->
                <div class="${styles.footer__actions}">
                    ${createActionButton({
                        text: 'Портфолио',
                        link: linksData.portfolio,
                        fas: false,
                        icon: 'fab fa-github'
                    }).outerHTML}
                    ${createActionButton({
                        text: 'Резюме',
                        link: '/resume.pdf',
                        icon: 'fa-file-pdf'
                    }).outerHTML}
                </div>
            </div>
        </div>
    `;

    // Инициализация анимаций
    initFooterAnimations(footerContainer);

    return footerContainer;
}

function initFooterAnimations(footer) {
    const title = footer.querySelector(`.${styles.footer__title}`);
    const socialButtons = footer.querySelectorAll(`.${styles.footer__social}`);
    const actionButtons = footer.querySelectorAll(`.${styles.footer__actions}`);

    // Анимация заголовка
    gsap.from(title, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: footer,
            start: 'top center',
            toggleActions: 'play none none reverse'
        }
    });

    // Анимация социальных кнопок
    gsap.from(socialButtons, {
        opacity: 0,
        y: 50,
        stagger: 0.5,
        duration: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: footer,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
    });

    // Анимация кнопок действий
    gsap.from(actionButtons, {
        opacity: 0,
        x: 30,
        duration: 0.6,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: footer,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
    });
}