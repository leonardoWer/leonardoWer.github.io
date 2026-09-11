import{g as l,S as d,e as w,i as m,b as f,d as u}from"./worksData-DajvWFg6.js";const e={"works-page":"_works-page_jkmvx_1","works-page__intro":"_works-page__intro_jkmvx_11","works-page__title":"_works-page__title_jkmvx_17","works-page__title-accent":"_works-page__title-accent_jkmvx_31","works-page__filters":"_works-page__filters_jkmvx_41","filter-btn":"_filter-btn_jkmvx_53","filter-btn--active":"_filter-btn--active_jkmvx_93","works-page__grid":"_works-page__grid_jkmvx_119"},a={"work-tile":"_work-tile_13r79_1","work-tile__image-wrapper":"_work-tile__image-wrapper_13r79_21","work-tile__image":"_work-tile__image_13r79_21","work-tile__overlay":"_work-tile__overlay_13r79_59","work-tile__arrow":"_work-tile__arrow_13r79_93","work-tile__info":"_work-tile__info_13r79_135","work-tile__name":"_work-tile__name_13r79_147","work-tile__stack":"_work-tile__stack_13r79_165","work-tile__tech":"_work-tile__tech_13r79_177"},y="/img/works/";function v(t){const r=document.createElement("a");return r.className=a["work-tile"],r.href=t.link,r.target="_blank",r.rel="noopener noreferrer",r.dataset.category=t.category,r.innerHTML=`
        <div class="${a["work-tile__image-wrapper"]}">
            <img 
                src="${y+t.image}" 
                alt="${t.name}"
                class="${a["work-tile__image"]}"
                loading="lazy"
            />
            <div class="${a["work-tile__overlay"]}">
                <span class="${a["work-tile__arrow"]}">
                    <i class="fas fa-arrow-right"></i>
                </span>
            </div>
        </div>
        <div class="${a["work-tile__info"]}">
            <h3 class="${a["work-tile__name"]}">${t.name}</h3>
            <div class="${a["work-tile__stack"]}">
                ${t.stack.map(s=>`
                    <span class="${a["work-tile__tech"]}">${s}</span>
                `).join("")}
            </div>
        </div>
    `,r}l.registerPlugin(d);function $(){const t=document.createElement("section");t.className=e["works-page"],t.innerHTML=`
        <div class="${e["works-page__intro"]}">
            <h1 class="${e["works-page__title"]}">
                Мне нравится<br>
                <span class="${e["works-page__title-accent"]}">Создавать</span>
                <span id="accentText" class="${e["works-page__title-accent"]}">мобильные приложения</span>
            </h1>
        </div>

        <div class="${e["works-page__filters"]}">
            <button class="${e["filter-btn"]} ${e["filter-btn--active"]}" data-filter="all">Все работы</button>
            <button class="${e["filter-btn"]}" data-filter="site">Сайты</button>
            <button class="${e["filter-btn"]}" data-filter="mobile">Мобильные приложения</button>
        </div>

        <div class="${e["works-page__grid"]}">
            <!-- Тайлы проектов -->
        </div>
    `;const r=t.querySelector("#accentText"),s=t.querySelector(`.${e["works-page__grid"]}`),c=t.querySelectorAll(`.${e["filter-btn"]}`);function p(o="all"){let i="";o==="site"?i="сайты":o==="mobile"&&(i="мобильные приложения"),l.timeline().to(r,{opacity:0,y:-20,duration:.25,ease:"power2.in",onComplete:()=>{r.textContent=i}}).fromTo(r,{opacity:0,y:20},{opacity:1,y:0,duration:.4,ease:"power3.out"}),s.innerHTML="",w(o).forEach(n=>{const g=v(n);s.appendChild(g)}),k()}function k(){const o=s.querySelectorAll(`.${e["work-tile"]}`);l.fromTo(o,{opacity:0,y:60},{opacity:1,y:0,duration:.8,stagger:.1,ease:"power3.out",scrollTrigger:{trigger:s,start:"top 85%",toggleActions:"play none none reverse"}}),o.forEach((i,_)=>{l.fromTo(i,{y:0},{y:-20-_%3*10,ease:"none",scrollTrigger:{trigger:i,start:"top bottom",end:"bottom top",scrub:1}})})}return c.forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.filter;c.forEach(n=>n.classList.remove(e["filter-btn--active"])),o.classList.add(e["filter-btn--active"]);const _=s.querySelectorAll(`.${e["work-tile"]}`);l.to(_,{opacity:0,y:20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{p(i)}})})}),p("all"),document.fonts.ready.then(()=>{const o=t.querySelector(`.${e["works-page__title"]}`);l.from(o,{opacity:0,y:50,duration:1,ease:"power3.out",delay:.2})}),t}document.addEventListener("DOMContentLoaded",()=>{m(),document.body.appendChild(f()),document.querySelector("main").appendChild($()),document.querySelector("footer").appendChild(u())});
