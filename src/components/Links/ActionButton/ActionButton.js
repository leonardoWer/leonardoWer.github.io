import styles from './ActionButton.module.css';

export function createActionButton({ text, link, icon = 'fa-arrow-right', fas = true, isExternal = true }) {
    const button = document.createElement('a');
    button.className = styles['action-button'];
    button.href = link;

    if (isExternal) {
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
    }

    let fasText = "fas";
    if (!fas) fasText = "";

    button.innerHTML = `
        <span class="${styles['action-button__text']}">${text}</span>
        <span class="${styles['action-button__icon']}">
            <i class="${fasText} ${icon}"></i>
        </span>
    `;

    return button;
}