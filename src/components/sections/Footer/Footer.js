import styles from "./Footer.module.css"
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export function createFooter() {
    const footerContainer = document.createElement("div");
    footerContainer.id = "contactsSection";
    footerContainer.className = styles.footerContentContainer;

    footerContainer.innerHTML = `
        <div class="${styles.footerContentContainer__top}">
            <div class="${styles.footerContentContainerTop__textContainer}">
                <div class="${styles.footerTextContainer__letsChatContainer}">
                    <h2 class="${styles.letsChatContainer__text}">Let’s chat</h2>
                    <i class="fa fa-arrow-right ${styles.letsChatContainer__arrowIcon}"></i>
                </div>
                <span class="${styles.footerTextContainer__descriptionText}">i’ll help you to chose best</span>
            </div>
            
            <div class="${styles.footerContentContainerTop__contactsContainer}">123</div>
            
            <div class="${styles.footerContentContainerTop__emailContainer}">
                <p class="${styles.emailContainer__title}">
                    Don’t like forms and would rather just email me, that’s ok.
                </p>
                <span class="${styles.emailContainer__email}">
                    name89213126414@gmail.com
                </span>
            </div>
        </div>
        
        <div class="${styles.footerContentContainer__bottom}">
            <div class="${styles.footerContentContainerBottom__contentContainer}">
                <h2 class="${styles.footerContentContainerBottom__titleText}">Левахин<br>Лев</h2>
                
                <ul class="${styles.footerContentContainerBottom__menuList}">
                    <li class="${styles.menuList__item}">home</li>
                    <li class="${styles.menuList__item}">about</li>
                    <li class="${styles.menuList__item}">works</li>
                    <li class="${styles.menuList__item}">why?</li>
                    <li class="${styles.menuList__item}">contact</li>
                </ul>
            </div>
        </div>
        
    `

    // Элементы
    const bottomContainer = footerContainer.querySelector(`.${styles.footerContentContainer__bottom}`)
    const bottomContentContainer = bottomContainer.querySelector(`.${styles.footerContentContainerBottom__contentContainer}`)

    initGsapAnimations(bottomContainer, bottomContentContainer);

    return footerContainer;
}

function initGsapAnimations(bottomContainer, contentContainer) {
    gsap.from(contentContainer, {
        yPercent: -80,
        scrollTrigger: {
            trigger: bottomContainer,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
        }
    })

}