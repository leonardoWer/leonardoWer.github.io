import styles from "./AboutTile.module.css"

export function createAboutTile({title, titleElementNumber, location}) {
    const tile = document.createElement("div");
    tile.classList.add(styles.aboutTile);
    tile.classList.add(styles[location])

    tile.innerHTML = `
        <div class="${styles.contentContainer}">${titleElementNumber}</div>
        <h4 class="${styles.titleText}">${title}</h4>
    `

    return tile;
}