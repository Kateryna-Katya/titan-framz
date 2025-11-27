document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок Lucide
    lucide.createIcons();

    /* --- MOBILE MENU LOGIC --- */
    const burgerBtn = document.querySelector('.header__burger');
    const navList = document.querySelector('.nav__list');
    const navLinks = document.querySelectorAll('.nav__link');
    const body = document.body;

    // Функция переключения меню
    function toggleMenu() {
        navList.classList.toggle('nav__list--active');
        body.classList.toggle('no-scroll'); // Блокируем скролл фона

        // Меняем иконку меню на крестик и обратно
        const icon = burgerBtn.querySelector('i');
        // Проверяем текущий атрибут и меняем его
        if (navList.classList.contains('nav__list--active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        // Важно: просим Lucide перерисовать иконки после смены атрибута
        lucide.createIcons();
    }

    // Клик по бургеру
    if (burgerBtn) {
        burgerBtn.addEventListener('click', toggleMenu);
    }

    // Закрываем меню при клике на любую ссылку (чтобы перейти к секции)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('nav__list--active')) {
                toggleMenu();
            }
        });
    });

    /* --- COOKIE POPUP LOGIC --- */
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptCookieBtn = document.getElementById('accept-cookies');

    // Ключ в LocalStorage
    const cookieKey = 'titan_framz_cookies_accepted';

    // Проверяем, было ли уже принято соглашение
    if (!localStorage.getItem(cookieKey)) {
        // Если нет, показываем попап через 2 секунды после загрузки
        setTimeout(() => {
            cookiePopup.classList.add('show');
        }, 2000);
    }

    // Обработка клика "Принять"
    if (acceptCookieBtn) {
        acceptCookieBtn.addEventListener('click', () => {
            // Сохраняем согласие в браузере
            localStorage.setItem(cookieKey, 'true');
            // Скрываем попап
            cookiePopup.classList.remove('show');
        });
    }

    console.log('Titan-Framz: Menu & Cookies logic loaded');
});