import styles from "./FAQSection.module.css"

import gsap from "gsap";

import {initSplitLineText, animateSplitLineText} from "s/js/gsap/textAnimations.js";

export function createFAQSection() {
    const section = document.createElement("section");
    section.id = "fAQSection";
    section.innerHTML = `
        <div class="container ${styles.FAQSection__contentContainer}">
            <h2 class="${styles.FAQSectionContentContainer__title}" data-split-text>FAQ</h2>
            
            <div class="${styles.FAQSectionContentContainer__faqContainer}">
                <ul class="${styles.faqContainer__list}">
                    <!-- FAQ элементы -->
                </ul>
            </div>
            
        </div>
    `

    // Элементы
    const faqList = section.querySelector(`.${styles.faqContainer__list}`);

    // Данные для FAQ
    const faqData = [
        {
            question: "Что я умею?",
            answer: "Я специализируюсь на современной фронтенд-разработке, уделяя особое внимание интересному и современному дизайну. Также я создаю интуитивно понятные пользовательские интерфейсы. Помимо фронтенда, я увлекаюсь разработкой мобильных приложений, которые уже помогают людям в повседневной жизни"
        },
        {
            question: "Какие технологии я использую?",
            answer: "Я стараюсь постоянно изучать современные и актуальные технологии и применять их в своих проектах. На данном этапе я использую: Vanilla(html, css, js), React.js, Vite, Gsap +ScrollTrigger. В андроид разработке я использую AndroidStudio Java"
        },
        {
            question: "Зачем нужен сайт мне или моему бизнесу?",
            answer: "В современном мире сайт — это цифровая визитная карточка, инструмент продаж и канал коммуникации. Он увеличивает узнаваемость бренда, привлекает новых клиентов 24/7, позволяет демонстрировать товары или услуги, собирать контакты и строить доверительные отношения с вашей аудиторией. Даже простой лендинг может значительно усилить ваше присутствие на рынке "
        },
        {
            question: "Сколько стоит сайт?",
            answer: "Стоимость услуг рассчитывается индивидуально для каждого проекта, исходя из его масштаба, сложности и требуемых технологий. Для получения точного предложения, пожалуйста, свяжитесь со мной"
        },
        {
            question: "У меня уже есть сайт, что теперь?",
            answer: "Это отлично! Однако если ваш текущий сайт уже не соответствует современным требованиям, неэффективно работает или нуждается в обновлении дизайна и функционала, я могу помочь: Мы можем провести аудит, выявить слабые места и разработать стратегию по улучшению или полному редизайну, чтобы ваш сайт снова работал на вас максимально эффективно"
        },
        {
            question: "Что, если мне не понравится результат?",
            answer: "Я стремлюсь к тому, чтобы каждый клиент остался доволен моей работой. Если у вас есть какие-либо замечания - я внести необходимые исправления и доработки в соответствии с вашими пожеланиями. Мы будем работать вместе, пока вы не будете полностью удовлетворены результатом"
        }
    ];

    // Заполняем элементами
    faqData.forEach(faqItem => {
        const itemEl = createFaqItem({
            question: faqItem.question,
            answer: faqItem.answer}
        );

        faqList.appendChild(itemEl);
    })

    // Анимация для заголовка
    const title = section.querySelector(`.${styles.FAQSectionContentContainer__title}`)
    initSplitLineText(title);
    animateSplitLineText({
        textEl: title,
    });

    return section;
}

function createFaqItem({question, answer}) {
    const faqLiItem = document.createElement("li");
    faqLiItem.className = styles.faqContainer__item;

    const wrapper = document.createElement("div");
    wrapper.className = styles.faqContainer__itemWrapper;

    // Вопрос
    const questionSpan = document.createElement("span");
    questionSpan.className = styles.faqContainerItem__title;
    questionSpan.textContent = question;
    const icon = document.createElement("i");
    icon.className = `fa fa-plus ${styles.faqContainerItem__icon}`;
    icon.setAttribute("aria-hidden", "true");

    wrapper.appendChild(questionSpan);
    wrapper.appendChild(icon);

    // Ответ
    const answerContainer = document.createElement("div");
    answerContainer.className = styles.faqContainerItem__answerContainer;
    const answerTextEl = document.createElement("p");
    answerTextEl.className = styles.faqContainerItemAnswerContainer__text;
    answerTextEl.textContent = answer;

    answerContainer.appendChild(answerTextEl);

    // Добавляем элементы
    faqLiItem.appendChild(wrapper);
    faqLiItem.appendChild(answerContainer);

    // Инициализируем логику наведения и анимации
    initFaqItemEl(faqLiItem, icon, answerContainer, answerTextEl);

    return faqLiItem;
}

function initFaqItemEl(faqItemEl, icon, answerContentContainer, answerTextEl) {
    const tl = initFAQItemGsapAnimations(faqItemEl, icon, answerContentContainer, answerTextEl); // Получаем timeline

    faqItemEl.addEventListener("click", () => {
        if (tl.reversed()) {
            tl.play();
            faqItemEl.classList.add(styles.activeFAQItem);
        } else {
            tl.reverse();
            faqItemEl.classList.remove(styles.activeFAQItem);
        }
    });
}

function initFAQItemGsapAnimations(faqItemEl, icon, answerContentContainer, answerTextEl) {
    const tl = gsap.timeline({ paused: true });

    tl.to(answerContentContainer, {
        height: "auto",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        onStart: () => {
            gsap.from(answerTextEl, {
                opacity: 0,
                y: 10,
                stagger: 0.02,
                duration: 0.4,
                ease: "power2.out"
            });
        }
    })
        .to(icon, {
            rotation: 45,
            duration: 0.3,
            ease: "power2.out",
        }, 0);

    tl.reverse();

    return tl;
}