import styles from "./Header.module.css"

export function createHeader() {
    const headerContainer = document.createElement("div");
    headerContainer.id = "homeSection";
    headerContainer.className = styles.headerContainer;
    headerContainer.innerHTML = `
        <h1 class="${styles.headerContainer__title}">Левахин Лев</h1>
        <p class="${styles.headerContainer__description}">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda blanditiis et in inventore minima, quas quos repellendus saepe similique. Assumenda dolores dolorum ea eligendi enim, est excepturi nesciunt numquam porro repellat? Autem doloribus earum esse hic incidunt quidem unde voluptatibus?
        </p>

        <img class="${styles.headerContainer__img}" src="/img/me-title.png" alt="Levakhin Lev">
    `;

    return headerContainer;

}