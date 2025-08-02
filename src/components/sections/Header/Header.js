import styles from "./Header.module.css"

export function createHeader() {
    const headerContainer = document.createElement("div");
    headerContainer.id = "homeSection";
    headerContainer.className = styles.headerContainer;
    headerContainer.innerHTML = `
        <h1 class="${styles.headerContainer__title}">Левахин Лев</h1>
        <p class="${styles.headerContainer__description}">
            Создаю современные веб-приложения: Frontend разработка, UI/UX дизайн, Android разработка. <br>Помогу воплотить ваши идеи в жизнь
        </p>

        <img class="${styles.headerContainer__img}" src="/img/me-title.png" alt="Levakhin Lev">
    `;

    return headerContainer;

}