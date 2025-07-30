import {initSmoothScroll} from './gsap/smoothScroll.js';
import {initTimeline} from "s/js/gsap/timeline.js";
import {createAboutSection} from "s/components/sections/AboutSection/AboutSection.js";

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();

    document.querySelector('main').appendChild(createAboutSection());
});