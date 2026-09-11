export const worksData = [
    {
        id: 'wou_mobile_app',
        name: 'Мобильное приложение Wou',
        title: 'Создал мобильное приложение Wou',
        description: 'Wou - это мобильное андроид приложение для занятий спортом. В нём содержатся все необходимые функции для занятий спортом: создание своих тренировок, календарь, видео тренировки',
        stack: ['Kotlin', 'Android Studio'],
        image: 'wou_mobile_app.png',
        link: 'https://leonardower.github.io/Wou',
        hoverTitle: 'Несколько экранов приложения Wou'
    },
    {
        id: 'my_money_app',
        name: 'Мобильное приложение my.money',
        title: 'Создал мобильное приложение my.money',
        description: 'my.money - это мобильное андроид приложение для отслеживания бюджета. Это простой, но качественный проект, которым уже пользуются реальные люди',
        stack: ['Kotlin', 'Android Studio'],
        image: 'my_money_app.png',
        link: 'https://www.rustore.ru/catalog/app/com.leonardower.mymoney',
        hoverTitle: 'Несколько экранов приложения my.money'
    },
    {
        id: 'wou_website',
        name: 'Промо-лендинг для мобильного приложения Wou',
        title: 'Разработал промо-лендинг для мобильного приложения Wou',
        description: 'Разработал уникальный дизайн с премиальными анимациями. Продумал структуру так, чтобы после просмотра пользователь скачал приложение',
        stack: ['React', 'gsap', 'Scroll Trigger'],
        image: 'wou.png',
        link: 'https://leonardower.github.io/Wou',
        hoverTitle: 'Промо-сайт приложения Wou'
    },
    {
        id: 'rhythm-roam',
        name: 'Rhythm & Roam',
        title: 'Разработал официальный сайт бренда Rhythm-Roam',
        description: 'Корпоративный сайт для бренда одежды с иммерсивным 3D-опытом. Сочетает в себе необычный яркий дизайн и интерактивные анимации с использованием 3д',
        stack: ['Three.js', 'Vite', 'GSAP'],
        image: 'rhythm-roam.png',
        link: 'https://leonardower.github.io/Rhythm-Roam',
        hoverTitle: 'Официальный сайт бренда Rhythm-Roam'
    },
    {
        id: 'benua',
        name: 'Петербург Бенуа',
        title: 'Курировал разработку википедии про семью Бенуа',
        description: 'Образовательный проект, посвящённый семье Бенуа. Содержит подробную информацию о членах семьи, их творчестве и вкладе в культуру Санкт-Петербурга',
        stack: ['Vanilla JS', 'Yandex Maps API'],
        image: 'benua-hsitmo.png',
        link: 'http://benua.hsitmo.ru',
        hoverTitle: 'Аналог википедии про семью Бенуа'
    },
    {
        id: 'my_movie_app',
        name: 'Мобильное приложение my.movie',
        title: 'Ребрендинг и разработка мобильного приложения my.movie',
        description: 'Доработал функционал приложения, перешёл на современный стек Kotlin + Compose. Полностью разработал дизайн приложения от концепции меньше текста больше картинки',
        stack: ['Figma', 'Kotlin', 'Android Studio'],
        image: 'my_movie_app.png',
        link: '',
        hoverTitle: 'Несколько экранов приложения my.movie'
    },
    {
        id: 'spider-man',
        name: 'Spider-Man Movies',
        title: 'Сайт о фильмах про Человека-Паука',
        description: 'Интерактивный сайт с информацией о всех фильмах про Человека-Паука. Включает таймлайн, описания сюжетов, оценки и интересные факты о каждом фильме.',
        stack: ['Vite', 'GSAP'],
        image: 'spider-man-movies.png',
        link: 'https://leonardower.github.io/Spider-Man-Movie',
        hoverTitle: 'Сайт с информацией о фильмах про Человека-Паука'
    },
    {
        id: 'basketball',
        name: 'Basketball Courts',
        title: 'Приложение для поиска баскетбольных площадок',
        description: 'Приложение для поиска баскетбольных площадок с интеграцией карт. Позволяет находить ближайшие площадки, просматривать их рейтинг и оставлять отзывы.',
        stack: ['Vite', 'GSAP', 'Yandex Maps API'],
        image: 'basketball-courts.png',
        link: 'https://leonardoWer.github.io/basketball-courts',
        hoverTitle: 'Приложение для поиска баскетбольных площадок'
    },
    {
        id: 'cookbook',
        name: 'The Levakhins Cookbook',
        title: 'Онлайн книга рецептов',
        description: 'Семейная онлайн книга рецептов с удобной навигацией по категориям, поиском и возможностью сохранять любимые рецепты в избранное.',
        stack: ['React', 'Vite', 'GSAP'],
        image: 'the-levakhins-cookbook.png',
        link: 'https://leonardower.github.io/The-Levakhins-cookbook',
        hoverTitle: 'Онлайн книга рецептов'
    },
];

// Функция для получения последних N работ
export function getLatestWorks(count = 3) {
    return worksData.slice(0, count);
}

// Функция для получения работы по ID
export function getWorkById(id) {
    return worksData.find(work => work.id === id);
}