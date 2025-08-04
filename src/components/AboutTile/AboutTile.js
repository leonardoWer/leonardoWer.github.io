import styles from "./AboutTile.module.css"

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

import Matter from "matter-js";

export function createAboutTile({ title, titleElementNumber, location}) {

    const tile = document.createElement("div");
    tile.classList.add(styles.aboutTile);
    if (styles[location]) {
        tile.classList.add(styles[location]);
    }

    tile.innerHTML = `
        <div class="${styles.contentContainer}">
            <div class="${styles.item}">vite</div>
            <div class="${styles.item}">js</div>
        </div>

        <h4 class="${styles.titleText}">${title}</h4>
    `;

    const container = tile.querySelector(`.${styles.contentContainer}`);
    const items = container.querySelectorAll(`.${styles.item}`);

    // Айтемы внутри (с помощью matter)
    let containerWidth;
    let containerHeight;

    const engine = Matter.Engine.create();
    const runner = Matter.Runner.create();

    Matter.Runner.run(runner, engine);

    const initializeMatterPhysics = () => {
        containerWidth = container.offsetWidth;
        containerHeight = container.offsetHeight;

        // Строим стенки
        const wallOptions = {
            isStatic: true,
            friction: 0.0,
            restitution: 0.7,
            render: {
                visible: false
            }
        };
        // Толщина невидимых стенок для отскока
        const wallThickness = 20;

        // Стены, привязанные к offsetWidth/Height контейнера
        const walls = [
            Matter.Bodies.rectangle(containerWidth / 2, -wallThickness / 2, containerWidth, wallThickness, wallOptions), // Top
            Matter.Bodies.rectangle(containerWidth / 2, containerHeight + wallThickness / 2, containerWidth, wallThickness, wallOptions), // Bottom
            Matter.Bodies.rectangle(-wallThickness / 2, containerHeight / 2, wallThickness, containerHeight, wallOptions), // Left
            Matter.Bodies.rectangle(containerWidth + wallThickness / 2, containerHeight / 2, wallThickness, containerHeight, wallOptions)  // Right
        ];

        Matter.World.add(engine.world, walls);

        // Создаём тела для наших айтемов
        const itemBodies = [];
        items.forEach(item => {
            // Начальное случайное позиционирование внутри контейнера
            const initialX = Math.random() * (containerWidth - item.offsetWidth) + item.offsetWidth / 2; // Случайное X
            const initialY = -containerHeight + item.offsetHeight * 2;

            const body = Matter.Bodies.rectangle(
                initialX,
                initialY,
                item.offsetWidth,
                item.offsetHeight,
                {
                    friction: 0.3,
                    restitution: 0.7, // Отскок
                    density: 0.001,
                    chamfer: {
                        radius: item.offsetHeight / 2
                    }
                }
            );
            // Сохраняем ссылку на тело Matter.js в DOM-элементе
            item.matterBody = body;
            itemBodies.push(body);
        });

        Matter.World.add(engine.world, itemBodies);

        // Перетаскивание
        Draggable.create(items, {
            bounds: container, // Ограничиваем перетаскивание (визуально, Matter.js делает это физически)
            inertia: true, // Включаем инерцию для GSAP Draggable
            cursor: "grab",
            onPress: function () {
                this.target.style.cursor = "grabbing";
                // При захвате делаем тело статичным, чтобы оно не двигалось по физике
                Matter.Body.setStatic(this.target.matterBody, true);
            },
            onDrag: function () {
                // Обновляем позицию тела Matter.js во время перетаскивания
                // `this.x` и `this.y` - это top/left GSAP Draggable, Matter.js использует центр
                Matter.Body.setPosition(this.target.matterBody, {
                    x: this.x + this.target.offsetWidth / 2,
                    y: this.y + this.target.offsetHeight / 2,
                });
            },
            onRelease: function () {
                this.target.style.cursor = "grab";
                // При отпускании делаем тело снова динамическим
                Matter.Body.setStatic(this.target.matterBody, false);
            },
        });

        // Синхронизируем с DOM
        gsap.ticker.add(() => {
            itemBodies.forEach(body => {
                const element = Array.from(items).find(item => item.matterBody === body);
                if (element) {
                    // Анимируем DOM элемент в соответствии с положением тела Matter.js
                    // Используем gsap.to для плавности и предотвращения рывков
                    gsap.to(element, {
                        duration: 0.08, // Маленькая длительность для быстрой, но плавной синхронизации
                        x: body.position.x - element.offsetWidth / 2, // Matter.js - центр, DOM - top-left
                        y: body.position.y - element.offsetHeight / 2,
                        rotation: (body.angle * 180) / Math.PI, // Вращение из радиан в градусы
                        ease: "power2.out"
                    });
                }
            });
        });
    }

    Promise.resolve().then(initializeMatterPhysics);

    return tile;
}