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
        title: "Главная",
        onClick: {
            href: "homeSection"
        }
    },
    {
        title: "Обо мне",
        onClick: {
            href: "aboutSection"
        }
    },
    {
        title: "Работы",
        onClick: {
            href: "myWorksSection"
        }
    },
    {
        title: "Цель",
        onClick: {
            href: "mySkillsSection"
        }
    },
    {
        title: "Контакты",
        onClick: {
            href: "contactsSection"
        }
    },
];