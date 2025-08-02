export const linksData = {
    email: "name89213126414@gmail.com",
    vk: "https://vk.ru/leonardo_wer",
    tg: "https://t.me/leonardo_wer",
    git: "https://github.com/leonardoWer",
    portfolio: "https://github.com/leonardoWer/Portfolio_Levakhin_Lev",
}

export const contactLinkElementsData = [
    {
        title: "vk",
        onClick: {
            link: linksData.vk,
            hoverTitle: "Visit me on Vk"
        },
    },
    {
        title: "tg",
        onClick: {
            link: linksData.tg,
            hoverTitle: "Visit me on Telegramm"
        },
    },
    {
        title: "git",
        onClick: {
            link: linksData.git,
            hoverTitle: "Visit me on GitHub"
        },
    },
    {
        title: "p",
        onClick: {
            link: linksData.portfolio,
            hoverTitle: "Visit my portfolio"
        },
    }
];

export const menuLinkElementsData = [
    {
        title: "home",
        onClick: {
            href: "homeSection"
        }
    },
    {
        title: "about",
        onClick: {
            href: "aboutSection"
        }
    },
    {
        title: "works",
        onClick: {
            href: "myWorksSection"
        }
    },
    {
        title: "why?",
        onClick: {
            href: "mySkillsSection"
        }
    },
    {
        title: "contacts",
        onClick: {
            href: "contactsSection"
        }
    },
];