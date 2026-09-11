import styles from './TopMenu.module.css';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { contactLinkElementsData, menuLinkElementsData } from "s/js/utils/linksData.js";
import { createLink } from "s/components/Links/link.js";

export function createTopMenu() {
    const topMenu = document.createElement('div');
    topMenu.classList.add(styles['top-menu']);

    topMenu.innerHTML = `
        <div class="${styles['top-menu__inner']}">
            <div class="${styles['top-menu__left']}">
                <!-- лого -->
            </div>
    
            <div class="${styles['top-menu__center']}">
                <ul class="${styles['nav-list']}">
                    <!-- linksData (кроме главной) -->
                </ul>
            </div>
    
            <div class="${styles['top-menu__right']}">
                <button class="${styles['menu-toggle']}">
                    <span class="${styles['menu-toggle-icon']}"></span>
                </button>
            </div>
        </div>

        <!-- Выпадающая часть (попап) -->
        <div class="${styles['dropdown']}">
            <div class="${styles['dropdown-inner']}">
                <ul class="${styles['dropdown-list']}">
                    <!-- наполняется из linksData (кроме главной) -->
                </ul>
            </div>
        </div>
    `;

    // Элементы
    const left = topMenu.querySelector(`.${styles['top-menu__left']}`);
    const menuToggleContainer = topMenu.querySelector(`.${styles['top-menu__right']}`);
    const menuToggle = topMenu.querySelector(`.${styles['menu-toggle']}`);
    const dropdown = topMenu.querySelector(`.${styles['dropdown']}`);
    const navList = topMenu.querySelector(`.${styles['nav-list']}`);
    const dropdownList = topMenu.querySelector(`.${styles['dropdown-list']}`);

    let isDropdownOpen = false;
    let isNavVisible = true;

    // Инициализация пунктов из linksData (пропускаем главную)
    function initLinks() {
        // Находим индекс элемента "Главная"
        const mainPageIndex = menuLinkElementsData.findIndex(item =>
            item.title === 'Главная' || item.title === 'Home'
        );

        // Создаем пункты для навигации (пропускаем главную)
        menuLinkElementsData.forEach((linkData, index) => {
            if (index === mainPageIndex) {
                // Добавляем ссылку на логотип
                const link = createLink(linkData);
                link.classList.add(styles['logo']);
                link.textContent = "ЛЛ";
                left.appendChild(link);
                return;
            }

            const li = document.createElement('li');
            const link = createLink(linkData);
            link.classList.add(styles['nav-link']);
            li.appendChild(link);
            navList.appendChild(li);
        });

        // Создаем пункты для дропдауна (пропускаем главную)
        menuLinkElementsData.forEach((linkData, index) => {
            if (index === mainPageIndex) return;

            const li = document.createElement('li');
            const link = createLink(linkData);
            link.classList.add(styles['dropdown-link']);
            li.appendChild(link);
            dropdownList.appendChild(li);
        });
    }

    // Обновление видимости навигации при скролле
    function updateNavVisibility() {
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        if (!header || !footer) return;

        const headerRect = header.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        const isOnHeader = headerRect.bottom > 0 && headerRect.top < window.innerHeight;
        const isOnFooter = footerRect.bottom > 0 && footerRect.top < window.innerHeight;

        const shouldShow = isOnHeader || isOnFooter;

        if (shouldShow && !isNavVisible) {
            isNavVisible = true;
            // Показываем пункты меню
            gsap.to(navList, {
                opacity: 1,
                width: 'auto',
                marginRight: '0',
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    // Скрываем иконку
                    gsap.to(menuToggleContainer, {
                        display: 'none',
                    });
                    gsap.to(menuToggle, {
                        display: 'none',
                        opacity: 0,
                    });
                }
            });
        } else if (!shouldShow && isNavVisible) {
            isNavVisible = false;
            // Прячем пункты
            gsap.to(navList, {
                opacity: 0,
                width: 0,
                marginRight: '-2rem',
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    // Показываем иконку
                    gsap.to(menuToggleContainer, {
                        display: 'flex',
                    });
                    gsap.to(menuToggle, {
                        display: 'flex',
                        opacity: 1,
                    });
                }
            });
        }

        if (shouldShow && isDropdownOpen) {
            toggleDropdown()
        }
    }

    // Открытие/закрытие попапа
    function toggleDropdown() {
        isDropdownOpen = !isDropdownOpen;

        if (isDropdownOpen) {
            // Показываем дропдаун
            gsap.to(dropdown, {
                height: 'auto',
                opacity: 1,
                duration: 0.4,
                ease: 'power3.out',
                overwrite: 'auto',
                onStart: () => {
                    dropdown.style.display = 'block';
                    dropdown.style.overflow = 'visible';
                }
            });

            menuToggle.classList.add(styles['menu-toggle--active']);

            // Анимация элементов внутри попапа
            const items = dropdown.querySelectorAll('li');
            gsap.fromTo(items,
                { opacity: 0, y: -10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: 'power2.out',
                    delay: 0.1,
                    overwrite: 'auto'
                }
            );
        } else {
            // Сворачиваем
            gsap.to(dropdown, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'power3.in',
                overwrite: 'auto',
                onComplete: () => {
                    dropdown.style.display = 'none';
                }
            });

            menuToggle.classList.remove(styles['menu-toggle--active']);
        }
    }

    // Инициализация
    initLinks();

    // Обработка кликов по пунктам меню (закрываем попап)
    function handleLinkClick(e) {
        if (isDropdownOpen) {
            toggleDropdown();
        }
    }

    // Навешиваем обработчики на все ссылки
    topMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });

    // Клик по кнопке меню
    menuToggle.addEventListener('click', toggleDropdown);

    // Подписываемся на скролл
    ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: updateNavVisibility,
        onRefresh: updateNavVisibility
    });

    // Начальное состояние - устанавливаем через GSAP
    gsap.set(navList, { opacity: 0, width: 0, marginRight: '-2rem' });
    gsap.set(dropdown, { height: 0, opacity: 0, display: 'none' });

    // Задержка для первого обновления
    setTimeout(updateNavVisibility, 100);

    return topMenu;
}