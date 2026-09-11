import styles from './MyWorksSection.module.css';
import { createWorkCard } from 's/components/FullWidthWorkCard/FullWidthWorkCard.js';
import { createEllipsLink } from 's/components/Links/EllipsLink/EllipsLink.js';
import { getLatestWorks } from 's/js/utils/worksData.js';
import { linksData } from 's/js/utils/linksData.js';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function createMyWorksSection() {
    const section = document.createElement('section');
    section.id = 'myWorksSection';
    section.classList.add(styles['my-works-section']);

    // Получаем 3 последние работы
    const latestWorks = getLatestWorks(5);

    section.innerHTML = `
        <h2 class="title-text ${styles['my-works-section__title']}">Последние работы</h2>
        
        <div class="${styles['my-works-section__cards']}">
            <!-- Карточки работ -->
        </div>

        <div class="${styles['my-works-section__footer']}">
            <!-- Кнопка "Смотреть все работы" -->
        </div>
    `;

    // Добавляем карточки работ
    const cardsContainer = section.querySelector(`.${styles['my-works-section__cards']}`);

    latestWorks.forEach((work, index) => {
        const isLeft = index % 2 === 0;
        const card = createWorkCard(work, isLeft);
        cardsContainer.appendChild(card);
    });

    // Добавляем кнопку "Смотреть все работы"
    const footer = section.querySelector(`.${styles['my-works-section__footer']}`);
    const linkData = {
        title: 'Смотреть все работы',
        onClick: {
            link: linksData.portfolio,
            hoverTitle: 'Посмотреть все проекты'
        },
        style: 'dark',
        size: 'big'
    };
    const viewAllLink = createEllipsLink(linkData);
    viewAllLink.classList.add(styles['my-works-section__view-all']);
    footer.appendChild(viewAllLink);

    return section;
}