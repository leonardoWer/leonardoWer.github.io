import styles from "./FAQSection.module.css"

import gsap from "gsap";

export function createFAQSection() {
    const section = document.createElement("section");
    section.id = "fAQSection";
    section.innerHTML = `
        <div class="container ${styles.FAQSection__contentContainer}">
            <h2 class="${styles.FAQSectionContentContainer__title}">FAQ</h2>
            
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
            question: "Что я умею",
            answer: "Я специализируюсь на современной фронтенд-разработке, уделяя особое внимание интересному и современному дизайну. Также я создаю интуитивно понятные пользовательские интерфейсы. Помимо фронтенда, я увлекаюсь разработкой мобильных приложений, которые уже помогают людям в повседневной жизни"
        },
        {
            question: "Зачем вам сайт",
            answer: "lorem40"
        },
        {
            question: "Сколько стоит сайт",
            answer: "Стоимость услуг рассчитывается индивидуально для каждого проекта, исходя из его масштаба, сложности и требуемых технологий. Для получения точного предложения, пожалуйста, свяжитесь со мной"
        },
        {
            question: "У меня уже есть сайт",
            answer: "Так как его делал не я, это не считается"
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