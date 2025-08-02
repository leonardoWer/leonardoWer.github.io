import {initSmoothScroll} from './gsap/smoothScroll.js';
import {initTimeline} from "s/js/gsap/timeline.js";
import {createAboutSection} from "s/components/sections/AboutSection/AboutSection.js";
import {createMyWorksSection} from "s/components/sections/MyWorksSection/MyWorksSection.js";
import {createMySkillsSection} from "s/components/sections/MySkillsSection/MySkillsSection.js";

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();

    // Sections
    const main = document.querySelector('main');
    main.appendChild(createAboutSection());
    main.appendChild(createMyWorksSection());
    main.appendChild(createMySkillsSection());
});