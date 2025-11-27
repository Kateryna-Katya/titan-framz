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
/* --- VANTA.JS ANIMATION --- */
    // Перевіряємо, чи існує елемент hero перед запуском
    if (document.querySelector('#hero')) {
        try {
            VANTA.NET({
                el: "#hero",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x6366f1,       // Основний колір (Indigo)
                backgroundColor: 0x0b0f19, // Колір фону (як у body)
                points: 12.00,         // Кількість точок
                maxDistance: 22.00,    // Дистанція з'єднань
                spacing: 18.00         // Відстань між точками
            })
        } catch (error) {
            console.log("Vanta JS animation error (library might not be loaded):", error);
        }
}
    /* --- FAQ ACCORDION LOGIC --- */
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Спочатку закриваємо всі інші відкриті пункти (ефект гармошки)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq__answer').style.maxHeight = null;
                }
            });

            // Тогглим поточний пункт
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                item.classList.add('active');
                // Встановлюємо висоту рівно по контенту
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
    /* --- CONTACT FORM LOGIC --- */
    const form = document.getElementById('lead-form');
    const successMsg = document.getElementById('form-success');

    // Captcha Elements
    const captchaQuestion = document.getElementById('captcha-question');
    const captchaInput = document.getElementById('captcha-answer');

    let correctAnswer = 0;

    // Функція генерації простого прикладу
    function generateCaptcha() {
        if (!captchaQuestion) return;
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 + num2;
        captchaQuestion.textContent = `${num1} + ${num2}`;
    }

    // Запускаємо генерацію при завантаженні
    generateCaptcha();

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Зупиняємо стандартну відправку

            // 1. Перевірка Капчі
            const userAnswer = parseInt(captchaInput.value);
            if (userAnswer !== correctAnswer) {
                alert('Ошибка: Неверное решение примера (капча). Попробуйте снова.');
                generateCaptcha(); // Оновлюємо приклад
                captchaInput.value = '';
                return;
            }

            // 2. Імітація відправки (Loading state)
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;

            submitBtn.disabled = true;
            submitBtn.innerText = 'Обработка...';

            // 3. Затримка для реалізму (2 секунди)
            setTimeout(() => {
                // Ховаємо форму (прозорість)
                form.style.opacity = '0';

                // Показуємо повідомлення про успіх
                successMsg.classList.add('show');

                // Очищаємо форму
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;

                // Оновлюємо капчу для наступного разу
                generateCaptcha();

                // Відновлюємо прозорість форми (хоча вона під блоком success, але для порядку)
                setTimeout(() => {
                    form.style.opacity = '1';
                    // Але successMsg все ще перекриває її завдяки z-index і position absolute
                }, 500);

            }, 2000);
        });
    }