import styles from "./WorkTile.module.css"

export function createWorkTile({title, titleImg, stack, link}) {

    const tile = document.createElement("div");
    tile.className = styles.workTile;
    tile.innerHTML = `
        <div class="${styles.textContainer}">
            <h4 class="${styles.textContainer__title}">${title}</h4>
            <div class="${styles.textContainer__stackContainer}"></div>
        </div>
        <div class="${styles.imgContainer}">
            <img class="${styles.workTitleImg}" src="${titleImg}" alt="${title}">
        </div>
    `

    const stackContainer = tile.querySelector(`.${styles.textContainer__stackContainer}`);
    stack.forEach(item => {
        const itemEl = document.createElement("span");
        itemEl.className = styles.stackItem;
        itemEl.textContent = item;
        stackContainer.appendChild(itemEl);
    })

    // Клик по тайлу
    tile.onclick = () => {
        window.open(link, '_blank');
    }

    return tile;
}