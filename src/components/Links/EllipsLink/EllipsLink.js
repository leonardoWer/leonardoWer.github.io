import styles from "./EllipsLink.module.css"
import {createLink} from "s/components/Links/link.js";

export function createEllipsLink({title, onClick, style}) {
    const link = createLink({title, onClick});
    link.classList = styles.ellipsLink;

    switch (style) {
        case "dark":
            link.classList.add(styles.ellipsLink__dark);
            break;
        case "light":
            link.classList.add(styles.ellipsLink__light);
            break;
    }

    return link;
}