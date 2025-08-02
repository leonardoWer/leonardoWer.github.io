import styles from "./Footer.module.css"
import {createLink} from "s/components/Links/link.js";
import {createEllipsLink} from "s/components/Links/EllipsLink/EllipsLink.js";

import {linksData, contactLinkElementsData, menuLinkElementsData} from "s/js/utils/linksData.js";

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
                    <div class="${styles.letsChatContainer__arrowWrapper}">
                        <i class="fa fa-arrow-right ${styles.letsChatContainer__arrowIcon}"></i>
                    </div>
                    
                </div>
                <span class="${styles.footerTextContainer__descriptionText}">i’ll help you to chose best</span>
            </div>
            
            <div class="${styles.footerContentContainerTop__contactsContainer}">
                <!--  contacts link  -->
            </div>
            
            <div class="${styles.footerContentContainerTop__emailContainer}">
                <p class="${styles.emailContainer__title}">
                    Don’t like forms and would rather just email me, that’s ok.
                </p>
                <span class="${styles.emailContainer__email}">
                    <!--  email link  -->
                </span>
            </div>
        </div>
        
        <div class="${styles.footerContentContainer__bottom}">
            <div class="${styles.footerContentContainerBottom__contentContainer}">
                <h2 class="${styles.footerContentContainerBottom__titleText}">Левахин<br>Лев</h2>
                
                <ul class="${styles.footerContentContainerBottom__menuList}">
                    <!--  page navigation link  -->
                </ul>
            </div>
        </div>
        
    `

    // Элементы
    const contactsTopContainer = footerContainer.querySelector(`.${styles.footerContentContainerTop__contactsContainer}`);

    const emailTextEl = footerContainer.querySelector(`.${styles.emailContainer__email}`);

    const bottomContainer = footerContainer.querySelector(`.${styles.footerContentContainer__bottom}`);
    const bottomContentContainer = bottomContainer.querySelector(`.${styles.footerContentContainerBottom__contentContainer}`);
    const bottomMenuList = footerContainer.querySelector(`.${styles.footerContentContainerBottom__menuList}`);

    // Ссылки
    initLinks(contactsTopContainer, emailTextEl, bottomMenuList);

    // Анимации
    initGsapAnimations(bottomContainer, bottomContentContainer);

    return footerContainer;
}


function initLinks(contactsTopContainer, emailTextEl, bottomMenuList) {
    // Контакты
    contactLinkElementsData.forEach(contactData => {
        const contactLink = createEllipsLink({
            title: contactData.title,
            onClick: contactData.onClick,
            style: "dark"
        });
        contactsTopContainer.appendChild(contactLink);
    })

    emailTextEl.appendChild(createLink({
        title: linksData.email,
        onClick: {
            link: "mailto:" + linksData.email
        }
    }));

    // Ссылки по странице
    menuLinkElementsData.forEach(menuElData => {
        const menuLink = document.createElement("li");
        menuLink.className = styles.menuList__item;

        const a = createLink({
            title: menuElData.title,
            onClick: menuElData.onClick,
        })
        menuLink.appendChild(a);

        bottomMenuList.appendChild(menuLink);
    })
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