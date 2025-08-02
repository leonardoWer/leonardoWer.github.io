import {initSmoothScroll} from './gsap/smoothScroll.js';

import {createHeader} from "s/components/sections/Header/Header.js";
import {createAboutSection} from "s/components/sections/AboutSection/AboutSection.js";
import {createMyWorksSection} from "s/components/sections/MyWorksSection/MyWorksSection.js";
import {createMySkillsSection} from "s/components/sections/MySkillsSection/MySkillsSection.js";
import {createFAQSection} from "s/components/sections/FAQSection/FAQSection.js";

import {createFooter} from "s/components/sections/Footer/Footer.js";

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();

    // Sections
    const header = document.querySelector('header');
    header.appendChild(createHeader());

    const main = document.querySelector('main');
    main.appendChild(createAboutSection());
    main.appendChild(createMyWorksSection());
    main.appendChild(createMySkillsSection());
    main.appendChild(createFAQSection());

    const footer = document.querySelector('footer');
    footer.appendChild(createFooter());
});