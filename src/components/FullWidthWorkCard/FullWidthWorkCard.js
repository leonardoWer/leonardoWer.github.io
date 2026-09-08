import styles from './FullWidthWorkCard.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const photoPath = '/img/works/';

export function createWorkCard(workData, isLeft = true) {
    const card = document.createElement('div');
    card.classList.add(styles['work-card']);
    card.dataset.align = isLeft ? 'left' : 'right';

    card.innerHTML = `
        <div class="${styles['work-card__content']}">
            <div class="${styles['work-card__text']}">
                <h3 class="${styles['work-card__title']}">${workData.title}</h3>
                <p class="${styles['work-card__description']}">${workData.description}</p>
                <div class="${styles['work-card__stack']}">
                    ${workData.stack.map(tech => `
                        <span class="${styles['work-card__tech']}">${tech}</span>
                    `).join('')}
                </div>
            </div>
            <div class="${styles['work-card__image-wrapper']}">
                <img 
                    src="${photoPath + workData.image}" 
                    alt="${workData.name}"
                    class="${styles['work-card__image']}"
                    loading="lazy"
                />
            </div>
        </div>
    `;

    // Элементы для анимации
    const textContent = card.querySelector(`.${styles['work-card__text']}`);
    const imageWrapper = card.querySelector(`.${styles['work-card__image-wrapper']}`);
    const image = card.querySelector(`.${styles['work-card__image']}`);

    // Инициализация параллакса для изображения
    initParallax(imageWrapper, image);

    // Инициализация анимации появления
    initRevealAnimation(card, textContent, imageWrapper);

    card.addEventListener('click', e => {
        window.open(workData.link, '_blank');
    })

    return card;
}

function initParallax(wrapper, image) {
    // Параллакс эффект при скролле
    gsap.to(image, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
            trigger: wrapper,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
        }
    });
}

function initRevealAnimation(card, textContent, imageWrapper) {
    // Разбиваем текст на части для более интересной анимации
    const title = textContent.querySelector(`.${styles['work-card__title']}`);
    const description = textContent.querySelector(`.${styles['work-card__description']}`);
    const stack = textContent.querySelector(`.${styles['work-card__stack']}`);
    const techItems = card.querySelectorAll(`.${styles['work-card__tech']}`);

    // Начальное состояние - все элементы скрыты
    gsap.set(textContent, {
        opacity: 0,
        x: card.dataset.align === 'left' ? -80 : 80,
        rotationY: card.dataset.align === 'left' ? -10 : 10,
        scale: 0.95
    });

    gsap.set(imageWrapper, {
        opacity: 0,
        x: card.dataset.align === 'left' ? 80 : -80,
        rotationY: card.dataset.align === 'left' ? 10 : -10,
        scale: 0.95
    });

    // Скрываем заголовок, описание и стек для поэтапного появления
    gsap.set([title, description, stack], {
        opacity: 0,
        y: 30
    });

    // Основная анимация
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
        }
    });

    // Появление всего блока с текстом
    tl.to(textContent, {
        opacity: 1,
        x: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power3.out'
    })
        // Появление изображения с задержкой и эффектом
        .to(imageWrapper, {
            opacity: 1,
            x: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power3.out'
        }, '-=0.4')
        // Постепенное появление заголовка
        .to(title, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.3')
        // Появление описания с задержкой
        .to(description, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
        }, '-=0.2')
        // Появление стека технологий
        .to(stack, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        }, '-=0.1');

    // Эффект для технологий - они появляются с эффектом "волны"
    if (techItems.length) {
        gsap.from(techItems, {
            opacity: 0,
            scale: 0.5,
            rotation: -10,
            duration: 0.5,
            stagger: {
                amount: 0.3,
                from: 'center',
                grid: 'auto'
            },
            ease: 'back.out(2)',
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        });
    }

    // Параллакс для текста при скролле (легкое движение)
    gsap.to(textContent, {
        y: -20,
        ease: 'none',
        scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
        }
    });
}