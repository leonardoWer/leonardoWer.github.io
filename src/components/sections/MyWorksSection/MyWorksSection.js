import styles from './MyWorksSection.module.css'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const photoPath = "/img/works/"

export function createMyWorksSection() {
    const section = document.createElement("section");
    section.id = "myWorksSection";

    section.innerHTML = `
        <div class="container ${styles.myWorks__top}">
          <div class="${styles.myWorksTop__bg}"></div>
          <div class="${styles.myWorksTop__contentContainer}">
              <h2 class="${styles.myWorksTitle}">Мои работы</h2>
              <div class="${styles.myWorksTop__previewContainer}"></div>
          </div>
        </div>

        <div class="container ${styles.myWorks__bottom}">
          <div class="${styles.myWorksBottom__item}"></div>
        </div>
    `

    // Элементы
    const topContainer= section.querySelector(`.${styles.myWorks__top}`)
    const topContentContainer = section.querySelector(`.${styles.myWorksTop__bg}`)
    const titleText = section.querySelector(`.${styles.myWorksTitle}`)
    const worksTopPreviewContainer = section.querySelector(`.${styles.myWorksTop__previewContainer}`)

    // Мои работы
    const myWorksData = [
        {
            name: "Spider-Man-Movies",
            titlePhoto: "spider-man-movies.png",
            stack: ["vite", "gsap"]
        },
        {
            name: "basketball-courts",
            titlePhoto: "basketball-courts.png",
            stack: ["vite", "gsap"]
        },
        {
            name: "Spider-Man-Movies",
            titlePhoto: "spider-man-movies.png",
            stack: ["vite", "gsap"]
        },
        {
            name: "basketball-courts",
            titlePhoto: "basketball-courts.png",
            stack: ["vite", "gsap"]
        },
    ];

    const myWorksPreviewTilesData = []

    myWorksData.forEach(work => {
        const previewTile = createWorkPreviewTile({img: work.titlePhoto})
        myWorksPreviewTilesData.unshift(previewTile);

        worksTopPreviewContainer.appendChild(previewTile)
    })

    initGsapAnimations(topContainer, topContentContainer, titleText, worksTopPreviewContainer, myWorksPreviewTilesData);

    return section;
}

function createWorkPreviewTile({img}) {
    const tile = document.createElement("div");
    tile.className = styles.myWorksTopPreviewContainer__itemWrapper;
    tile.innerHTML = `
    <img class="${styles.myWorksTopPreviewContainer__item}" src="${photoPath + img}" alt="${img}">
    `;

    return tile;
}

function initGsapAnimations(topContainer, topBg, titleText, myWorksTopPreviewContainer, myWorksPreviewTilesData) {

    // 1. Анимация фона (управляемая ScrollTrigger)
    gsap.fromTo(topBg, {
        height: "30vw",
        width: "30vw",
    }, {
        height: "130vw",
        width: "130vw",
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: topContainer,
            start: "top 55%",
            end: "bottom bottom",
            scrub: true,
            toggleActions: "play none none reverse"
        }
    });

    // 2. Анимация текста и контейнера (запускается после анимации фона)
    const fadeInTl = gsap.timeline();
    fadeInTl.fromTo(titleText, {
        opacity: 0
    }, {
        ease: "power1.inOut",
        opacity: 1, duration: 1
    })

    const previewContainerFadeInTl = gsap.timeline()
    previewContainerFadeInTl.from(myWorksTopPreviewContainer, {
        xPercent: -100,
        ease: "power3.inOut",
        duration: 3
    }, 0);

    // 3. Анимация поворота и раздвижения карточек (зависит от прокрутки)
    const tilesRotateAndSpacingTl = gsap.timeline();
    myWorksPreviewTilesData.forEach((tile, index) => {
        tilesRotateAndSpacingTl.to(tile, {
            rotateY: "-30deg",
            xPercent: index * 12,
            rotateX: index * 2,
            ease: "power3.inOut",
            duration: 2,
        }, 0)
    });
    tilesRotateAndSpacingTl.to(myWorksTopPreviewContainer, {
        xPercent: -20,
        duration: 2,
        ease: "power1.inOut",
    }, 0)

    // 4. Анимация подъема и опускания карточек (зависит от прокрутки)
    const tilesFadeOutTl = gsap.timeline();
    myWorksPreviewTilesData.forEach((tile) => {
        tilesFadeOutTl.to(tile, { // Поднимаем
            yPercent: -12,
            duration: 0.5,
            ease: "power2.in",
        }, "+=0.5")
            .to(tile, { // Опускаем
                yPercent: 200,
                scale: 0.8,
                duration: 1.5,
                ease: "power3.in",
            }, "+=0.5");
    });

    // 5. Создаем ScrollTrigger для запуска анимаций плиток и закрепления
    ScrollTrigger.create({
        trigger: topContainer,
        start: "top top",
        end: "+=4500",
        pin: topContainer,
        scrub: true,
        animation: gsap.timeline().add(fadeInTl).add(previewContainerFadeInTl).add(tilesRotateAndSpacingTl).add(tilesFadeOutTl),
    });

}