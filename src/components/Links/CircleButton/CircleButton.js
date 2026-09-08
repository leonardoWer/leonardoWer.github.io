import styles from './CircleButton.module.css';

export function createCircleButton({ icon, link, label }) {
    const button = document.createElement('a');
    button.className = styles['social-circle-button'];
    button.href = link;
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
    button.setAttribute('aria-label', label);

    button.innerHTML = `
        <span class="${styles['social-circle-button__icon']}">
            <i class="fab ${icon}"></i>
        </span>
    `;

    return button;
}