import styles from './TopMenu.module.css';

import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

import {contactLinkElementsData, menuLinkElementsData} from "s/js/utils/linksData.js";
import {createLink} from "s/components/Links/link.js";

export function createTopMenu() {
    // Инициализация компонента
    const topMenu = document.createElement('div');
    topMenu.classList.add(styles['top-menu']);

    topMenu.innerHTML = `
        <div class="${styles['top-menu__left']}">
            <span class="${styles['logo']}">ЛЛ</span>
        </div>

        <div class="${styles['top-menu__right']}">
            <!--    Кнопка меню    -->
            <button class="${styles['menu-button']}">
                <span class="${styles['menu-button-item']}"></span>
                <span class="${styles['menu-button-item']}"></span>
                <span class="${styles['menu-button-item']}"></span>
            </button>

            <!--    Меню    -->
            <div class="${styles['main-menu-bg']}">
                <nav class="${styles['main-menu__inner']}">
                
                  <ul class="${styles['main-menu-inner__pages-list']}">
                       <!--   navigation items   -->
                  </ul>

                  <ul class="${styles['main-menu-inner__contacts-list']}">
                    <!--   contact items   -->
                  </ul>

                </nav>
            </div>
        </div>
    `;

    // Элементы
    const logoText = topMenu.querySelector(`.${styles['logo']}`);
    const menuButton = topMenu.querySelector(`.${styles['menu-button']}`);
    const mainMenuBg = topMenu.querySelector(`.${styles['main-menu-bg']}`);

    const contactElementsList = topMenu.querySelector(`.${styles['main-menu-inner__contacts-list']}`);
    const pageElementsList = topMenu.querySelector(`.${styles['main-menu-inner__pages-list']}`);

    let isMenuOpen = false;

    initLinks();
    initInteractive();
    initGsapAnimations();

    function initLinks() {
        // Навигация
        menuLinkElementsData.forEach(linkElementData => {
            const linkElement = document.createElement("li");
            linkElement.classList.add(styles['m-m-i-p-l__item']);
            const link = createLink(linkElementData);
            link.classList.add(styles['menu-link']);
            link.dataset.scrollTo = "";

            linkElement.appendChild(link);

            pageElementsList.appendChild(linkElement);
        })

        // Контакты
        contactLinkElementsData.forEach(linkElementData => {
            const linkElement = document.createElement("li");
            linkElement.classList.add(styles['m-m-i-c-l__item']);
            const link = createLink(linkElementData);
            link.classList.add(styles['menu-link']);

            linkElement.appendChild(link);

            contactElementsList.appendChild(linkElement);
        })
    }

    // Функция для инициализации обработчиков событий и GSAP
    function initInteractive() {
        menuButton.addEventListener('click', toggleMenu);
        gsap.set(mainMenuBg, {yPercent: -100});

        // Добавляем обработчик для прокрутки
        const pageSectionItems = topMenu.querySelectorAll("[data-scroll-to]");

        pageSectionItems.forEach(item => {
            item.addEventListener('click', handleScroll);
        });
    }

    function initGsapAnimations() {
        gsap.from(topMenu, {
            opacity: 0,
            ease: "power2.inOut",
            duration: 1.2,
            scrollTrigger: {
                trigger: "header",
                start: "30% top",
                end: "bottom top",
                scrub: true,
            }
        })

        // Анимация исчезновения topMenu при достижении футера
        gsap.fromTo(topMenu, {
            opacity: 1,
        },{
            opacity: 0,
            ease: "power2.inOut",
            duration: 1.2,
            scrollTrigger: {
                trigger: "footer",
                start: "top bottom",
                end: "bottom bottom",
                scrub: true,
                toggleActions: "play reverse play reverse",
            },
        });
    }

    // Функция для переключения состояния меню
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    }

    // Функция для открытия меню
    function openMenu() {
        gsap.to(mainMenuBg, {
            yPercent: 0,
            duration: 0.5,
            ease: 'power3.out',
        });
        topMenu.style.mixBlendMode = 'normal';
        logoText.classList.add(styles['logo--active']);
        menuButton.classList.add(styles['menu-button--active']);
    }

    // Функция для закрытия меню
    function closeMenu() {
        gsap.to(mainMenuBg, {
            yPercent: -100,
            duration: 0.5,
            ease: 'power3.in',
            onComplete: () => {topMenu.style.mixBlendMode = 'difference'}
        });

        logoText.classList.remove(styles['logo--active']);
        menuButton.classList.remove(styles['menu-button--active']);
    }

    function handleScroll(event) {
        // Закрываем после прокрутки
        toggleMenu();
        if (isMenuOpen) {
            closeMenu();
        }
    }

    return topMenu;
}